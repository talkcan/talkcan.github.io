import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const indexPath = join(distDir, "index.html");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function publicPathExists(pathname) {
  const cleanPath = decodeURIComponent(pathname.split(/[?#]/, 1)[0])
    .replace(/^\/+/, "");
  const candidate = join(distDir, cleanPath || "index.html");
  if (existsSync(candidate) && statSync(candidate).isFile()) return true;
  return existsSync(join(candidate, "index.html"));
}

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

check(existsSync(indexPath), "dist/index.html is missing");

if (!existsSync(indexPath)) {
  throw new Error(failures.join("\n"));
}

const html = readFileSync(indexPath, "utf8");
const requiredMarkup = [
  ["<header", "header landmark"],
  ["<nav", "navigation landmark"],
  ["<main id=\"main-content\"", "main landmark"],
  ["<footer", "footer landmark"],
  ["href=\"#main-content\"", "skip link"],
  ["<h1", "level-one heading"],
  ["Choose a channel", "interaction sequence"],
  ["Hold to talk", "interaction sequence"],
  ["Release", "interaction sequence"],
  ["Listen when something answers", "interaction sequence"],
];

for (const [needle, label] of requiredMarkup) {
  check(html.includes(needle), `Missing ${label}: ${needle}`);
}

check(
  (html.match(/<h1\b/g) ?? []).length === 1,
  "Homepage must contain exactly one h1",
);

const requiredMetadata = [
  /<title>[^<]+<\/title>/,
  /<meta name="description" content="[^"]+">/,
  /<meta name="robots" content="index, follow">/,
  /<link rel="canonical" href="https:\/\/talkcan\.io\/">/,
  /<meta property="og:title" content="[^"]+">/,
  /<meta property="og:description" content="[^"]+">/,
  /<meta property="og:url" content="https:\/\/talkcan\.io\/">/,
  /<meta property="og:image" content="https:\/\/talkcan\.io\/talkcan-social-preview\.png">/,
  /<meta name="twitter:card" content="summary_large_image">/,
  /<meta name="twitter:image" content="https:\/\/talkcan\.io\/talkcan-social-preview\.png">/,
];

for (const pattern of requiredMetadata) {
  check(pattern.test(html), `Missing metadata matching ${pattern}`);
}

const structuredDataScripts = [
  ...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
];
check(structuredDataScripts.length === 1, "Expected one JSON-LD graph");

if (structuredDataScripts.length === 1) {
  try {
    const graph = JSON.parse(structuredDataScripts[0][1])["@graph"];
    const types = new Set(graph.map((entry) => entry["@type"]));
    for (const type of ["WebSite", "Organization", "SoftwareApplication"]) {
      check(types.has(type), `JSON-LD is missing ${type}`);
    }
    const software = graph.find(
      (entry) => entry["@type"] === "SoftwareApplication",
    );
    check(
      software?.additionalProperty?.some(
        (property) =>
          property.name === "Public maturity" &&
          property.value === "Pre-launch",
      ),
      "SoftwareApplication must identify pre-launch maturity",
    );
    check(!software?.downloadUrl, "Pre-launch JSON-LD must not expose a download");
    check(!software?.softwareVersion, "Pre-launch JSON-LD must not claim a version");
    check(!software?.license, "No unapproved application license may be claimed");
  } catch (error) {
    failures.push(`Invalid JSON-LD: ${error.message}`);
  }
}

const forbiddenPatterns = [
  [/\bSubspace\b/i, "former-name reference"],
  [/\b(?:TODO|TBD)\b/i, "unfinished placeholder"],
  [/(?:example\.(?:com|org)|localhost|127\.0\.0\.1)/i, "placeholder URL"],
  [/(?:google-analytics|googletagmanager|gtag\(|plausible|umami|segment\.|mixpanel|hotjar|matomo|fathom)/i, "analytics or tracking integration"],
  [/<form\b/i, "form submission surface"],
  [/<(?:audio|video)\b/i, "unexpected audio or video"],
  [/\bautoplay\b/i, "autoplay behavior"],
  [/\blocalStorage\b|\bdocument\.cookie\b/i, "persistent visitor state"],
];

for (const [pattern, label] of forbiddenPatterns) {
  check(!pattern.test(html), `Found ${label}`);
}

const scripts = [...html.matchAll(/<script\b([^>]*)>/g)];
check(
  scripts.every((match) =>
    /type="application\/ld\+json"/.test(match[1]),
  ),
  "Only static JSON-LD scripts are allowed",
);

for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
  check(/\balt="[^"]*"/.test(image), `Image is missing alt text: ${image}`);
}

const ids = new Set(
  [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
);
const urls = [
  ...html.matchAll(/\b(?:href|src)="([^"]+)"/g),
].map((match) => match[1]);

for (const url of urls) {
  if (url.startsWith("#")) {
    check(ids.has(url.slice(1)), `Unresolved page fragment: ${url}`);
    continue;
  }
  if (/^(?:https?:|mailto:|tel:)/.test(url)) continue;
  check(publicPathExists(url), `Unresolved internal URL: ${url}`);
}

const requiredAssets = [
  "brand/talkcan-logo-reverse.svg",
  "brand/talkcan-symbol.svg",
  "favicon-16.png",
  "favicon-32.png",
  "apple-touch-icon.png",
  "talkcan-social-preview.png",
  "fonts/inter-latin.woff2",
  "robots.txt",
  "sitemap.xml",
];

for (const asset of requiredAssets) {
  check(existsSync(join(distDir, asset)), `Missing required asset: ${asset}`);
}

const robots = readFileSync(join(distDir, "robots.txt"), "utf8");
const sitemap = readFileSync(join(distDir, "sitemap.xml"), "utf8");
check(
  robots.includes("Sitemap: https://talkcan.io/sitemap.xml"),
  "robots.txt has the wrong sitemap origin",
);
check(
  sitemap.includes("<loc>https://talkcan.io/</loc>"),
  "sitemap.xml has the wrong homepage origin",
);

for (const path of filesUnder(distDir).filter(
  (candidate) => extname(candidate) === ".css",
)) {
  const css = readFileSync(path, "utf8");
  check(
    !/url\(["']?https?:\/\//i.test(css),
    `External CSS resource in ${path}`,
  );
}

if (failures.length > 0) {
  throw new Error(`Publication validation failed:\n- ${failures.join("\n- ")}`);
}

console.log(
  `Validated ${filesUnder(distDir).length} generated files, metadata, links, assets, and privacy boundaries`,
);
