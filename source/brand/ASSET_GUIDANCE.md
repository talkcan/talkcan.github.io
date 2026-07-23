# Talkcan website asset guidance

## Sources and approval

- The operational authority is
  `Talkcan_Brand_Community_Agent_Playbook.md`.
- The visual reference is `Talkcan_Brand_Guidelines_v0.1.docx.pdf`.
- Embedded PDF artwork is raster reference material, not a production master.
- Candidate artwork remains review material until a maintainer records explicit
  approval. Do not publish a candidate as the canonical identity.

## Required geometry

The mark uses one simplified, recognizable can, one string leaving the can, and
branches toward multiple abstract endpoints. The horizontal lockup uses the
lowercase visual wordmark `talkcan`. Endpoints do not contain service logos.
Keep the can upright enough to remain recognizable and preserve the approved
relationship between symbol and wordmark.

## Variants

An approved family contains a horizontal lockup, reverse horizontal lockup,
standalone symbol, dark monochrome mark, light monochrome mark, favicon source,
and social-preview source. Use the full lockup when the audience may not know
the symbol. Use the standalone symbol for favicons, avatars, app icons, and
compact labels.

## Clear space and minimum size

- Keep clear space equal to the height of the can's top rim on every side.
- Do not render the full lockup below 160 CSS pixels wide on screen or 32 mm
  wide in print.
- No smaller canonical symbol limit is approved yet. Candidate review must show
  the symbol at 16 and 32 CSS pixels; the approval record must state the
  smallest accepted rendered size before canonical assets ship.

## Color and typography

Use only the named values in `src/styles/tokens.css` or one solid monochrome
color. Use Inter ExtraBold for display and deterministic wordmark-adjacent
headlines; use Inter Regular, Medium, and Bold for interface and body text. Use
Liberation Mono or a system monospace for code. Retain applicable font and
asset licenses in `source/licenses/`.

## Prohibited transformations

Do not stretch, rotate, casually redraw, outline, bevel, add metal gradients,
reflections, photorealistic textures, remote fonts, service logos, or
unapproved colors. Do not use `TalkCan` in the wordmark. Production SVG must
contain no raster embedding, remote resource, script, event handler, animation,
or editor-private binary payload.

## Accessibility

A standalone meaningful logo exposes the name `Talkcan`. A symbol beside
visible `Talkcan` text is decorative and hidden from accessibility APIs. Never
use color alone to communicate state. Do not use small white body text on Can
Red.
