import type { AgentBackend } from "../backends.js";
import { ensureClaude, getClaudeVersion } from "./claude.js";

export function isBackendImplemented(backend: AgentBackend): boolean {
  return backend === "claude";
}

export function ensureBackendAvailable(backend: AgentBackend): boolean {
  switch (backend) {
    case "claude":
      return ensureClaude();
    case "codex":
      return false;
  }
}

export function getBackendVersion(backend: AgentBackend): string {
  switch (backend) {
    case "claude":
      return getClaudeVersion();
    case "codex":
      return "unimplemented";
  }
}

export function getBackendUnavailableReason(backend: AgentBackend): string {
  switch (backend) {
    case "claude":
      return "Claude CLI not found. Install it from https://claude.ai/download";
    case "codex":
      return "Backend 'codex' is not implemented yet in this branch. This PR only adds backend plumbing ahead of the runner abstraction.";
  }
}
