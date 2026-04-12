import { execFileSync, execSync, type ExecFileSyncOptions, type ExecSyncOptions } from "node:child_process";
import { existsSync } from "node:fs";
import { delimiter, dirname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";

function walkUpDirs(startDir: string): string[] {
  const dirs: string[] = [];
  let current = startDir;

  while (true) {
    dirs.push(current);
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }

  return dirs;
}

function resolveLocalAgentBrowserScript(): string | null {
  const currentDir = dirname(fileURLToPath(import.meta.url));

  for (const dir of walkUpDirs(currentDir)) {
    const scriptPath = join(dir, "node_modules", "agent-browser", "bin", "agent-browser.js");
    if (existsSync(scriptPath)) {
      return scriptPath;
    }
  }

  return null;
}

function resolveGlobalAgentBrowserCommand(): string | null {
  try {
    if (process.platform === "win32") {
      const output = execSync("where agent-browser", {
        stdio: "pipe",
        encoding: "utf-8",
      }).trim();
      return output.split(/\r?\n/).find(Boolean) ?? null;
    }

    const output = execSync("which agent-browser", {
      stdio: "pipe",
      encoding: "utf-8",
    }).trim();
    return output || null;
  } catch {
    return null;
  }
}

export function resolveAgentBrowserBinDir(): string | null {
  const scriptPath = resolveLocalAgentBrowserScript();
  return scriptPath ? dirname(scriptPath) : null;
}

export function ensureAgentBrowser(): boolean {
  return resolveLocalAgentBrowserScript() !== null || resolveGlobalAgentBrowserCommand() !== null;
}

export function getAgentBrowserVersion(): string {
  try {
    const scriptPath = resolveLocalAgentBrowserScript();
    if (scriptPath) {
      return execFileSync(process.execPath, [scriptPath, "--version"], {
        stdio: "pipe",
        encoding: "utf-8",
      }).trim();
    }

    return execSync("agent-browser --version", {
      stdio: "pipe",
      encoding: "utf-8",
    }).trim();
  } catch {
    return "unknown";
  }
}

export function runAgentBrowser(
  args: string[],
  options: (ExecFileSyncOptions | ExecSyncOptions) & { encoding: BufferEncoding },
): string;
export function runAgentBrowser(
  args: string[],
  options?: ExecFileSyncOptions | ExecSyncOptions,
): Buffer;
export function runAgentBrowser(
  args: string[],
  options: ExecFileSyncOptions | ExecSyncOptions = {},
): string | Buffer {
  const scriptPath = resolveLocalAgentBrowserScript();
  if (scriptPath) {
    return execFileSync(process.execPath, [scriptPath, ...args], options as ExecFileSyncOptions);
  }

  const globalCommand = resolveGlobalAgentBrowserCommand();
  if (globalCommand) {
    if (process.platform === "win32" && parse(globalCommand).ext.toLowerCase() === ".cmd") {
      return execSync(`"${globalCommand}" ${args.map((arg) => `"${arg.replace(/"/g, "\"\"")}"`).join(" ")}`.trim(), options as ExecSyncOptions);
    }

    return execFileSync(globalCommand, args, options as ExecFileSyncOptions);
  }

  throw new Error("agent-browser not found. Install the local dependency or add it to PATH.");
}

export function prependAgentBrowserToPath(): string | null {
  const binDir = resolveAgentBrowserBinDir();
  if (!binDir) return null;

  const currentPath = process.env.PATH ?? "";
  const parts = currentPath.split(delimiter).filter(Boolean);
  if (!parts.includes(binDir)) {
    process.env.PATH = [binDir, ...parts].join(delimiter);
  }

  return binDir;
}
