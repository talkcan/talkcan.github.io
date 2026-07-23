export const site = Object.freeze({
  name: "Talkcan",
  descriptor: "A programmable walkie-talkie for your tools.",
  title: "Talkcan — A programmable walkie-talkie for your tools.",
  description:
    "Talkcan is a pre-launch, open-source programmable walkie-talkie for routing voice through configurable channels.",
  brandLine: "Talk into the can.",
  origin: "https://talkcan.github.io",
  repositoryUrl: "https://github.com/talkcan/talkcan.github.io",
  organizationUrl: "https://github.com/talkcan",
  publicMaturity: "Pre-launch",
  language: "en",
  locale: "en_US",
  previewImagePath: "/talkcan-social-preview.png",
  futureCanonicalOrigin: "https://talkcan.io",
});

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, site.futureCanonicalOrigin ?? site.origin).href;
}
