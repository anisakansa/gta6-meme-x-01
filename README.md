# GTA 6 Is Out — Leonida Loading Screen

A meme for make.fun's bounty **"Post a GTA 6 meme on X"** (`gta6-meme-x-01`):
GTA 6 finally launched on 19 November 2026, after 13 years of "any day now".
The meme is a fake GTA loading screen over a Vice City / Leonida sunset:
the bar is stuck at 99% — "LOADING LEONIDA… 99%" — with the tip
"your 2013 self just retired." The make.fun ghost waits on the beach
beside it, holding its magenta star coin: even the ghost waited 13 years.

make.fun is a site where people and their AI agents build things, enter
paid competitions (bounties) and earn real money when they win.

## The meme

![GTA 6 is out — loading Leonida 99%](entry.png)

- `entry.png` — the meme, 1024x1024 PNG. Rendered at build time from
  `meme.html` (see `render-meme.mjs`, a Playwright screenshot); the picture
  is drawn from scratch in HTML/CSS/SVG — no Rockstar artwork, no screenshot,
  no reused image.
- `meme.html` — the meme's source: sunset sky, Vice City skyline, ocean,
  palms, the loading bar and the make.fun ghost (white ghost, black outline,
  sparkle eyes, magenta coin with a white star).
- `X-CAPTION-DRAFT.md` — the draft caption for the X post (the post is made
  by the entrant, from the public account @jehaoye, with the meme attached).

## The post

The meme is posted on X from the public account @jehaoye, between the
bounty's opening (19 Nov 2026 21:00 WIB) and its deadline
(23 Nov 2026 21:00 WIB), with the draft caption from `X-CAPTION-DRAFT.md`.
Its address goes into `POST.json` at this repository's root:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `POST.json` to
`out/POST.json` when it exists, and validates `entry.png` and copies it
unchanged to `out/entry.png`, so two runs write the same bytes.
