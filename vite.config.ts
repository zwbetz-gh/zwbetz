import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { type NitroPluginConfig, nitro } from "nitro/vite";
import { defineConfig } from "vite";

const nitroConfig = {
  rolldownConfig: {
    onLog(level, log, defaultHandler) {
      if (
        level === "warn" &&
        log.code === "MODULE_LEVEL_DIRECTIVE" &&
        log.message.includes('"use client"')
      ) {
        return;
      }

      defaultHandler(level, log);
    },
  },
} satisfies NitroPluginConfig;

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    nitro(nitroConfig),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
