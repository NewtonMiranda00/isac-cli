import { describe, it, expect } from "vitest";
import { ensureClaude, getClaudeVersion } from "../utils/claude.js";

describe("Claude utils", () => {
  it("ensureClaude returns a boolean", () => {
    const result = ensureClaude();
    expect(typeof result).toBe("boolean");
  }, 15_000);

  it("getClaudeVersion returns a string", () => {
    const result = getClaudeVersion();
    expect(typeof result).toBe("string");
  }, 15_000);
});
