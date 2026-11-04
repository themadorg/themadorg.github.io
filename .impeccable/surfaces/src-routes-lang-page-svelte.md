---
version: 1
slug: "src-routes-lang-page-svelte"
primary_target: "src/routes/[lang]/+page.svelte"
related_targets: []
---

# Surface brief: landing (`/[lang]/`)

Scope: the org landing page in four locales (en, fa RTL, es, ru), plus the 404 ("Return to sender"). Mode: **Persuade**.

Audience and job: funders first (understand, trust, write to hello@themadorg.net), then self-hosters (reach Madmail/Bedrud install), developers (repos, Madcore), contributors (GitHub).
Proof on hand: eight real projects, live sites (screenshots of madmail.chat, bedrud.org, deltachat.wiki, admin.madmail.chat), real licenses, the real Madmail one-command install. No testimonials, funders, metrics.
Constraints: static prerender, offline WebXDC build (local fonts and images only), dark/light toggle and language switch preserved, reading works without JS.

## Direction contract

THESIS: Chatmail is mail, so the org arrives as airmail. The page is an envelope you open: the front addresses the visitor, the contents are the letter (why), the stamp sheet (projects), the route (how a message travels through our stack) and a registered-mail slip for funders. Refuses the dark dev-tool page with mono labels and a card grid.

OWN-WORLD: white envelope paper (#fff) and cool paper tone (#eef0f2) with near-black ink; airmail chevron border in brand red (#d7262e) and airmail blue (#1d3a8a) drawn as an SVG pattern; perforated postage stamps carrying real product screenshots; circular postmarks with wavy cancellation lines; the blue PAR AVION label. Sofia Sans Extra Condensed caps for display (stamp lettering), Sofia Sans for text, Vazirmatn for Persian. Flat fields, no shadows at rest, no gradients.

STORY: In the first screen a funder reads who we are and what we build, sees "Write to us" as the primary action, and can re-address the envelope to their role (Funders, Self-hosters, Developers, Contributors) to get their own next step. Scrolling: the letter explains the principles, the stamp sheet proves the work, the route shows how the projects fit, the install slip proves self-hosting is one command, the red registered-mail section asks for funding, FAQ answers plainly, the footer is the return address.

FIRST VIEWPORT: full-viewport envelope face framed by the chevron border on all four edges. Top-left: return address (TMO mark small, TheMadOrg, Austria). Top-right: the TMO mark as a perforated stamp, a postmark ring stamped across its corner. Left two-thirds: h1 "We care about communication." at display scale over the pitch sentence; below it the "To:" address block with the four-role switch and the role-specific line plus primary action (red, square) and secondary link. Blue PAR AVION label stuck lower right.

FORM: Airmail (impeccable's pick, candidate 1 on the ordered list); seed key 1da4645b. Signature interaction: re-addressing the envelope (role switch) with the address lines and primary action re-setting in place; a letter that travels the route diagram as it scrolls into view.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
