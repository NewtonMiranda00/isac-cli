import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

export const dsCatalog = defineCatalog(schema, {
  components: {
    DSPage: {
      props: z.object({ siteName: z.string(), domain: z.string(), pageBackground: z.string().optional() }),
      slots: ["default"],
      description: "Root wrapper for the design system documentation page.",
    },
    DSHeader: {
      props: z.object({ siteName: z.string(), domain: z.string() }),
      description: "Design system page header.",
    },
    DSTabs: {
      props: z.object({ tabs: z.array(z.string()), defaultTab: z.number().optional() }),
      slots: ["default"],
      description: "Tab container.",
    },
    DSTabPanel: {
      props: z.object({}),
      slots: ["default"],
      description: "Tab content wrapper.",
    },
    DSBrandIdentity: {
      props: z.object({
        name: z.string(), tagline: z.string().nullable(), description: z.string().nullable(),
        logoUrl: z.string().nullable(), faviconUrl: z.string().nullable(),
      }),
      description: "Brand identity section.",
    },
    DSColorPalette: {
      props: z.object({
        title: z.string(), subtitle: z.string().nullable(),
        colors: z.array(z.object({ name: z.string(), varName: z.string(), hex: z.string() })),
      }),
      description: "Color swatch grid.",
    },
    DSSemanticTokens: {
      props: z.object({
        title: z.string(), subtitle: z.string().nullable(),
        groups: z.array(z.object({
          category: z.string(),
          tokens: z.array(z.object({
            name: z.string(), varName: z.string(),
            lightRef: z.string(), lightHex: z.string(), darkRef: z.string(), darkHex: z.string(),
          })),
        })),
      }),
      description: "Semantic token table.",
    },
    DSTypography: {
      props: z.object({
        title: z.string(),
        families: z.array(z.object({ key: z.string(), stack: z.string() })),
        sizes: z.array(z.object({ label: z.string(), size: z.string(), sample: z.string() })),
        weights: z.array(z.object({ label: z.string(), weight: z.number() })),
      }),
      description: "Typography section.",
    },
    DSSpacing: {
      props: z.object({ title: z.string(), items: z.array(z.object({ label: z.string(), px: z.string() })) }),
      description: "Spacing scale.",
    },
    DSRadii: {
      props: z.object({ title: z.string(), items: z.array(z.object({ label: z.string(), value: z.string() })) }),
      description: "Border radius showcase.",
    },
    DSShadows: {
      props: z.object({ title: z.string(), items: z.array(z.object({ label: z.string(), value: z.string() })) }),
      description: "Shadow showcase.",
    },
    DSBackgrounds: {
      props: z.object({
        title: z.string(), pageBackground: z.string(),
        sections: z.array(z.object({
          label: z.string(), bgColor: z.string().nullable(), bgGradient: z.string().nullable(),
          bgImage: z.string().nullable(), textColor: z.string().nullable(),
          hasOverlay: z.boolean(), height: z.number(),
        })),
      }),
      description: "Section background showcase.",
    },
    DSComponents: {
      props: z.object({
        title: z.string(),
        primaryButton: z.object({
          bg: z.string(), color: z.string(), borderRadius: z.string(),
          border: z.string().nullable(), padding: z.string(),
          fontSize: z.string(), fontWeight: z.string(),
          boxShadow: z.string().nullable(),
        }).nullable(),
        secondaryButton: z.object({
          bg: z.string(), color: z.string(), borderRadius: z.string(),
          border: z.string().nullable(), padding: z.string(),
          fontSize: z.string(), fontWeight: z.string(),
          boxShadow: z.string().nullable(),
        }).nullable(),
      }),
      description: "Component showcase.",
    },
    DSImages: {
      props: z.object({
        title: z.string(),
        images: z.array(z.object({
          src: z.string(), alt: z.string(), width: z.number(), height: z.number(),
          naturalWidth: z.number(), naturalHeight: z.number(), format: z.string(),
          loading: z.string(), objectFit: z.string(), section: z.string(), isBackground: z.boolean(),
        })),
        summary: z.object({
          total: z.number(), formats: z.record(z.number()), lazyLoaded: z.number(),
          withAlt: z.number(), withoutAlt: z.number(), backgroundImages: z.number(),
        }),
      }),
      description: "Image gallery.",
    },
    DSIcons: {
      props: z.object({ title: z.string(), library: z.string(), count: z.number(), names: z.array(z.string()) }),
      description: "Icon library section.",
    },
    DSExamplesHeader: {
      props: z.object({ title: z.string(), subtitle: z.string() }),
      description: "Divider heading for layout examples.",
    },
    DSHeroExample: {
      props: z.object({ siteName: z.string(), tagline: z.string().nullable() }),
      description: "Example Hero section.",
    },
    DSFeatureGridExample: {
      props: z.object({}),
      description: "Example Feature Grid section.",
    },
    DSPricingExample: {
      props: z.object({}),
      description: "Example Pricing Table section.",
    },
    DSTestimonialsExample: {
      props: z.object({}),
      description: "Example Testimonials section.",
    },
    DSCTAExample: {
      props: z.object({ siteName: z.string() }),
      description: "Example CTA section.",
    },
    DSFooter: {
      props: z.object({ domain: z.string() }),
      description: "Page footer.",
    },
  },
  actions: {},
});
