export const site = Object.freeze({
  name: "Talkcan",
  descriptor: "A programmable walkie-talkie for your tools.",
  brandLine: "Talk into the can.",
  origin: "https://talkcan.github.io",
  repositoryUrl: "https://github.com/talkcan/talkcan.github.io",
  organizationUrl: "https://github.com/talkcan",
  publicMaturity: "Pre-launch",
  previewImagePath: "/social-preview.png",
  futureCanonicalOrigin: null as string | null,
});

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, site.futureCanonicalOrigin ?? site.origin).href;
}
