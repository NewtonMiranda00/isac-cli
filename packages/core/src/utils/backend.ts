import type { AgentBackend } from "../backends.js";
import { ensureClaude, getClaudeVersion } from "./claude.js";
import { ensureCodex, getCodexVersion } from "./codex.js";

export function isBackendImplemented(backend: AgentBackend): boolean {
  return backend === "claude" || backend === "codex";
}

export function ensureBackendAvailable(backend: AgentBackend): boolean {
  switch (backend) {
    case "claude":
      return ensureClaude();
    case "codex":
      return ensureCodex();
  }
}

export function getBackendVersion(backend: AgentBackend): string {
  switch (backend) {
    case "claude":
      return getClaudeVersion();
    case "codex":
      return getCodexVersion();
  }
}

export function getBackendUnavailableReason(backend: AgentBackend): string {
  switch (backend) {
    case "claude":
      return "Claude CLI not found. Install it from https://claude.ai/download";
    case "codex":
      return "Codex CLI not found. Install it from https://developers.openai.com/codex/cli/";
  }
}
