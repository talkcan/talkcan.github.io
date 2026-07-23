# Distribution assets

The current live-review raster files derive deterministically from the
maintainer-accepted Nanobanana raster through the controlled vector
reconstruction in `scripts/generate-brand-assets.py`. The script uses the
Nix-pinned `resvg` renderer, validates SVG safety, and reads each PNG IHDR at
native size before success. Canonical approval remains pending contextual
feedback.

| File | Native dimensions | Source |
| --- | ---: | --- |
| `public/favicon-16.png` | 16 × 16 px | `public/brand/talkcan-symbol.svg` |
| `public/favicon-32.png` | 32 × 32 px | `public/brand/talkcan-symbol.svg` |
| `public/apple-touch-icon.png` | 180 × 180 px | `public/brand/talkcan-symbol.svg` |
| `public/social-preview.png` | 1200 × 630 px | `source/brand/masters/social-preview-source.svg` |

The editable SVG and generator are the sources of truth. Do not edit generated
PNG files directly.
