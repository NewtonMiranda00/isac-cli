"use client";

import { Renderer, JSONUIProvider } from "@json-render/react";
import { dsRegistry } from "./ds-registry";

interface DSPageProps {
  spec: Parameters<typeof Renderer>[0]["spec"];
}

export function DSPage({ spec }: DSPageProps) {
  return (
    <JSONUIProvider registry={dsRegistry}>
      <Renderer spec={spec} registry={dsRegistry} />
    </JSONUIProvider>
  );
}
