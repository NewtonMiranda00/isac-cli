import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { isAgentBackend, type AgentBackend } from "./backends.js";

const CONFIG_FILENAME = "isac.config.json";

export interface IsacConfig {
  projectName: string;
  backend: AgentBackend;
  framework: "nextjs";
  /** Used during scaffolding (isac start) to configure create-next-app flags */
  css: "tailwind" | "css-modules" | "vanilla";
  /** Used during scaffolding to init component library (e.g. shadcn) */
  componentLibrary: "shadcn" | "radix" | "headless" | "none";
  /** Used during scaffolding to install icon packages */
  iconLibrary: "lucide" | "heroicons" | "phosphor" | "radix-icons" | "none";
}

export function readConfig(dir: string): IsacConfig | null {
  const configPath = join(dir, CONFIG_FILENAME);
  if (!existsSync(configPath)) return null;
  try {
    const raw = readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<IsacConfig> & { backend?: string };
    const backend = isAgentBackend(parsed.backend ?? "claude")
      ? (parsed.backend ?? "claude")
      : "claude";
    return { ...parsed, backend } as IsacConfig;
  } catch {
    return null;
  }
}

export function writeConfig(dir: string, config: IsacConfig): void {
  const configPath = join(dir, CONFIG_FILENAME);
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}
