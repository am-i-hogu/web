import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../public");

const config: StorybookConfig = {
  stories: ["../overview.mdx", "../storybook-guide.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: fs.existsSync(publicDir) ? ["../../public"] : [],
  async viteFinal(viteConfig) {
    return {
      ...viteConfig,
      plugins: [...(viteConfig.plugins ?? []), svgr({ include: "**/*.svg" })],
      define: {
        ...(viteConfig.define ?? {}),
        "process.env": JSON.stringify({}),
      },
      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...(viteConfig.resolve?.alias ?? {}),
          "@": path.resolve(dirname, "../../src"),
        },
      },
    };
  },
};
export default config;
