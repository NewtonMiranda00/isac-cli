import { describe, expect, it } from "vitest";
import {
  AGENT_BACKENDS,
  getAgentBackendLabel,
  isAgentBackend,
} from "../backends.js";
import {
  getBackendUnavailableReason,
  isBackendImplemented,
} from "../utils/backend.js";

describe("backend support", () => {
  it("declares the supported backend keys", () => {
    expect(AGENT_BACKENDS).toEqual(["claude", "codex"]);
  });

  it("validates backend names", () => {
    expect(isAgentBackend("claude")).toBe(true);
    expect(isAgentBackend("codex")).toBe(true);
    expect(isAgentBackend("openai")).toBe(false);
  });

  it("exposes backend display labels", () => {
    expect(getAgentBackendLabel("claude")).toBe("Claude");
    expect(getAgentBackendLabel("codex")).toBe("Codex");
  });

  it("marks codex as not implemented yet", () => {
    expect(isBackendImplemented("codex")).toBe(true);
    expect(getBackendUnavailableReason("codex")).toContain("Codex CLI not found");
  });

  it("keeps claude implemented as well", () => {
    expect(isBackendImplemented("claude")).toBe(true);
    expect(getBackendUnavailableReason("claude")).toContain("Claude CLI not found");
  });
});
