export const AGENT_BACKENDS = ["claude", "codex"] as const;

export type AgentBackend = (typeof AGENT_BACKENDS)[number];

const BACKEND_LABELS: Record<AgentBackend, string> = {
  claude: "Claude",
  codex: "Codex",
};

export function isAgentBackend(value: string): value is AgentBackend {
  return (AGENT_BACKENDS as readonly string[]).includes(value);
}

export function getAgentBackendLabel(backend: AgentBackend): string {
  return BACKEND_LABELS[backend];
}
