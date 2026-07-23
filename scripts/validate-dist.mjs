import { existsSync, readFileSync } from "node:fs";

const indexPath = new URL("../dist/index.html", import.meta.url);

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html is missing; run the static build first");
}

const html = readFileSync(indexPath, "utf8");

if (!html.includes("<main")) {
  throw new Error("dist/index.html has no main landmark");
}

console.log("Validated generated dist/index.html");
