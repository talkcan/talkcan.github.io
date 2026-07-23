import { defineConfig } from "astro/config";
import { site } from "./src/config/site";

export default defineConfig({
  site: site.futureCanonicalOrigin ?? site.origin,
  output: "static",
  outDir: "./dist",
});
