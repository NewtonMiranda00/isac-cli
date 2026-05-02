// Auto-generated from globals.css — design system token data
// ─── Site Info ──────────────────────────────────────────────────
export const siteInfo = {
  name: "Anthropic",
  domain: "anthropic.com",
  tagline: "",
  description: "",
};

// ─── Branding ───────────────────────────────────────────────────
export const branding = {
  logoUrl: "",
  faviconUrl: "",
  ogImageUrl: "",
  aboutText: "",
};

// ─── Typography ─────────────────────────────────────────────────
export const fonts = {
  display: "\"Times New Roman\"",
  sans: "\"Times New Roman\"",
  mono: "\"SF Mono\", \"Fira Code\", ui-monospace, monospace",
};

export const fontSizes: { label: string; size: string; sample: string }[] = [
  { label: "xs", size: "12px", sample: "Extra Small" },
  { label: "sm", size: "14px", sample: "Small" },
  { label: "base", size: "16px", sample: "Base" },
  { label: "lg", size: "18px", sample: "Large" },
  { label: "xl", size: "20px", sample: "Extra Large" },
  { label: "2xl", size: "24px", sample: "Heading 2XL" },
  { label: "3xl", size: "30px", sample: "Heading 3XL" },
  { label: "4xl", size: "36px", sample: "Heading 4XL" },
  { label: "display", size: "48px", sample: "Display" },
];

export const fontWeights: { label: string; weight: number }[] = [
  { label: "regular", weight: 400 },
  { label: "medium", weight: 500 },
  { label: "semibold", weight: 600 },
  { label: "bold", weight: 700 },
];

// ─── Spacing ────────────────────────────────────────────────────
export const spacing: { label: string; var: string; px: string }[] = [];

// ─── Border Radius ──────────────────────────────────────────────
export const radii: { label: string; value: string }[] = [
  { label: "sm", value: "4px" },
  { label: "md", value: "8px" },
  { label: "lg", value: "12px" },
  { label: "xl", value: "16px" },
  { label: "pill", value: "9999px" },
];

// ─── Shadows ────────────────────────────────────────────────────
export const shadows: { label: string; var: string; value: string }[] = [];

// ─── Icons ─────────────────────────────────────────────────────
export const icons: { library: string; names: string[]; count: number } = {
  library: "none",
  names: [],
  count: 0,
};

// ─── Primitive Palette ──────────────────────────────────────────
export const primitives: { name: string; var: string; hex: string }[] = [
  {
    "name": "white",
    "var": "--sf-white",
    "hex": "#ffffff"
  },
  {
    "name": "black",
    "var": "--sf-black",
    "hex": "#000000"
  },
  {
    "name": "gray-50",
    "var": "--sf-gray-50",
    "hex": "#f9fafb"
  },
  {
    "name": "gray-100",
    "var": "--sf-gray-100",
    "hex": "#e5e7eb"
  },
  {
    "name": "gray-200",
    "var": "--sf-gray-200",
    "hex": "#ced0d5"
  },
  {
    "name": "gray-300",
    "var": "--sf-gray-300",
    "hex": "#b3b8c3"
  },
  {
    "name": "gray-400",
    "var": "--sf-gray-400",
    "hex": "#969fb2"
  },
  {
    "name": "gray-500",
    "var": "--sf-gray-500",
    "hex": "#7785a4"
  },
  {
    "name": "gray-600",
    "var": "--sf-gray-600",
    "hex": "#6b7280"
  },
  {
    "name": "gray-700",
    "var": "--sf-gray-700",
    "hex": "#46567b"
  },
  {
    "name": "gray-800",
    "var": "--sf-gray-800",
    "hex": "#324160"
  },
  {
    "name": "gray-900",
    "var": "--sf-gray-900",
    "hex": "#1f2937"
  },
  {
    "name": "gray-950",
    "var": "--sf-gray-950",
    "hex": "#111827"
  },
  {
    "name": "accent",
    "var": "--sf-accent",
    "hex": "#2563eb"
  },
  {
    "name": "link",
    "var": "--sf-link",
    "hex": "#2563eb"
  }
];

// ─── Semantic Tokens ────────────────────────────────────────────
export const semanticTokens: {
  category: string;
  tokens: { name: string; var: string; lightRef: string; darkRef: string }[];
}[] = [
  {
    "category": "Background",
    "tokens": [
      {
        "name": "bg-primary",
        "var": "--color-bg-primary",
        "lightRef": "gray-50",
        "darkRef": "gray-950"
      },
      {
        "name": "bg-secondary",
        "var": "--color-bg-secondary",
        "lightRef": "gray-50",
        "darkRef": "gray-900"
      },
      {
        "name": "bg-tertiary",
        "var": "--color-bg-tertiary",
        "lightRef": "gray-50",
        "darkRef": "gray-800"
      }
    ]
  },
  {
    "category": "Text",
    "tokens": [
      {
        "name": "text-primary",
        "var": "--color-text-primary",
        "lightRef": "gray-950",
        "darkRef": "gray-100"
      },
      {
        "name": "text-secondary",
        "var": "--color-text-secondary",
        "lightRef": "gray-600",
        "darkRef": "gray-400"
      },
      {
        "name": "text-tertiary",
        "var": "--color-text-tertiary",
        "lightRef": "gray-900",
        "darkRef": "gray-600"
      },
      {
        "name": "text-inverse",
        "var": "--color-text-inverse",
        "lightRef": "white",
        "darkRef": "gray-950"
      },
      {
        "name": "text-link",
        "var": "--color-text-link",
        "lightRef": "link",
        "darkRef": "link"
      }
    ]
  },
  {
    "category": "Border",
    "tokens": [
      {
        "name": "border-primary",
        "var": "--color-border-primary",
        "lightRef": "gray-100",
        "darkRef": "gray-800"
      },
      {
        "name": "border-secondary",
        "var": "--color-border-secondary",
        "lightRef": "gray-200",
        "darkRef": "gray-700"
      },
      {
        "name": "border-subtle",
        "var": "--color-border-subtle",
        "lightRef": "gray-50",
        "darkRef": "gray-800"
      }
    ]
  },
  {
    "category": "Surface",
    "tokens": [
      {
        "name": "surface-elevated",
        "var": "--color-surface-elevated",
        "lightRef": "white",
        "darkRef": "gray-900"
      },
      {
        "name": "surface-sunken",
        "var": "--color-surface-sunken",
        "lightRef": "gray-50",
        "darkRef": "gray-950"
      }
    ]
  },
  {
    "category": "Accent",
    "tokens": [
      {
        "name": "accent",
        "var": "--color-accent",
        "lightRef": "accent",
        "darkRef": "accent"
      }
    ]
  }
];
