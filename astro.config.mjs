import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  scopedStyleStrategy: "class",
  integrations: [
    preact({
      include: ["**/*.[jt]sx", "./node_modules/shared/**/*.ts"],
    }),
  ],
});
