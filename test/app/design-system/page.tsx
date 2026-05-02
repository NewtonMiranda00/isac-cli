import type { Metadata } from "next";
import { DSPage } from "./json-render/ds-page";

export const metadata: Metadata = {
  title: "Design System \u2014 Anthropic",
  description: "Design system tokens and components extracted from anthropic.com",
};

const spec = {
  "root": "page",
  "elements": {
    "header": {
      "type": "DSHeader",
      "props": {
        "siteName": "Anthropic",
        "domain": "anthropic.com"
      }
    },
    "palette": {
      "type": "DSColorPalette",
      "props": {
        "title": "Color Palette",
        "subtitle": "Primitive color tokens extracted from CSS custom properties.",
        "colors": [
          {
            "name": "white",
            "varName": "--sf-white",
            "hex": "#ffffff"
          },
          {
            "name": "black",
            "varName": "--sf-black",
            "hex": "#000000"
          },
          {
            "name": "gray-50",
            "varName": "--sf-gray-50",
            "hex": "#f9fafb"
          },
          {
            "name": "gray-100",
            "varName": "--sf-gray-100",
            "hex": "#e5e7eb"
          },
          {
            "name": "gray-200",
            "varName": "--sf-gray-200",
            "hex": "#ced0d5"
          },
          {
            "name": "gray-300",
            "varName": "--sf-gray-300",
            "hex": "#b3b8c3"
          },
          {
            "name": "gray-400",
            "varName": "--sf-gray-400",
            "hex": "#969fb2"
          },
          {
            "name": "gray-500",
            "varName": "--sf-gray-500",
            "hex": "#7785a4"
          },
          {
            "name": "gray-600",
            "varName": "--sf-gray-600",
            "hex": "#6b7280"
          },
          {
            "name": "gray-700",
            "varName": "--sf-gray-700",
            "hex": "#46567b"
          },
          {
            "name": "gray-800",
            "varName": "--sf-gray-800",
            "hex": "#324160"
          },
          {
            "name": "gray-900",
            "varName": "--sf-gray-900",
            "hex": "#1f2937"
          },
          {
            "name": "gray-950",
            "varName": "--sf-gray-950",
            "hex": "#111827"
          },
          {
            "name": "accent",
            "varName": "--sf-accent",
            "hex": "#2563eb"
          },
          {
            "name": "link",
            "varName": "--sf-link",
            "hex": "#2563eb"
          }
        ]
      }
    },
    "semantics": {
      "type": "DSSemanticTokens",
      "props": {
        "title": "Semantic Tokens",
        "subtitle": "Token aliases that map to primitives, with automatic dark mode support.",
        "groups": [
          {
            "category": "Background",
            "tokens": [
              {
                "name": "bg-primary",
                "varName": "--color-bg-primary",
                "lightRef": "gray-50",
                "lightHex": "#f9fafb",
                "darkRef": "gray-950",
                "darkHex": "#111827"
              },
              {
                "name": "bg-secondary",
                "varName": "--color-bg-secondary",
                "lightRef": "gray-50",
                "lightHex": "#f9fafb",
                "darkRef": "gray-900",
                "darkHex": "#1f2937"
              },
              {
                "name": "bg-tertiary",
                "varName": "--color-bg-tertiary",
                "lightRef": "gray-50",
                "lightHex": "#f9fafb",
                "darkRef": "gray-800",
                "darkHex": "#324160"
              }
            ]
          },
          {
            "category": "Text",
            "tokens": [
              {
                "name": "text-primary",
                "varName": "--color-text-primary",
                "lightRef": "gray-950",
                "lightHex": "#111827",
                "darkRef": "gray-100",
                "darkHex": "#e5e7eb"
              },
              {
                "name": "text-secondary",
                "varName": "--color-text-secondary",
                "lightRef": "gray-600",
                "lightHex": "#6b7280",
                "darkRef": "gray-400",
                "darkHex": "#969fb2"
              },
              {
                "name": "text-tertiary",
                "varName": "--color-text-tertiary",
                "lightRef": "gray-900",
                "lightHex": "#1f2937",
                "darkRef": "gray-600",
                "darkHex": "#6b7280"
              },
              {
                "name": "text-inverse",
                "varName": "--color-text-inverse",
                "lightRef": "white",
                "lightHex": "#ffffff",
                "darkRef": "gray-950",
                "darkHex": "#111827"
              },
              {
                "name": "text-link",
                "varName": "--color-text-link",
                "lightRef": "link",
                "lightHex": "#2563eb",
                "darkRef": "link",
                "darkHex": "#2563eb"
              }
            ]
          },
          {
            "category": "Border",
            "tokens": [
              {
                "name": "border-primary",
                "varName": "--color-border-primary",
                "lightRef": "gray-100",
                "lightHex": "#e5e7eb",
                "darkRef": "gray-800",
                "darkHex": "#324160"
              },
              {
                "name": "border-secondary",
                "varName": "--color-border-secondary",
                "lightRef": "gray-200",
                "lightHex": "#ced0d5",
                "darkRef": "gray-700",
                "darkHex": "#46567b"
              },
              {
                "name": "border-subtle",
                "varName": "--color-border-subtle",
                "lightRef": "gray-50",
                "lightHex": "#f9fafb",
                "darkRef": "gray-800",
                "darkHex": "#324160"
              }
            ]
          },
          {
            "category": "Surface",
            "tokens": [
              {
                "name": "surface-elevated",
                "varName": "--color-surface-elevated",
                "lightRef": "white",
                "lightHex": "#ffffff",
                "darkRef": "gray-900",
                "darkHex": "#1f2937"
              },
              {
                "name": "surface-sunken",
                "varName": "--color-surface-sunken",
                "lightRef": "gray-50",
                "lightHex": "#f9fafb",
                "darkRef": "gray-950",
                "darkHex": "#111827"
              }
            ]
          },
          {
            "category": "Accent",
            "tokens": [
              {
                "name": "accent",
                "varName": "--color-accent",
                "lightRef": "accent",
                "lightHex": "#2563eb",
                "darkRef": "accent",
                "darkHex": "#2563eb"
              }
            ]
          }
        ]
      }
    },
    "tab-colors": {
      "type": "DSTabPanel",
      "props": {},
      "children": [
        "palette",
        "semantics"
      ]
    },
    "typography": {
      "type": "DSTypography",
      "props": {
        "title": "Typography",
        "families": [
          {
            "key": "sans",
            "stack": "\"Times New Roman\""
          },
          {
            "key": "display",
            "stack": "\"Times New Roman\""
          },
          {
            "key": "mono",
            "stack": "\"SF Mono\", \"Fira Code\", ui-monospace, monospace"
          }
        ],
        "sizes": [
          {
            "label": "xs",
            "size": "12px",
            "sample": "Extra Small"
          },
          {
            "label": "sm",
            "size": "14px",
            "sample": "Small"
          },
          {
            "label": "base",
            "size": "16px",
            "sample": "Base"
          },
          {
            "label": "lg",
            "size": "18px",
            "sample": "Large"
          },
          {
            "label": "xl",
            "size": "20px",
            "sample": "Extra Large"
          },
          {
            "label": "2xl",
            "size": "24px",
            "sample": "Heading 2XL"
          },
          {
            "label": "3xl",
            "size": "30px",
            "sample": "Heading 3XL"
          },
          {
            "label": "4xl",
            "size": "36px",
            "sample": "Heading 4XL"
          },
          {
            "label": "display",
            "size": "48px",
            "sample": "Display"
          }
        ],
        "weights": [
          {
            "label": "regular",
            "weight": 400
          },
          {
            "label": "medium",
            "weight": 500
          },
          {
            "label": "semibold",
            "weight": 600
          },
          {
            "label": "bold",
            "weight": 700
          }
        ]
      }
    },
    "tab-typography": {
      "type": "DSTabPanel",
      "props": {},
      "children": [
        "typography"
      ]
    },
    "spacing": {
      "type": "DSSpacing",
      "props": {
        "title": "Spacing",
        "items": [
          {
            "label": "1",
            "px": "4px"
          },
          {
            "label": "2",
            "px": "8px"
          },
          {
            "label": "3",
            "px": "12px"
          },
          {
            "label": "4",
            "px": "16px"
          },
          {
            "label": "6",
            "px": "24px"
          },
          {
            "label": "8",
            "px": "32px"
          },
          {
            "label": "12",
            "px": "48px"
          },
          {
            "label": "16",
            "px": "64px"
          }
        ]
      }
    },
    "radii": {
      "type": "DSRadii",
      "props": {
        "title": "Border Radius",
        "items": [
          {
            "label": "sm",
            "value": "4px"
          },
          {
            "label": "md",
            "value": "8px"
          },
          {
            "label": "lg",
            "value": "12px"
          },
          {
            "label": "xl",
            "value": "16px"
          },
          {
            "label": "pill",
            "value": "9999px"
          }
        ]
      }
    },
    "shadows": {
      "type": "DSShadows",
      "props": {
        "title": "Shadows",
        "items": [
          {
            "label": "sm",
            "value": "0 1px 2px rgba(0,0,0,0.05)"
          },
          {
            "label": "md",
            "value": "0 4px 12px rgba(0,0,0,0.08)"
          },
          {
            "label": "lg",
            "value": "0 8px 24px rgba(0,0,0,0.1)"
          },
          {
            "label": "xl",
            "value": "0 16px 48px rgba(0,0,0,0.12)"
          }
        ]
      }
    },
    "tab-spacing": {
      "type": "DSTabPanel",
      "props": {},
      "children": [
        "spacing",
        "radii",
        "shadows"
      ]
    },
    "components": {
      "type": "DSComponents",
      "props": {
        "title": "Components",
        "primaryButton": null,
        "secondaryButton": null
      }
    },
    "tab-components": {
      "type": "DSTabPanel",
      "props": {},
      "children": [
        "components"
      ]
    },
    "backgrounds": {
      "type": "DSBackgrounds",
      "props": {
        "title": "Section Backgrounds",
        "pageBackground": "#ffffff",
        "sections": []
      }
    },
    "tab-backgrounds": {
      "type": "DSTabPanel",
      "props": {},
      "children": [
        "backgrounds"
      ]
    },
    "page-images": {
      "type": "DSImages",
      "props": {
        "title": "Page Images",
        "images": [],
        "summary": {
          "backgroundImages": 0,
          "formats": {},
          "lazyLoaded": 0,
          "total": 0,
          "withAlt": 0,
          "withoutAlt": 0
        }
      }
    },
    "tab-images": {
      "type": "DSTabPanel",
      "props": {},
      "children": [
        "page-images"
      ]
    },
    "examples-header": {
      "type": "DSExamplesHeader",
      "props": {
        "title": "Layout Examples",
        "subtitle": "See the design system in action with realistic page sections."
      }
    },
    "hero-example": {
      "type": "DSHeroExample",
      "props": {
        "siteName": "Anthropic",
        "tagline": null
      }
    },
    "features-example": {
      "type": "DSFeatureGridExample",
      "props": {}
    },
    "pricing-example": {
      "type": "DSPricingExample",
      "props": {}
    },
    "testimonials-example": {
      "type": "DSTestimonialsExample",
      "props": {}
    },
    "cta-example": {
      "type": "DSCTAExample",
      "props": {
        "siteName": "Anthropic"
      }
    },
    "tab-examples": {
      "type": "DSTabPanel",
      "props": {},
      "children": [
        "examples-header",
        "hero-example",
        "features-example",
        "pricing-example",
        "testimonials-example",
        "cta-example"
      ]
    },
    "tabs": {
      "type": "DSTabs",
      "props": {
        "tabs": [
          "Colors",
          "Typography",
          "Spacing & Shape",
          "Components",
          "Backgrounds",
          "Images",
          "Layout Examples"
        ],
        "defaultTab": 0
      },
      "children": [
        "tab-colors",
        "tab-typography",
        "tab-spacing",
        "tab-components",
        "tab-backgrounds",
        "tab-images",
        "tab-examples"
      ]
    },
    "footer": {
      "type": "DSFooter",
      "props": {
        "domain": "anthropic.com"
      }
    },
    "page": {
      "type": "DSPage",
      "props": {
        "siteName": "Anthropic",
        "domain": "anthropic.com",
        "pageBackground": "#ffffff"
      },
      "children": [
        "header",
        "tabs",
        "footer"
      ]
    }
  }
} as const;

export default function DesignSystemPage() {
  return <DSPage spec={spec} />;
}
