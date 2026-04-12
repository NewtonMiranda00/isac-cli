import { execSync } from "node:child_process";

export function ensureCodex(): boolean {
  try {
    execSync("codex --version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

export function getCodexVersion(): string {
  try {
    return execSync("codex --version", { stdio: "pipe", encoding: "utf-8" }).trim();
  } catch {
    return "unknown";
  }
}
