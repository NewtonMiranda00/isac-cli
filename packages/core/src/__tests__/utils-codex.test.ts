import { describe, expect, it } from "vitest";
import { ensureCodex, getCodexVersion } from "../utils/codex.js";

describe("Codex utils", () => {
  it("ensureCodex returns a boolean", () => {
    const result = ensureCodex();
    expect(typeof result).toBe("boolean");
  });

  it("getCodexVersion returns a string", () => {
    const result = getCodexVersion();
    expect(typeof result).toBe("string");
  }, 15_000);
});
