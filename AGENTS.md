# AGENTS.md

## Authority

- Treat `source/brand/Talkcan_Brand_Community_Agent_Playbook.md` as the
  authoritative operational policy for public language, positioning, trust
  communication, and community-facing decisions.
- Treat `source/brand/Talkcan_Brand_Guidelines_v0.1.docx.pdf` as the visual and
  strategic reference. Its embedded raster artwork is reference material, not
  production-ready canonical artwork.
- Treat `source/openspec/establish-talkcan-website/` as the approved website
  implementation contract. If it conflicts with the general playbook on this
  website's scope, follow the narrower approved OpenSpec requirement.

## Approval Boundaries

- Obtain explicit maintainer approval at every boundary listed in section 22,
  "Escalation rules," of the operational playbook.
- Obtain explicit maintainer approval before selecting canonical artwork,
  changing the canonical descriptor or brand line, publishing roadmap
  commitments, announcing undocumented hardware support, making legal or
  policy statements, or changing official/community status.
- When approval is unavailable, publish no speculative statement. Use factual,
  conservative language or leave the material unpublished.

## Public Website Rules

- Use `Talkcan` in prose and lowercase `talkcan` for handles, repositories,
  commands, identifiers, and URLs.
- Do not mention the former application identity or imply migration,
  compatibility, downloads, installation, or released behavior without public
  Talkcan release evidence.
- Classify unreleased behavior as `Experimental`, `In progress`, `Planned`,
  `Community-maintained`, or `Concept`.
- Do not add placeholder destinations or invent privacy, security, governance,
  trademark, partnership, compatibility, or support claims.
- Keep public output static, accessible, and free of analytics, tracking,
  accounts, forms, mutable backends, and visitor identifiers.

## Tooling

- Use the repository's Nix development shell. Do not install Bun, Node.js, or
  build tooling globally.
- Build and validate the generated `dist/` output before publishing.
- Do not commit dependencies, local caches, generated `dist/`, secrets, DNS
  credentials, or registrar configuration.
