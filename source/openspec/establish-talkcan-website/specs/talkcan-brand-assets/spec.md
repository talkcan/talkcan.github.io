## ADDED Requirements

### Requirement: Canonical artwork requires explicit maintainer approval
Production artwork SHALL be derived from the supplied Talkcan brand sources and SHALL become canonical only after the maintainer reviews candidate presentations and explicitly approves one identity. Image-generation output, automatic tracing output, extracted PDF raster artwork, and unreviewed redraws SHALL NOT become canonical or ship on the production website merely because they were generated successfully.

#### Scenario: Candidate artwork is generated
- **WHEN** an image model, tracing tool, or vector editor produces a logo or symbol candidate
- **THEN** the candidate SHALL remain non-production review material
- **AND** the website SHALL NOT adopt it until explicit maintainer approval is recorded

### Requirement: Approved masters are true editable vectors
The canonical logo, symbol, reverse lockup, and monochrome variants SHALL be stored as editable SVG masters using paths, shapes, and deterministic typography treatment. Canonical SVG files SHALL NOT embed raster images, remote resources, scripts, event handlers, animation, editor-private binary payloads, or fonts fetched at render time. Their visible geometry SHALL remain legible at the documented minimum sizes.

#### Scenario: Canonical SVG is inspected
- **WHEN** an approved master is statically inspected
- **THEN** it SHALL contain no embedded raster image or executable content
- **AND** it SHALL render without network access
- **AND** its title or accessible use context SHALL identify the Talkcan mark

### Requirement: Asset family preserves canonical identity
The approved family SHALL include a horizontal logo, reverse horizontal logo, standalone symbol, dark monochrome mark, light monochrome mark, favicon source, and social-preview source. Every variant SHALL preserve `talkcan` as the visual wordmark treatment, one recognizable can, a string leaving the can, and branching endpoints without service logos. Variants SHALL use only approved brand colors or one solid monochrome color.

#### Scenario: Variant family is compared
- **WHEN** the approved variants are displayed together
- **THEN** their can, string, endpoints, proportions, and wordmark treatment SHALL identify one coherent mark
- **AND** no variant SHALL use `TalkCan`, metallic effects, service logos, or an unapproved color

### Requirement: Typography and colors are reproducible tokens
The asset source SHALL define the approved color values `#16181D`, `#F7F3E8`, `#F25F5C`, `#F6C945`, `#2256A8`, `#B9C0C8`, `#FFFFFF`, and `#2D7A55` as named reusable tokens. Wordmark and website typography SHALL use an approved Inter source and SHALL retain the applicable font license without committing an unlicensed or model-generated imitation of the typeface.

#### Scenario: Website consumes brand tokens
- **WHEN** the website renders a brand color or canonical type role
- **THEN** it SHALL reference the shared token or documented type role
- **AND** it SHALL not introduce a visually similar magic value as a second brand authority

### Requirement: Distribution assets derive from approved masters
Raster favicons, application icons, and social-preview images SHALL be generated or exported from approved source artwork at documented dimensions. Re-running deterministic export steps with the same source SHALL produce visually equivalent output. Generated distribution files SHALL NOT become an independent editable source of truth.

#### Scenario: Distribution images are regenerated
- **WHEN** approved vector or social-card sources are exported again
- **THEN** the outputs SHALL have the documented dimensions and color treatment
- **AND** replacing generated files SHALL not require manually redrawing the canonical mark

### Requirement: Brand sources retain provenance and usage guidance
The website source repository SHALL retain the operational playbook, visual guideline reference or an immutable reference to it, asset provenance, approval record, font and asset licenses, canonical filenames, permitted use, and prohibited transformations. These source materials SHALL remain outside the generated public site unless a specific file is intentionally selected for publication.

#### Scenario: Future maintainer changes public artwork
- **WHEN** a maintainer prepares a logo or brand-asset change
- **THEN** the repository SHALL expose the canonical source, provenance, applicable license, and approval boundary
- **AND** the maintainer SHALL be able to distinguish source references from public build output

### Requirement: Brand assets support accessible website use
Decorative uses of the symbol SHALL be suppressible from accessibility APIs, while meaningful logo uses SHALL expose the name `Talkcan`. Social preview and documentation examples SHALL not rely on the image to communicate essential product status, installation instructions, or safety information.

#### Scenario: Logo appears beside visible product name
- **WHEN** the symbol is rendered next to visible `Talkcan` text
- **THEN** the symbol SHALL be marked decorative to avoid duplicate announcement

#### Scenario: Standalone logo links to the homepage
- **WHEN** the logo is the only visible content of a homepage link
- **THEN** the link SHALL expose an accessible name identifying the Talkcan homepage
