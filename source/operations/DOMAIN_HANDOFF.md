# Custom-domain operator handoff

Recorded: 2026-07-23

## Completed operator actions

The maintainer reported completion of domain registration, OVH DNS records,
GitHub organization domain verification, and GitHub Pages custom-domain
association for `talkcan.io`.

## Observed publication state

- GitHub Pages publication source: GitHub Actions workflow
- Custom domain: `talkcan.io`
- Protected-domain state: verified
- GitHub certificate state: approved for `talkcan.io` and `www.talkcan.io`
- HTTPS enforcement: enabled
- HTTP behavior: `301` redirect to `https://talkcan.io/`
- Canonical source configuration: `https://talkcan.io`
- Sitemap and robots origin: `https://talkcan.io`
- Deployment trace: `/source-commit.txt`

Domain registration, OVH DNS ownership, future DNS changes, custom-domain
replacement, and certificate troubleshooting remain maintainer-controlled
operations. No registrar or DNS credential is stored in this repository or in
the Pages workflow.
