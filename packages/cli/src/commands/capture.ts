import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import chalk from "chalk";
import {
  ensureBackendAvailable,
  getAgentBackendLabel,
  getBackendUnavailableReason,
  isAgentBackend,
  printBanner,
  log,
  readConfig,
  runPipeline,
  disableMcp,
  type AgentBackend,
  type PipelineStopAfter,
  type PipelineMode,
  type PipelineEngine,
} from "@guataiba/isac-core";
import { resolveAdapter } from "../adapters.js";

// ── Command ─────────────────────────────────────────────────────────

export interface CaptureOptions {
  backend?: string;
  dir?: string;
  maxRetries?: number;
  framework?: string;
  replicate?: boolean;
  stopAfter?: string;
  animations?: boolean;
  engine?: string;
}

const NEXT_APP_ROUTER_LAYOUT_FILES = [
  "app/layout.tsx",
  "app/layout.ts",
  "app/layout.jsx",
  "app/layout.js",
];

function getNextjsTargetError(dir: string): string | null {
  const packageJsonPath = resolve(dir, "package.json");
  if (!existsSync(packageJsonPath)) {
    return [
      `Target directory "${dir}" is not a Next.js project.`,
      "Missing package.json.",
      "Run `isac start` in a fresh folder first, or point `--dir` to an existing Next.js App Router app.",
    ].join(" ");
  }

  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(readFileSync(packageJsonPath, "utf-8")) as Record<string, unknown>;
  } catch {
    return `Could not read ${packageJsonPath}.`;
  }

  const dependencies = {
    ...((pkg.dependencies as Record<string, string> | undefined) ?? {}),
    ...((pkg.devDependencies as Record<string, string> | undefined) ?? {}),
  };

  if (!dependencies.next || !dependencies.react || !dependencies["react-dom"]) {
    return [
      `Target directory "${dir}" is not a runnable Next.js app.`,
      "Missing one or more required dependencies: next, react, react-dom.",
      "Run `isac start` first, or use `--dir` with an existing Next.js App Router project.",
    ].join(" ");
  }

  const hasAppRouterLayout = NEXT_APP_ROUTER_LAYOUT_FILES.some((file) =>
    existsSync(resolve(dir, file)),
  );
  if (!hasAppRouterLayout) {
    return [
      `Target directory "${dir}" is missing app/layout.*.`,
      "The current Next.js adapter only supports existing App Router projects.",
    ].join(" ");
  }

  const devScript = typeof (pkg.scripts as Record<string, unknown> | undefined)?.dev === "string"
    ? ((pkg.scripts as Record<string, string>).dev ?? "")
    : "";
  if (!devScript.includes("next dev")) {
    return [
      `Target directory "${dir}" does not expose a Next.js dev server.`,
      `Expected package.json script "dev" to run "next dev", but got: ${JSON.stringify(devScript || null)}.`,
    ].join(" ");
  }

  return null;
}

export async function captureCommand(
  url: string,
  options: CaptureOptions,
): Promise<void> {
  printBanner();

  // Validate URL
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
  } catch {
    console.error(
      chalk.red("  Error: Invalid URL. Provide a valid http:// or https:// URL."),
    );
    process.exit(1);
  }

  const dir = resolve(options.dir ?? process.cwd());

  // Load project config (if exists)
  const config = readConfig(dir);
  const rawBackend = options.backend ?? config?.backend ?? "claude";
  if (!isAgentBackend(rawBackend)) {
    console.error(
      chalk.red("  Error: Invalid --backend value. Must be 'claude' or 'codex'."),
    );
    process.exit(1);
  }
  const backend: AgentBackend = rawBackend;

  // Ensure selected backend is available
  if (!ensureBackendAvailable(backend)) {
    console.error(
      chalk.red(`  Error: ${getBackendUnavailableReason(backend)}`),
    );
    process.exit(1);
  }

  // Resolve adapter (CLI flag > config > default)
  const adapter = resolveAdapter(options.framework ?? config?.framework ?? "nextjs");

  if (adapter.name === "nextjs") {
    const targetError = getNextjsTargetError(dir);
    if (targetError) {
      console.error(chalk.red(`  Error: ${targetError}`));
      console.error(
        chalk.dim("  Hint: run `isac start --dir <parent-folder>` and then execute `isac capture` inside the generated app.\n"),
      );
      process.exit(1);
    }
  }

  const maxRetries = options.maxRetries ?? 3;
  // Resolve mode
  const mode: PipelineMode = options.replicate ? "replicate" : "design-system";
  const animations = options.animations ?? false;

  // Resolve engine
  let engine: PipelineEngine = "json-render";
  if (options.engine) {
    if (options.engine !== "json-render" && options.engine !== "legacy") {
      console.error(
        chalk.red("  Error: Invalid --engine value. Must be 'json-render' or 'legacy'."),
      );
      process.exit(1);
    }
    engine = options.engine as PipelineEngine;
  }

  // Resolve stopAfter
  let stopAfter: PipelineStopAfter = null;
  if (options.stopAfter) {
    const valid = ["screenshots", "design-system", "planning", "implementation"];
    if (!valid.includes(options.stopAfter)) {
      console.error(
        chalk.red(
          `  Error: Invalid --stop-after value. Must be one of: ${valid.join(", ")}`,
        ),
      );
      process.exit(1);
    }
    stopAfter = options.stopAfter as PipelineStopAfter;
  }

  // Print config
  log.summary("Target", url);
  log.summary("Directory", dir);
  log.summary("Backend", getAgentBackendLabel(backend));
  log.summary("Framework", adapter.displayName);
  log.summary("Mode", mode === "replicate" ? "Page replication" : "Design system");
  log.summary("Engine", engine);
  if (stopAfter) {
    log.summary("Stop after", stopAfter);
  } else if (mode === "replicate") {
    log.summary("Max retries", String(maxRetries));
  }
  console.log();

  // Handle Ctrl+C gracefully — ensure .mcp.json is cleaned up
  const cleanup = () => {
    console.log(chalk.dim("\n\n  Interrupted. Exiting..."));
    disableMcp(dir);
    process.exit(130);
  };
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  try {
    const result = await runPipeline({
      url,
      dir,
      backend,
      maxRetries,
      mode,
      stopAfter,
      adapter,
      animations,
      engine,
    });

    log.divider();

    const elapsed = log.elapsed(totalStartFromDuration(result.totalDuration));
    const costStr = `$${result.totalCostUsd.toFixed(2)}`;

    if (result.stoppedAt) {
      console.log(
        chalk.cyan(`  Stopped after: ${result.stoppedAt} (${elapsed}) — Total cost: ${costStr}\n`),
      );
    } else if (result.approved) {
      console.log(chalk.green(`  Done in ${elapsed} — Total cost: ${costStr}\n`));
    } else if (result.success) {
      console.log(
        chalk.yellow(`  Completed with corrections pending (${elapsed}) — Total cost: ${costStr}\n`),
      );
    } else {
      console.log(chalk.red(`  Pipeline failed (${elapsed}) — Total cost: ${costStr}\n`));
    }

    if (result.filesCreated.length > 0) {
      console.log("  Files created:");
      for (const file of result.filesCreated) {
        console.log(`    ${file}`);
      }
      console.log();
    }

    const devUrl = adapter.getDevServerUrl();
    if (result.stoppedAt === "design-system") {
      console.log(
        chalk.dim(`  Run: npm run dev → ${devUrl}/design-system\n`),
      );
    } else {
      console.log(chalk.dim(`  Run: npm run dev → ${devUrl}\n`));
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(chalk.red(`\n  Pipeline error: ${msg}`));
    process.exit(1);
  } finally {
    process.removeListener("SIGINT", cleanup);
    process.removeListener("SIGTERM", cleanup);
  }
}

function totalStartFromDuration(durationMs: number): number {
  return Date.now() - durationMs;
}
