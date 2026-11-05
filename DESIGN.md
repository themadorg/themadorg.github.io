---
name: TheMadOrg
description: We care about communication. Open-source chatmail and self-hosted communication infrastructure, delivered as airmail.
colors:
  paper: "light-dark(#ffffff, #14161b)"
  paper-2: "light-dark(#eceef1, #1c1f26)"
  paper-3: "light-dark(#dfe3e8, #262a33)"
  ink: "light-dark(#121418, #eef0f3)"
  ink-2: "light-dark(#474c55, #aab0bb)"
  red: "light-dark(#d7262e, #ff4d55)"
  on-red: "light-dark(#ffffff, #14161b)"
  red-field: "#c41f28"
  red-field-ink: "#ffffff"
  blue: "light-dark(#1d3a8a, #8ea8f0)"
  blue-field: "#1d3a8a"
  blue-field-ink: "#ffffff"
  focus: "light-dark(#1d3a8a, #8ea8f0)"
  slip-paper: "#ffffff"
  slip-paper-2: "#eceef1"
  slip-ink: "#121418"
  picture-backdrop: "#111318"
  sheet: "#ffffff"
  sheet-2: "#eceef1"
  sheet-3: "#dfe3e8"
  sheet-red: "#d7262e"
typography:
  display:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Sofia Sans Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.25rem, 1.6rem + 6.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Sofia Sans Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Sofia Sans Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.7vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "'Sofia Sans Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Sofia Sans Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "'Sofia Sans Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  code:
    fontFamily: "ui-monospace, 'SFMono-Regular', 'Cascadia Mono', Menlo, Consolas, monospace"
    fontSize: "0.9375rem"
    lineHeight: 1.7
rounded:
  none: "0"
  circle: "50%"
spacing:
  margin: "clamp(1.25rem, 4vw, 3rem)"
  content-max: "86rem"
  section-gap: "clamp(6rem, 4rem + 8vw, 11rem)"
components:
  action:
    backgroundColor: "{colors.red-field}"
    textColor: "{colors.red-field-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.5rem"
    height: "3.25rem"
  action-hover:
    backgroundColor: "color-mix(in oklab, var(--red-field) 86%, #000)"
    textColor: "{colors.red-field-ink}"
  action-compact:
    backgroundColor: "{colors.red-field}"
    textColor: "{colors.red-field-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  textlink:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  role-tab:
    textColor: "{colors.ink-2}"
    typography: "{typography.body}"
    padding: "0.35rem 0 0.45rem"
  role-tab-selected:
    textColor: "{colors.ink}"
  tool-button:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    height: "2.5rem"
  tool-button-hover:
    backgroundColor: "{colors.paper-3}"
  stamp-sheet:
    backgroundColor: "{colors.sheet-2}"
    rounded: "{rounded.none}"
    padding: "clamp(1.75rem, 3.2vw, 3rem)"
  stamp:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(14px, 1.4vw, 18px)"
  stamp-face-red:
    backgroundColor: "{colors.red-field}"
    textColor: "{colors.red-field-ink}"
  stamp-face-blue:
    backgroundColor: "{colors.blue-field}"
    textColor: "{colors.blue-field-ink}"
  par-avion:
    backgroundColor: "{colors.blue-field}"
    textColor: "{colors.blue-field-ink}"
    typography: "{typography.h3}"
    padding: "0.55rem 1rem 0.6rem"
  aerogramme:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(8px, 1vw, 12px)"
  customs-slip:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  customs-contents:
    backgroundColor: "{colors.sheet-2}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    padding: "1rem 1.1rem"
  copy-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.small}"
    padding: "0.45rem 0.9rem"
    height: "2.5rem"
  copy-button-done:
    backgroundColor: "{colors.red-field}"
    textColor: "{colors.red-field-ink}"
  route-key:
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "1.5rem 1.25rem 1.25rem"
  registered-slip:
    backgroundColor: "{colors.slip-paper}"
    textColor: "{colors.slip-ink}"
    padding: "clamp(1.5rem, 3vw, 2.25rem)"
  faq-item:
    backgroundColor: "{colors.sheet-2}"
    textColor: "{colors.ink}"
    typography: "{typography.lead}"
    padding: "1.25rem clamp(1.25rem, 2.5vw, 1.75rem)"
  envelope-back:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(8px, 1vw, 14px)"
---

# Design System: TheMadOrg

## Overview

**Creative North Star: "Airmail"**

Chatmail is mail, so the site arrives as an airmail envelope. Every surface is a piece of postal paper: the envelope face framed by red-and-blue chevron bands, one perforated sheet of stamps (the four projects with a live site carry its screenshot, the rest carry an engraved two-colour vignette), an aerogramme edged with chevrons, CN 22 customs-declaration slips for the install commands, a route map with its key, a registered-mail slip for funders, and, to close the page, the back of the envelope with the return address on its flap. The postal vocabulary is the system, not ornament layered on a generic page; new surfaces should be another piece of mail (a slip, a label, a stamp, a form) before they are a card or a panel.

The material is flat paper and printed ink. Depth comes from paper tone steps (paper, paper-2, paper-3) and from things being stuck on slightly crooked (the hero stamp at 4deg, the PAR AVION label at -2deg, the registered slip at 1.5deg, the envelope back at -0.8deg), never from shadows at rest. Colour is postal: near-black ink on white or cool-grey paper, with airmail red as the brand voice and airmail blue as its second. Lettering borrows from stamps: heavy extra-condensed capitals for display, a warm humanist sans for reading.

Density is generous and editorial: a full-viewport envelope, wide section gaps, one reading column per section, each section composed on its own grid (see Layout). Every locale is first-class, including RTL Persian, and the whole site works offline as a WebXDC mini-app, so every font and image is self-hosted.

**Key Characteristics:**
- Postal-object vocabulary: envelope, stamp sheet, postmark, aerogramme, customs slip, route map, registered slip, return address.
- Flat paper tone steps for depth; one shadow in the whole system, on the floating language menu.
- Square corners everywhere; perforations and postal circles are the only non-rectilinear edges.
- Red and blue airmail chevrons as the signature pattern.
- Extra-condensed uppercase display, humanist sans text, Vazirmatn for Persian.
- Strong ease-out motion, short durations, press feedback, hover only for fine pointers.

## Colors

A postal palette: paper and ink, one brand red, one airmail blue. Themed values resolve through `light-dark()` so the OS decides unless `data-theme` pins a scheme; the `sheet` steps are plain hex set per scheme.

### Primary
- **Airmail Red** (`red`): the brand voice in text and marks. The selected role tab underline, the address labels (From, To, the customs slip's From), the customs slip's red "what it is" line, principle leads in the letter, "ours" stops and their names on the route, the route key's relay node, the FAQ plus, footer titles and the back-to-top arrow, link underlines, language-menu active code, text selection, the skip link. Brightens in dark mode where it sits on the desk.
- **On Red** (`on-red`): text on a themed red fill. Used by the skip link and the 404 slip's home button.
- **Registered Red** (`red-field`): the scheme-fixed red. The primary action button (nav and envelope), the copy button's done state, the full-bleed funding section, red stamp faces, the hero stamp's 3px printed frame, the registered slip's R block and square bullets, the selvage's red colour check. It does not change with theme.
- **Registered Ink** (`red-field-ink`): white lettering on the red field and on actions.

### Secondary
- **Airmail Blue** (`blue`): the second postal colour. WIP status on stamps and the route key's Bedrud line symbol. Lightens in dark mode. (The chevron bands are hard-coded `#d7262e` / `#1d3a8a` inside the `--airmail` SVG, not drawn from `--blue`.)
- **Par Avion Blue** (`blue-field`, `blue-field-ink`): the scheme-fixed blue field. The PAR AVION label, blue stamp faces, the selvage's blue colour check, the registered slip's focus ring.

### Neutral
- **Envelope Paper** (`paper`): page ground (the desk), nav bar, the envelope face, the hero stamp's perforation holes, the route key caption ground, the CN 22 slip's 0.375rem outline margin, the top flap of the envelope back, the copy button's text.
- **Cool Paper** (`paper-2`): the second sheet. The stamp-sheet selvage and its perforation holes, the hero stamp body, the customs slip's write-in Contents field, the bottom flap of the envelope back, tool buttons, language-menu hover.
- **Deep Paper** (`paper-3`): hover step for tool buttons, scrollbar thumb, the side flaps (base) of the envelope back.
- **Ink** (`ink`): text, the 3px rule above the "To" block, the letterhead's 2px rule, the CN 22 slip's 2px frame and 1px field rules, the route key's 2px frame, route nodes and cancellations, the copy button ground.
- **Faded Ink** (`ink-2`): secondary text: unselected role tabs, the return address's product line ("Madmail · Bedrud · Madcore"), stamp meta and source links, form captions, selvage marks, language codes, footer notes.
- **Focus Blue** (`focus`): the 3px focus ring, airmail blue in both schemes.
- **Slip Paper** (`slip-paper`, `slip-paper-2`, `slip-ink`): scheme-fixed paper. The registered slip and its "Registered" text block; the white ground behind the hero stamp's logo.
- **Picture Backdrop** (`picture-backdrop`): the dark screen ground a stamp screenshot letterboxes into.
- **Sheet Paper** (`sheet`, `sheet-2`, `sheet-3`): the paper that postal objects are printed on. White / cool grey / deep grey in light mode; in dark mode a slightly dimmed light paper (`#e7e9ec` / `#d6dade` / `#c8cdd3`), never dark paper.
- **Sheet Red** (`sheet-red`): red ink printed on paper; inside `.sheet` it stands in for `red`. `#d7262e` in light mode; on the dimmed dark-mode sheet the brand red would drop to 4.1:1, so small red labels take a deeper `#b81f27` (5.3:1).
- **Desk** (`#0c0e12`, local to the footer): the near-black desk the envelope is turned over on, in both themes.

### Named Rules
**The Dark-Desk Rule.** Dark mode darkens the desk, not the mail. The page ground, nav, section text, route map and stamp-sheet heading follow the theme; every postal object carries the global `.sheet` class, which sets `color-scheme: light` so every `light-dark()` token inside resolves to its light value, and maps `paper`/`paper-2`/`paper-3` onto the per-theme `sheet` steps and `red` onto `sheet-red`. The carriers are the envelope frame, the stamp-sheet selvage and each stamp's paper, the aerogramme, both CN 22 slips, the registered slip, the route's flying letter glyph and the envelope back in the footer; the standalone 404 slip follows the same rule with its own inline tokens. FAQ cards do the same by hand (`color-scheme: light; background: var(--sheet-2)`). The footer inverts the rule on purpose: it sets `color-scheme: dark` on a fixed `#0c0e12` desk in both themes, with the `.sheet` envelope back lying on it. Paper stays paper; it only dims a little at night.

**The Scheme-Fixed Field Rule.** Red and blue fields (the action button, the funding section, stamp faces, PAR AVION, the selvage colour checks) and the registered-mail slip keep the same colours in light and dark. They are printed matter, not themed UI.

**The Postal Pair Rule.** Red and blue are the only chromatic colours. Red leads (actions, labels, emphasis); blue seconds it (the airmail label, stamp faces, status). Nothing else is introduced, and no gradient ever blends them; they meet only as hard-edged chevron bands.

## Typography

**Display Font:** Sofia Sans Extra Condensed Variable (with Sofia Sans Variable, Arial Narrow)
**Body Font:** Sofia Sans Variable (with system-ui)
**Persian:** Vazirmatn Variable (with Tahoma)
**Mono:** system monospace stack, literal install commands only

**Character:** stamp lettering over a readable humanist text face. Display is always weight 800, uppercase, tight (0.92 line-height, -0.01em tracking), balanced; text is calm at 1.125rem / 1.55 with tabular numerals. All three faces are self-hosted via Fontsource so the offline WebXDC build renders identically. The standalone 404 slip loads no bundle, so it self-hosts its own copy of the display face (`/fonts/sofia-sans-extra-condensed-latin-wght-normal.woff2`) and sets body text in system faces.

### Hierarchy
- **Display** (800, `--step-display`, 0.92): the hero h1 ("We care about communication", max 12ch) and the funding h2 (balanced, no max width so es/ru stay on two lines). The funding h2 drops to the h2 step under 640px. The 404 headline uses the same clamp.
- **Headline** (800, `--step-h2`, 0.92): section h2s, the aerogramme's subject line, featured stamp names (Madmail, Bedrud), the project name on each customs slip, the funding email address.
- **Title** (800, `--step-h3`, 0.92): stamp names, route stops, nav wordmark, letterhead name, PAR AVION, letter signature, the registered slip's R block and header.
- **Lead** (400 or 700, `--step-lead`, 1.5): pitch, section ledes, letter intro, FAQ questions (the h3 re-set in the text face, 700, sentence case, 1.3). In the display face at 800 uppercase, lead is the label size: the From/To address labels, the customs slip's form title ("Customs declaration") and form code ("CN 22"), the route key caption, the footer's "Return address" and list titles, the denomination tag on screenshot stamps.
- **Body** (400, `--step-body`, 1.55 / 1.6 in the letter and FAQ answers): reading text, measure held to 34-44rem. Featured stamp blurbs and wide stamp blurbs step up to body.
- **Small** (400-700, `--step-small`): meta, nav links (600), tool buttons, copy button, form captions (600), the route key, the funding checklist, footer notes.
- **Stamp face lettering** (800 display, container-relative): the denomination `clamp(1.25rem, 11cqi, 2.5rem)`; the issuer line `clamp(0.8125rem, 5.5cqi, 1.125rem)` at 0.24em tracking, optically re-centred with a -0.24em end margin. The selvage plate number is display 800 at 0.8125rem, 0.14em tracking.

### Named Rules
**The Condensed-First Persian Rule.** Under `:lang(fa)` the display stack is `'Sofia Sans Extra Condensed Variable', 'Vazirmatn Variable', Tahoma`. Sofia carries no Arabic-script glyphs, so Persian falls through to Vazirmatn per glyph while Latin brand names (Madmail, Delta Chat, TheMadOrg) keep the condensed display cut and still fit their stamps. Persian headings take line-height 1.25 and zero tracking; Persian body takes line-height 1.8; the return-address motto drops its tracking.

**The Em-Not-Ch Rule.** `ch` is measured on the Latin display face, far narrower than Persian letters, so any heading width set in `ch` is re-set in `em` under `:lang(fa)` (the hero h1 goes from 12ch to 8em).

**The Literal-Only Mono Rule.** The monospace stack is used only for literal install commands in the customs slip's Contents field (`dir="ltr"`, `text-align: left`, one block per command line with a 2ch hanging indent so a soft-wrapped continuation never reads as a new command). It never sets labels, metadata, or UI.

## Layout

One centred column of `--content-max` (86rem) plus `--margin` gutters (`clamp(1.25rem, 4vw, 3rem)`). Sections are separated by `--section-gap` (clamp 6rem to 11rem). There is no single house grid; each piece of mail is composed on its own:

- **Envelope:** fills the first viewport (`min(100svh - 5.25rem, 58rem)`) inside the chevron frame. Its face is laid out like a real envelope on named areas (`'from stamp' 'par stamp' 'h1 .' 'pitch to'`) in even halves (1fr/1fr: the headline is capped at 12ch anyway, and the To block needs the room for four role tabs on one line in Persian and Russian): return address and PAR AVION top inline-start, the stamp in the top inline-end corner, headline and pitch lower inline-start, the "To" block lower inline-end. Under 900px the areas stack (`1fr auto`), keeping the stamp beside the return address; under 640px the logo drops from the return address and the "To" block goes to one column.
- **Stamp sheet:** heading on a 5/7 split (one column at 1179px and below). The plate is a 4-column grid of named areas at 1180px and up: Madmail and Bedrud each take a 2x2 block, Madmail Admin and Delta Chat Wiki take two columns, Madexchanger, Madexchanger-php, Relay Ping and Madcore take one. At 1179px and below it becomes two columns (Madmail and Bedrud full width), at 699px and below one.
- **Aerogramme:** a single centred 58rem sheet, no grid; its body text held to 44rem.
- **Route map:** `1fr | minmax(19rem, 27rem)` with areas `'head key' 'track track'`; the key narrows to `minmax(17rem, 22rem)` between 861 and 1100px. The track is five equal stops. At 860px and below everything stacks (head, track, key) and the route turns into a vertical line.
- **Install:** one shared grid (7fr/5fr) for the heading, the lede (in the second column) and both CN 22 slips, with five shared subgrid rows so the two forms rule their fields on the same lines. Between 961 and 1199px the two slips take even halves so the narrower form's fact boxes are not crushed; one column at 960px and below.
- **Funding:** 8/4, the registered slip in the narrow column; one column at 960px and below.
- **FAQ:** 5/7, heading beside the cards; one column at 860px and below.
- **Footer:** the desk is 7/5, envelope back beside the three link lists; stacked at 1100px and below (back centred at up to 50rem); lists in two columns at 640px and below, with languages as one wrapping row.
- **Nav:** sticky on paper; its links hide at 1020px and below, leaving language, theme and the compact "Write to us" action; the wordmark hides at 480px and below.

Breakpoints are component-local: 1199, 1180/1179, 1100, 1020, 960, 900, 860, 699, 640 and 480px, plus container queries (a featured stamp goes landscape at 760px of its own width; the envelope back's flap reshapes at 720px and 480px of its own width). All positioning uses logical properties (`inset-inline-*`, `margin-inline`, `border-inline-*`) so RTL mirrors without overrides; directional glyphs (action arrow, tab underline origin, crooked tilts, the letter's flight, the route cancellations) flip explicitly under `:dir(rtl)`.

## Elevation & Depth

The system is flat. Depth is paper stacked on paper: `paper` on `paper-2` on `paper-3` (the envelope back builds its folds from exactly those three steps), the scheme-fixed red and blue fields as the strongest planes, and the footer's near-black desk under the last envelope. Physical presence comes from small rotations (stuck-on labels and stamps) and perforation, not from cast light. Hovering a stamp lifts it 4px with a slight turn, but still casts nothing.

### Shadow Vocabulary
- **Floating overlay** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.12), 0 12px 32px rgb(0 0 0 / 0.18)`): the language menu only, because it genuinely floats over content.

### Named Rules
**The Paper-Not-Light Rule.** No shadows at rest and no gradients anywhere. The one shadow belongs to a real floating overlay. If something needs to stand forward, step its paper tone or stick it on crooked.

## Shapes

Square corners throughout (radius 0): actions, tabs, tool buttons, sheets, slips, stamps, fields, the logo where it appears in chrome. The only non-square edges are postal: the stamp perforation, the circular postmark, the route's circular nodes and hand cancellations, the selvage registration targets, the envelope back's diagonal folds, and the airmail chevrons (diagonal bands, a 40px SVG tile in `--airmail`).

**The Perforation Rule.** Perforation is a 10px dotted border in the colour of the ground beneath, carried as `--hole`, centred on the edge with a -5px inset. On the stamp sheet stamps butt together with no gap, so the perforation is the gutter: each stamp's `.paper::before` punches only its block-start row (`border-block-start`) and `.paper::after` only its inline-start column (`border-inline-start`), and the plate's own `::after` punches the outer block-end and inline-end edges. In a complete tiling every shared edge is the start edge of exactly one stamp, so each gutter carries exactly one row of holes. `--hole` is `paper-2`, the selvage's tone, so the holes read as punched through to the margin. The lone hero stamp on the envelope is perforated on all four sides by one `inset: -5px` dotted border in `paper`. Never draw perforation with images, masks, or radial gradients.

**The Chevron Rule.** The airmail band is the single `--airmail` SVG pattern, red `#d7262e` and blue `#1d3a8a` diagonals on paper, shown as a border by padding a paper object over the tile. It frames the envelope face, the envelope back and the 404 slip (40px tile), edges the aerogramme on all four sides (24px tile) and draws the route line (20px tile); the route key redraws it as polygons in its relay symbol. It is not used as a general divider.

## Components

### Buttons
Flat, square, decided once.
- **Action (primary):** `red-field` fill, `red-field-ink` text, 700 text face at body size, 3.25rem min height, 0.85rem 1.5rem padding, optional trailing arrow (flipped in RTL). Compact variant in the nav at 2.5rem / small size.
- **Hover:** fill darkens to 86% `red-field` mixed with black; the arrow nudges 3px in reading direction. Only under `(hover: hover) and (pointer: fine)`.
- **Press:** `scale(0.97)` over `--dur-press`.
- **Text link (secondary):** 700 ink with a 2px red underline at 0.3em offset; hover opens the offset to 0.42em.
- **Tool buttons (language trigger, theme toggle):** 2.5rem square-cornered `paper-2` blocks, hover to `paper-3`, press `scale(0.94-0.96)`.
- **Copy button:** an ink block with paper text and a copy icon, in the customs slip's Contents caption row. On copy the icon swaps to a check and the block turns `red-field` for 1.6s; the label is announced via `aria-live`. Hover mixes the ink 82% with paper. If the clipboard is blocked (inside WebXDC) the command stays selectable.

### Address Labels
The envelope's printed form fields: "From", "To", and the customs slip's "From". Display face, 800, uppercase, lead size, in red. They label a real field next to them; they are not section eyebrows above headings.

### Role Tabs (signature: re-addressing)
The "To" line of the envelope. A tablist of four roles (funders, self-hosters, developers, contributors) in 700 body text, `ink-2` unselected, `ink` selected with a 3px red underline that scales in from the reading-start edge. Arrow keys follow reading direction; Home/End jump. Switching re-addresses the envelope in place: the line and actions settle in over 260ms from 6px down and 3px blur, inside a fixed-min-height panel (7.25rem, 10rem on phones) so nothing below jumps.

### Return Address
The envelope's top inline-start corner: the red "From" label over the logo, the org name in body 700 and, where a return address would carry its second line, what we make (`Madmail · Bedrud · Madcore`, forced LTR) in `ink-2`.

### Hero Stamp and Postmark
The hero stamp is the TMO logo on `slip-paper` inside a 3px `red-field` printed frame, on a `paper-2` stamp body turned 4deg, perforated on all four sides. A **postmark** cancels it: a circular mark (two rings, three wavy lines, ring text and the build date) in ink at 0.82 opacity, multiply-blended, turned -8deg, placed at 58% from the top and 42% from the right at 150% of the stamp's width. Its ring reads `TheMadOrg · Madmail · Bedrud ·` (the org name and the first two things we make) at 0.16em tracking, and it is always Latin and LTR in every locale (`lang="en"`, `direction: ltr`, decorative). In RTL the mark is mirrored by geometry, never by flipping the SVG: the `mirrored` prop moves the ring to the other end of the waves, and the corner uses physical `left`/`right` offsets because the forced-LTR SVG would resolve logical insets the wrong way.

### PAR AVION Label
Blue field, display caps at h3 size over a small 600 sub-line ("By air mail"), -2deg, stuck under the return address as its own grid item; shown at every width; decorative.

### Stamp Sheet
One printed sheet of stamps. The `.selvage.sheet` is the sheet's margin in `paper-2`, padded `--selvage` (`clamp(1.75rem, 3.2vw, 3rem)`). The margin carries the marks a printer leaves on a sheet, all decorative, `lang="en"` and Latin everywhere, in `ink-2`: the plate number "TMO 1" at the top inline-start (with a red and a blue colour check) and bottom inline-end, registration targets in the opposite corners, and centre-line arrows pointing at the middle gutter (hidden at 699px and below). The plate places every stamp in a fixed reading order, so tab order follows the eye, and gives each a red or blue tone for its face.

### Stamps
The project card, printed on the sheet. Each stamp's `.paper.sheet` has `clamp(14px, 1.4vw, 18px)` padding, a 4:3 picture and a body. Projects with a live site (Madmail, Bedrud, Madmail Admin, Delta Chat Wiki) show a real screenshot of it, `object-fit: contain` on `picture-backdrop` so nothing is cropped, with a paper denomination tag (the project's language) in the top inline-end corner. Featured stamps (Madmail, Bedrud) stretch their picture to fill the double block (`cover`, top-centred), set the name at h2 size and the blurb at body, and go landscape (picture 56%) when the stamp is at least 760px wide. Wide stamps (Madmail Admin, Delta Chat Wiki) go landscape (picture 58%) at 1180px and up. Below the picture: title, blurb, meta (group in red 700, license, WIP in blue 700), then links ("Website" or "Repository" underlined in red, plus a `ink-2` source link that sits above the stamp's full-cover link). The whole stamp is the link. Hover (fine pointers, motion allowed) lifts 4px and turns -0.6deg (mirrored in RTL) with the picture scaling to 1.04; press scales to 0.985; keyboard focus outlines the paper in 3px focus blue at 4px offset and raises the stamp above its neighbours' perforation.

### Stamp Face
The engraved face for stamps without a screenshot (Madexchanger, Madexchanger-php, Relay Ping, Madcore). A flat two-colour print: a `red-field` or `blue-field` ground with field-ink lines. At the top inline-end, the denomination is the project's language (`lang="en"`, `dir="ltr"`). In the middle, a vignette window with a 1.5px frame and a 1px keyline at 3px offset over a fine horizontal hatch holds a drawing of what the project does: two relay masts with a sealed letter on the HTTPS arc between them (Madexchanger), a receiving server hauling the letter out of a pillar box (Madexchanger-php), a ping and the latency matrix it fills in (Relay Ping), JSON braces around a plug meeting its socket (Madcore). Along the bottom, centred, is the issuer line: "TheMadOrg". The project name is never repeated on the face; the stamp's h3 carries it. On hover the vignette scales to 1.04 from its foot.

### Aerogramme
The letter section is one `.sheet`, max 58rem, padded `clamp(8px, 1vw, 12px)` over the 24px airmail tile so the chevron edge shows on all four sides, as on the printed form. Inside, a paper `.leaf` holds the letterhead (52px logo, the org name in display at h3 size, then the tagline and the email in `ink-2` small) over a 2px ink rule, the subject line as the section's h2, then greeting (700), intro (lead), the four principles with red bold leads, and a display-caps signature turned -2deg (2deg in RTL, with the transform origin on the reading-start side). The section needs no separate header.

### Route Map
How a message travels: five stops (Delta Chat app, Madmail relay, Madexchanger, their relay, delivered; the middle two are "ours") on a 20px airmail line, with a map key in the end corner.
- **Stops:** 34px circular nodes with a 5px ink ring on paper; "ours" stops are solid red with a paper inner ring, their names red. Names at h3, notes small.
- **Letter flight:** a 44x30 envelope glyph (`svg.letter.sheet`, paper with a 3px ink outline and flap) sits in a lane over the line. When the track comes into view (IntersectionObserver, bottom edge raised 38%) it flies the line's whole length (`100cqi - 44px`, mirrored in RTL) over 2.4s on `--ease-in-out`. At 860px and below the line turns vertical at the start edge and the letter flies down it (`100cqb - 30px`) to rest at its foot.
- **Cancellations:** each stop carries a small hand cancellation (ring and two waves, ink at 0.82). As the letter passes a stop, its cancellation strikes from scale 1.35 over `--dur-ui`. In RTL the waves trail the other way; on the vertical route they turn 90deg to run down the line.
- **Key:** a 2px ink box whose caption ("Around the route", display lead) sits in its top rule on a paper ground, as on a printed map. Four entries, each a 48x24 symbol drawn from the route's own vocabulary: a red relay node on the airmail band (Madmail Admin), two nodes and a dashed link (Relay Ping), a ruled sheet (Delta Chat Wiki), a blue line with an open node (Bedrud).
- Without script or with reduced motion the letter is shown delivered at the end and every stop is already cancelled.

### Customs Slips (Install)
Each install command is a CN 22 customs declaration, a `.slip.sheet` with a 2px ink frame and a 0.375rem paper outline (the paper's own margin, so the frame still reads on the dark desk). Five ruled rows (1px ink), shared with the neighbouring slip through subgrid:
1. **Form head:** "Customs declaration" (display lead, uppercase) ruled off from the form code "CN 22" (forced LTR).
2. **From:** the red address label beside the project name (h2 size) and a red 700 line saying what it is.
3. **Facts:** boxed fields with `ink-2` captions: License and Language (from the project record, never the slip, wrapped in `bdi`), and a "Read the docs" text link. At 480px and below License and Language share a row and the docs link spans beneath.
4. **Contents:** the caption and the copy button, then the literal command in mono small on the form's `paper-2` write-in field. At 480px and below the field runs rule to rule at 0.8125rem.
5. **Note:** caption plus a short small-text note.

### Registered Slip (Funding)
The funding section is the one fully committed field: `red-field`, edge to edge, white lettering, a display-size h2, a lead body and the email address set in display at h2 size (breakable at the @). Beside it, a scheme-fixed `slip-paper` slip rotated 1.5deg (mirrored in RTL): a "Registered" header (a red R block beside the label on `slip-paper-2`), a title, a checklist with red square bullets, and a link to GitHub underlined in red.

### FAQ
Stacked filing cards in `sheet-2` (paper in both themes). The question is an h3 re-set in the text face (700, lead, sentence case); a red plus rotates 45deg when open and scales to 0.9 on press; the panel height animates via `::details-content` block-size. The first card is open by default. Hover turns the question red.

### Navigation
Sticky paper bar: square logo plus the display wordmark, small 600-weight links whose red underline fades in on hover, then the language menu (the one floating overlay, opening from scale 0.96 over 180ms), the theme toggle and the compact action.

### Footer (Back of the Envelope)
The page closes the way a letter does: turned over on the desk. The footer is a fixed `#0c0e12` desk with `color-scheme: dark` in both themes. On it lies the envelope back, a `.back.sheet` padded over the 40px airmail tile so the band runs round it as it does round the face, turned -0.8deg (0.8deg in RTL). The back's folds are three flat paper tones cut with `clip-path`, no lines and no shading: the side flaps (`paper-3` base), the bottom flap (`paper-2` triangle), and the top flap (`paper`). The flap shape follows the envelope's own width through container queries (deeper flap and longer shoulders at 720px and 480px) so the address always stays printed on the flap. The return address is centred on the flap: "Return address" in red display lead, then the org name, the email and the GitHub address (red underlines), and last the motto "We care about communication" in uppercase 700 at 0.08em tracking. Beside the envelope, three lists on the desk (Projects, Organization, Languages) with red display titles; underneath, a hairline and a notes row (licenses, where the stamp images come from, back to top).

### 404 Slip
`/404.html` is a standalone "Return to sender" slip with no app bundle and no script: a 12px airmail edge around a paper slip, a red 3px-bordered "404" stamp at -8deg in the inline-end corner, the headline in the self-hosted display face at the display step, a body line, a red home button and the language links. It carries its own inline copy of the paper, ink, red, on-red, focus, sheet and airmail tokens. The page ground follows the OS scheme; the slip is paper (`color-scheme: light` on the airmail edge, the slip on `--sheet`, dimmed to `#e7e9ec` on a dark desk), the same rule as `.sheet`. It is `noindex`.

### Motion
Ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entering and responding; ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` only for the letter glyph's 2.4s flight along the route. Durations: press 140ms, UI 220ms, entrance 640ms. There is no generic scroll reveal; each entrance belongs to a piece of mail:
- **Hero stamp:** drops in from -14px and -6deg (700ms, 120ms delay), then the postmark cancels it from scale 1.18 (520ms, 620ms delay).
- **Stamp sheet settle:** the section's single entrance. Each stamp is laid onto the sheet as it comes into view (IntersectionObserver, threshold 0.12, bottom edge raised 8%), from `opacity 0`, 14px up, `scale 1.03` and -1.2deg (1.2deg in RTL) over `--dur-enter`; stamps arriving together are laid down 70ms apart.
- **Re-addressing:** the role panel settles in over 260ms.
- **Route:** the letter's flight and the per-stop cancellations.
- **Small responses:** language menu 180ms, copy icon swap, FAQ height and plus rotation at `--dur-ui`.

Entrance states apply only under `html.js` (and the settle only on `screen`), so content is visible without script and in print. Transitions, not keyframes, for anything interruptible. `prefers-reduced-motion: reduce` kills travel (the readdress drops to 0ms, the route shows delivered) and collapses all durations to 0.01ms.

## Do's and Don'ts

### Do:
- **Do** make every new surface a piece of mail: a slip, label, stamp, sheet or form, in paper and ink.
- **Do** put the global `.sheet` class on every postal object so it stays light paper on a dark desk.
- **Do** resolve themed colours through the `light-dark()` tokens and keep red and blue fields scheme-fixed.
- **Do** set display type in Sofia Sans Extra Condensed, 800, uppercase, and keep Sofia first in the Persian display stack.
- **Do** re-set any `ch` heading width in `em` under `:lang(fa)`.
- **Do** perforate stamps on the sheet by their start edges only, in the `--hole` colour, and let the plate punch the outer end edges, so every gutter carries one row of holes.
- **Do** let the return address and the postmark name what we make (Madmail, Bedrud, Madcore) and the org's motto.
- **Do** use logical properties and flip directional glyphs under `:dir(rtl)`.
- **Do** give every pressable element a press scale (0.94-0.985) and gate hover effects behind `(hover: hover) and (pointer: fine)`.
- **Do** use `--ease-out` with `--dur-press` / `--dur-ui` / `--dur-enter`, and honour reduced motion.
- **Do** self-host every font and image so the WebXDC build works offline.

### Don't:
- **Don't** cast shadows at rest or use gradients; the language menu is the only shadow.
- **Don't** round corners; radius is 0 except circles that are postal (postmark, route nodes and cancellations, registration targets).
- **Don't** use monospace for anything but literal install commands.
- **Don't** localise the postmark or flip it with `scale: -1 1`; it is Latin and LTR everywhere, mirrored only by moving its ring.
- **Don't** repeat a project's name on its stamp face; the stamp's h3 carries it.
- **Don't** add colours beyond paper, ink, airmail red and airmail blue.
- **Don't** add a generic scroll reveal; entrances belong to a postal object, and entrance states apply only under `html.js`.
- **Don't** load fonts or images from the network.
