# Content Guide — BrianWadeScott.com

No CMS. No login. No dashboard. Content lives as text files in this project folder.

**The one tool you need:** VSCode (free). You already have it — that's what you're reading this in.

**How publishing works:**
1. Edit a file in VSCode
2. `git add . && git commit -m "update" && git push`
3. Vercel auto-deploys in ~60 seconds

---

## 1. Update copy on a case study

Open the relevant file in `content/work/`:

| Project | File |
|---|---|
| Balance | `content/work/balance.mdx` |
| Hello Kitty & Friends World | `content/work/hello-kitty.mdx` |
| Dr Pepper | `content/work/dr-pepper.mdx` |
| Care Bears Forever | `content/work/care-bears.mdx` |
| S&N Health | `content/work/sn-health.mdx` |

Each file looks like this at the top (between the `---` lines):

```
---
title: Balance
statement: "The most underfunded..."
brief: "Create a cohesive visual language..."
roleDetail: "Designed the main title sequence..."
outcome: "A unified visual identity..."
---
```

Change the words, save, push. That's it.

---

## 2. Project page — how content is organized

Each project page is built from one MDX file. **Nothing is hardcoded.** You control everything via frontmatter:

| Field | Where it shows | Example |
|-------|----------------|---------|
| `heroImage` | Bento card thumbnail on homepage | `heroImage: /work/balance/BalanceThumb.jpg` |
| `hoverVideo` | Bento card hover (plays when you hover) | `hoverVideo: /work/hello-kitty/hellokitty_hover.webm` |
| `heroVideo` | Case study hero — looping muted background | `heroVideo: /work/balance/Balance_TitleSequence.webm` |
| `heroStill` | Case study hero — still image (if no video) | `heroStill: /work/balance/BalanceThumb.jpg` |
| `images` | Project page body — the scrollable gallery | See below |

**You don't need to ask each time.** Drop your file in `public/work/project-name/`, add a line to the MDX, save.

---

### Adding images or videos to a project page

The `images:` array controls the gallery. Each entry has:
- `src` — path to the file (e.g. `/work/balance/my-image.jpg` or `.webm` for video)
- `layout` — `full` | `half` | `feature` | `three`
- `caption` — optional
- `type: video` — use for video files (or the .webm/.mp4 extension is auto-detected)

**Layout rules:**
- `full` — one item, full width
- `half` — two items side by side (pair two consecutive `half` entries)
- `feature` — one large left + two stacked right (uses next 3 images)
- `three` — three equal columns (group 3 consecutive `three` entries)

**Example — add a new image:**
1. Drop `new-shot.jpg` into `public/work/balance/`
2. Open `content/work/balance.mdx`
3. Add to the `images:` list:
```yaml
  - src: /work/balance/new-shot.jpg
    layout: full
    caption: Optional caption
```

**Example — add a video:**
```yaml
  - src: /work/balance/Balance_TitleSequence.webm
    layout: full
    type: video
    caption: Main title sequence
```

---

## 3. Add or swap images

**Where images live:**
```
public/
  work/
    balance/        ← drop Balance images here
    hello-kitty/    ← drop Hello Kitty images here
    dr-pepper/
    care-bears/
    sn-health/
```

**Supported formats:** JPG, PNG, WebP (WebP recommended — smallest file size, best quality)

**To swap an image:**
1. Drop the new file into the right folder in `/public/work/project-name/`
2. Open the MDX file for that project
3. Find the `images:` section and update the filename

**Image layout options** — each image in the `images:` array takes a `layout` value:

| layout | What it looks like |
|---|---|
| `full` | Full width, 16:9 aspect ratio |
| `half` | Two images side by side (pair two consecutive `half` entries) |
| `feature` | Large image left, two stacked on right |
| `three` | Three equal columns |

**Example:**
```yaml
images:
  - src: /work/balance/hero.jpg
    layout: full
    caption: Main title sequence

  - src: /work/balance/image-02.jpg
    layout: half

  - src: /work/balance/image-03.jpg
    layout: half

  - src: /work/balance/image-04.jpg
    layout: three
  - src: /work/balance/image-05.jpg
    layout: three
  - src: /work/balance/image-06.jpg
    layout: three
```

---

## 3. Add outcome stats

In any project MDX file, the `stats:` field shows as large numbers in the outcome section.

```yaml
stats:
  - value: "70k+"
    label: Unique NFTs
  - value: "$950k"
    label: Initial Sale
```

For projects with no measurable numbers, leave it as `stats: []`.

---

## 4. Add a new project

1. **Duplicate** any existing `.mdx` file in `content/work/`
2. **Rename** it to the new project's URL slug (e.g. `new-project.mdx` → URL becomes `/work/new-project`)
3. **Fill in** all the fields in the frontmatter block
4. **Add images** — create a new folder in `public/work/new-project/`
5. **Update the sequence** — set the `nextProject` field in the previous last project to point to your new slug. Set `nextProject` in your new project to loop back.
6. **Push** — it's live

---

## 5. Update the About page

Open `content/about.mdx`. The body copy is plain text below the `---` block. Edit it like a Word doc.

The three large pullquotes are in the frontmatter:
```yaml
callouts:
  - "Good design should make you feel understood."
  - "The mistake most designers make..."
  - "My job is to show people..."
```

---

## 6. Add the hero loop video + full reel

**Hero background loop** (muted, autoplays behind your name):

Open `components/Hero.tsx` and find:
```ts
const LOOP_VIDEO_URL = ""; // e.g. "https://pub-xxxx.r2.dev/hero-loop.mp4"
```
This is ideally a 20–60 second loop cut from your reel — punchy, visually strong. Same format as your reel (MP4, H.264). Clicking the video scrolls to the `#reel` section.

**Full reel** (the mid-page play-button section):

Open `components/ReelSection.tsx` and find:
```ts
const REEL_URL = ""; // e.g. "https://pub-xxxx.r2.dev/reel.mp4"
```
This is the full showreel with audio, revealed when the visitor clicks the play button.

Both can point to the same file if you only have one cut. The hero will always play it muted; the reel section plays it with audio.

**Poster image** (the still frame before the user clicks Play):
- Drop `reel-poster.jpg` into `public/videos/`. Export a frame at ~35 seconds from your reel.
- **ffmpeg:** `ffmpeg -i public/videos/moreShinyReel2026.webm -ss 35 -vframes 1 -q:v 2 public/videos/reel-poster.jpg`
- Or export manually from your video editor. Leave `REEL_POSTER` empty in `ReelSection.tsx` for a black poster.

**Simplest option — local file (recommended first):**
1. Drop your WebM/MP4 into `public/videos/`
2. Set the URL to `/videos/your-file.webm`
3. Works on localhost immediately and on Vercel if the file is under ~80MB

**If your video is over 100MB — Cloudflare R2 (free):**
- 10 GB free storage, no bandwidth fees
- Sign up at cloudflare.com → R2 → create bucket → upload → enable public access → paste URL

---

## 7. Deploy to Vercel

**First time only:**
1. Push this project to a GitHub repo (public or private)
2. Go to vercel.com → Add New Project → Import your repo
3. Click Deploy. Vercel auto-detects Next.js — no config needed.
4. Add your custom domain in Project Settings → Domains

**Every time after:**
Push to `main` → Vercel auto-deploys in ~60 seconds.

---

## File structure at a glance

```
content/
  work/
    balance.mdx          ← edit project copy here
    hello-kitty.mdx
    dr-pepper.mdx
    care-bears.mdx
    sn-health.mdx
  about.mdx              ← edit about page copy here

public/
  work/
    balance/             ← drop images here
    hello-kitty/
    dr-pepper/
    care-bears/
    sn-health/

components/
  ReelSection.tsx        ← set REEL_URL here
```
