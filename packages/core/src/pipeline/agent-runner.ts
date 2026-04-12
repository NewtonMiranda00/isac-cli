import type { AgentBackend } from "../backends.js";
import { runClaudePhase } from "./claude-runner.js";
import { runCodexPhase } from "./codex-runner.js";
import type { PhaseConfig, PhaseOutput } from "./types.js";

export function getDefaultModelForBackend(backend: AgentBackend): string {
  switch (backend) {
    case "claude":
      return "claude-sonnet-4-6";
    case "codex":
      return "gpt-5.4";
  }
}

export async function runAgentPhase(
  backend: AgentBackend,
  config: PhaseConfig,
  cwd: string,
  resumeSessionId?: string,
  onEvent?: (event: Record<string, unknown>) => void,
): Promise<PhaseOutput> {
  switch (backend) {
    case "claude":
      return runClaudePhase(config, cwd, resumeSessionId, onEvent);
    case "codex":
      return runCodexPhase(config, cwd, resumeSessionId, onEvent);
  }
}
