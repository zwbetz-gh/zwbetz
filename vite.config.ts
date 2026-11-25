import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { type NitroPluginConfig, nitro } from "nitro/vite";
import { defineConfig } from "vite";

const nitroConfig = {
  hooks: {
    "build:config"(_nitro, { rolldown }) {
      const codeSplitting = rolldown?.output?.codeSplitting;
      if (!codeSplitting || typeof codeSplitting !== "object") return;

      for (const [index, group] of (codeSplitting.groups ?? []).entries()) {
        if (typeof group.name === "function" && !group.debugName) {
          group.debugName = `nitro-group-${index}`;
        }
      }
    },
  },
  rolldownConfig: {
    onLog(level, log, defaultHandler) {
      // Ignore warnings like these:

      // [MODULE_LEVEL_DIRECTIVE] The semantics of the module level directive "use client" in "node_modules/.pnpm/@tanstack+react-router@1.170.46_react-dom@19.3.1_react@19.3.1__react@19.3.1/node_modules/@tanstack/react-router/dist/esm/index.js" may not be preserved when bundling.
      //    ╭─[ node_modules/.pnpm/@tanstack+react-router@1.170.46_react-dom@19.3.1_react@19.3.1__react@19.3.1/node_modules/@tanstack/react-router/dist/esm/index.js:1:1 ]
      //    │
      //  1 │ "use client";
      //    │ ──────┬──────
      //    │       ╰──────── module level directive may not be preserved
      //    │
      //    │ Help: For more information, see https://rolldown.rs/in-depth/directives#other-directives
      // ───╯

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
