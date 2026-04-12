import { execSync, spawn } from "node:child_process";
import { dirname, join, resolve as resolvePath } from "node:path";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import type { PhaseConfig, PhaseOutput } from "./types.js";

const codexHomeBySession = new Map<string, string>();
const trackedCodexHomes = new Set<string>();
let didRegisterExitCleanup = false;

function resolveCodexCommand(): { command: string; prefix: string[] } {
  if (process.platform !== "win32") {
    return { command: "codex", prefix: [] };
  }

  try {
    const shimPath = execSync("where codex.cmd", { encoding: "utf-8" }).split("\n")[0].trim();
    const shimDir = dirname(shimPath);
    const cliJs = resolvePath(shimDir, "node_modules", "@openai", "codex", "bin", "codex.js");
    return { command: process.execPath, prefix: [cliJs] };
  } catch {
    return { command: "codex", prefix: [] };
  }
}

function readLastMessage(outputPath: string): string {
  if (!existsSync(outputPath)) {
    return "";
  }

  try {
    return readFileSync(outputPath, "utf-8").trim();
  } catch {
    return "";
  }
}

function registerExitCleanup() {
  if (didRegisterExitCleanup) return;
  didRegisterExitCleanup = true;

  process.once("exit", () => {
    for (const home of trackedCodexHomes) {
      rmSync(home, { recursive: true, force: true });
    }
  });
}

function createIsolatedCodexHome(): string {
  registerExitCleanup();

  const codexHome = mkdtempSync(join(tmpdir(), "isac-codex-home-"));
  const authSource = join(homedir(), ".codex", "auth.json");

  mkdirSync(codexHome, { recursive: true });
  if (existsSync(authSource)) {
    copyFileSync(authSource, join(codexHome, "auth.json"));
  }

  writeFileSync(
    join(codexHome, "config.toml"),
    'approval_policy = "never"\n' +
      'sandbox_mode = "danger-full-access"\n',
    "utf-8",
  );

  trackedCodexHomes.add(codexHome);
  return codexHome;
}

export async function runCodexPhase(
  config: PhaseConfig,
  cwd: string,
  resumeSessionId?: string,
  onEvent?: (event: Record<string, unknown>) => void,
): Promise<PhaseOutput> {
  const start = Date.now();
  const outputDir = mkdtempSync(join(tmpdir(), "isac-codex-"));
  const outputPath = join(outputDir, "last-message.txt");
  const effectiveResumeSessionId = resumeSessionId && codexHomeBySession.has(resumeSessionId)
    ? resumeSessionId
    : undefined;
  const codexHome = effectiveResumeSessionId
    ? codexHomeBySession.get(effectiveResumeSessionId)!
    : createIsolatedCodexHome();

  const args = [...buildCodexArgs(config, cwd, outputPath, effectiveResumeSessionId)];
  const { command, prefix } = resolveCodexCommand();

  return new Promise<PhaseOutput>((resolve, reject) => {
    const timeout = config.timeout ?? 600_000;
    let sessionId = effectiveResumeSessionId ?? "";
    let lastResult = "";
    let isError = false;
    let pendingResolve = false;
    let stderrOutput = "";
    let stdoutBuffer = "";
    let sawAgentMessage = false;
    let sawTurnCompleted = false;
    let settled = false;

    const env: NodeJS.ProcessEnv = {
      ...process.env,
      CODEX_HOME: codexHome,
      CODEX_DISABLE_UPDATE_CHECK: "1",
      CODEX_DISABLE_NOTIFICATIONS: "1",
    };
    delete env.CLAUDECODE;

    const proc = spawn(command, [...prefix, ...args], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env,
    });

    const cleanup = () => {
      clearTimeout(timer);
      clearInterval(filePollTimer);
      rmSync(outputDir, { recursive: true, force: true });
    };

    const finish = (result: PhaseOutput) => {
      if (settled) return;
      settled = true;
      if (result.sessionId) {
        codexHomeBySession.set(result.sessionId, codexHome);
      }
      cleanup();
      resolve(result);
    };

    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };

    const stopProcess = () => {
      if (proc.exitCode === null && !proc.killed) {
        proc.kill("SIGTERM");
      }
    };

    const maybeFinalize = () => {
      const message = readLastMessage(outputPath);
      if (!message) return;

      lastResult = message;
      if (sawTurnCompleted || sawAgentMessage) {
        pendingResolve = true;
        stopProcess();
      }
    };

    const timer = setTimeout(() => {
      stopProcess();
      fail(
        new Error(
          `Phase "${config.name}" timed out after ${timeout}ms\nstderr: ${stderrOutput.slice(-500)}`,
        ),
      );
    }, timeout);

    const filePollTimer = setInterval(maybeFinalize, 500);

    proc.stdout.on("data", (data: Buffer) => {
      stdoutBuffer += data.toString();
      const lines = stdoutBuffer.split("\n");
      stdoutBuffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const event = JSON.parse(line) as Record<string, unknown>;

          if (event.type === "thread.started" && typeof event.thread_id === "string") {
            sessionId = event.thread_id;
          }

          if (event.type === "item.completed") {
            const item = event.item as Record<string, unknown> | undefined;
            if (item?.type === "agent_message" && typeof item.text === "string") {
              sawAgentMessage = true;
              lastResult = item.text;
            }
          }

          if (event.type === "turn.completed") {
            sawTurnCompleted = true;
            maybeFinalize();
          }

          if (event.type === "turn.failed" || event.type === "error") {
            isError = true;
          }

          onEvent?.(event);
        } catch {
          // Ignore non-JSON lines.
        }
      }
    });

    proc.stderr.on("data", (data: Buffer) => {
      stderrOutput += data.toString();
    });

    proc.on("close", (code) => {
      if (stdoutBuffer.trim()) {
        try {
          const event = JSON.parse(stdoutBuffer) as Record<string, unknown>;
          if (event.type === "thread.started" && typeof event.thread_id === "string") {
            sessionId = event.thread_id;
          }
          if (event.type === "item.completed") {
            const item = event.item as Record<string, unknown> | undefined;
            if (item?.type === "agent_message" && typeof item.text === "string") {
              sawAgentMessage = true;
              lastResult = item.text;
            }
          }
          if (event.type === "turn.completed") {
            sawTurnCompleted = true;
          }
          if (event.type === "turn.failed" || event.type === "error") {
            isError = true;
          }
        } catch {
          // Ignore trailing non-JSON lines.
        }
      }

      lastResult = readLastMessage(outputPath) || lastResult;

      if (pendingResolve || (code === 0 && lastResult)) {
        finish({
          result: lastResult,
          sessionId,
          isError,
          durationMs: Date.now() - start,
        });
        return;
      }

      if (code !== 0 && !lastResult) {
        fail(
          new Error(
            `Phase "${config.name}" exited with code ${code}.\nstderr: ${stderrOutput}`,
          ),
        );
        return;
      }

      finish({
        result: lastResult,
        sessionId,
        isError,
        durationMs: Date.now() - start,
      });
    });

    proc.on("error", (err) => {
      fail(
        new Error(
          `Failed to spawn codex for phase "${config.name}": ${err.message}`,
        ),
      );
    });
  });
}

function buildCodexArgs(
  config: PhaseConfig,
  cwd: string,
  outputPath: string,
  resumeSessionId?: string,
): string[] {
  const args = ["exec"];

  if (resumeSessionId) {
    args.push("resume", resumeSessionId);
  }

  args.push("-C", cwd);
  args.push("--json");
  args.push("--output-last-message", outputPath);
  args.push("--skip-git-repo-check");

  args.push("-c", 'approval_policy="never"');
  args.push("-c", 'sandbox_mode="danger-full-access"');

  if (config.model) {
    args.push("-m", config.model);
  }

  args.push(config.prompt);
  return args;
}
