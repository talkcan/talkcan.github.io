import type { APIRoute } from "astro";

import { absoluteUrl } from "../config/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const homepage = absoluteUrl("/");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${homepage}</loc>
  </url>
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
