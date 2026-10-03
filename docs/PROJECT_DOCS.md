# Project documents: Interactive Climate Change Data Story ("Our Warming World")

## 1. Project pitch
**Our Warming World** is a short, accessible web story for secondary-school learners (13-17). In four chapters they watch 110+ years of temperature change in 100 major cities draw itself, question how certain the data is, explore any city (including Harare) and learn to read climate charts critically. It uses plain HTML, CSS and JavaScript so it loads quickly on phones and low bandwidth, needs no accounts and collects no data.

## 2. Audience analysis
| Persona | Needs | Constraints | Design response |
|---|---|---|---|
| Tendai, 14, Form 3, Android phone | Simple visuals, short text, quick answers | Limited data bundle, small screen, cracked/dim screen | Single column, 44px targets, whole site about 238 KB of data, no images or video |
| Ms Moyo, 35, geography teacher | Class-ready, accurate, citeable | Projector, shared PC | Keyboard control, clear source and attribution, works offline from a local copy |
| Rudo, 16, uses a screen reader | Equal access to the data | Needs text alternatives | Chart descriptions, data tables, headings, skip link |
| Kuda, 15, sensitive to motion | Control over animation | Motion causes discomfort | Respects system setting plus on-page animation switch |
Also considered: English as an additional language (short sentences, plain words), colour-vision deficiency (not colour alone: the line, labels and zero line carry meaning).

## 3. Learning objectives
After the story, learners can (1) describe the long-term temperature trend in the data, (2) explain what an anomaly is, (3) explain why uncertainty narrows over time, (4) compare cities, (5) identify how axis choice, short time windows and limited samples can mislead.

## 4. Requirements
**Functional:** F1 animated trend chart; F2 uncertainty toggle; F3 city selector and year-range sliders; F4 warming stripes; F5 chapter navigation (buttons, keys, menu); F6 data tables for every chart; F7 animation on/off switch.
**Non-functional:** N1 works on mobile and desktop; N2 WCAG 2.2 AA target; N3 total page weight under 500 KB; N4 no external requests, cookies or trackers; N5 works in the latest Chrome, Edge, Firefox and Safari; N6 usable via keyboard only.

## 5. Learning theory (Mayer's Cognitive Theory of Multimedia Learning)
*Segmenting* (one idea per chapter, learner-paced); *Signaling* (zero line, highlighted line, captions state the key number); *Coherence* (one chart per chapter, no decoration); *Spatial contiguity* (caption directly under chart); *Redundancy* (text captions and tables instead of narration that repeats on-screen text); *Learner control* (sliders, replay, animation switch); *Pre-training* (anomaly explained before use).

## 6. Design principles
- **Perception (Gestalt):** proximity groups chart and caption; continuity makes the line read as a trend; figure/ground via card background; the dashed zero line is a stable reference.
- **Typography:** system sans-serif for fast, familiar reading; body 1.1rem / 1.6 line height; line length capped at 46rem; h1 > h2 > body > captions.
- **Colour:** warm red for the data line, cool blue for uncertainty, blue-to-red stripes (a convention for cool-to-warm). Light and dark themes. Colour is never the only carrier of meaning. Verify contrast (target 4.5:1) with the WebAIM checker and record the results in section 10.
- **Layout:** single centred column, generous spacing, sticky header and footer for orientation, responsive SVG that scales to any width.
- **Interaction:** large targets (44px), immediate feedback from sliders, visible focus ring, predictable Next/Back, arrow-key navigation, explicit animation control.

## 7. Storyboard and wireframes
| # | Screen | Text | Visual / interaction |
|---|---|---|---|
| 0 | Intro | Hook question | Keyboard hint |
| 1 | Trend | What an anomaly is | Animated line, warming stripes reveal, replay |
| 2 | Doubt | Why older data is less certain | Checkbox shows uncertainty band |
| 3 | Explore | Is every city the same? | City dropdown, two year sliders |
| 4 | Care | Framing, short windows, cities-only, source | Text list, source link |

Wireframe (mobile, same structure on desktop with a wider column):
```
+------------------------+
| Our Warming World  [Animation: on] |
| [Intro][1][2][3][4]    |
+------------------------+
| 1. One line, 110+ yrs  |
| short explanation      |
| +--------------------+ |
| |  line chart (SVG)  | |
| +--------------------+ |
| caption (key number)   |
| [Replay animation]     |
| ||||||||| stripes |||||||
| > Data table           |
+------------------------+
| [Back]   2 of 5  [Next]|
+------------------------+
```

## 8. Production plan
| Phase | Tasks | Output | Effort |
|---|---|---|---|
| 1 Plan | Pitch, audience, requirements, storyboard | This document | 0.5 day |
| 2 Data | Clean and transform, document (data/transformations.md) | data.json / data.js | 0.5 day |
| 3 Build | Chart engine, chapters, navigation | Working site | 1 day |
| 4 Accessibility and polish | Keyboard, tables, motion control, contrast | Accessible site | 0.5 day |
| 5 Test | Usability (5+ users), accessibility, responsiveness, performance | Test report | 1 day |
| 6 Improve and deploy | Fix findings, deploy, final reflection | Live link | 0.5 day |
Tools: VS Code, Git, Chrome DevTools, Lighthouse, WAVE or axe, a screen reader (NVDA free, or TalkBack). **Authoring tool choice:** plain HTML/CSS/JS with SVG was chosen over p5.js because the charts are simple, SVG gives text-accessible, scalable graphics, and no library keeps the page light (sustainability) and secure (no third-party code).

## 9. Data transformations
See `data/transformations.md`: monthly to annual mean (complete years and complete cities only, 1900-2012), then anomaly against each city's own 1901-1930 mean, then the average across 100 cities for the story line.

## 10. Testing
### 10.1 Usability test (COMPLETE WITH YOUR REAL RESULTS)
At least 5 participants (ideally learners). Tasks: (a) say whether temperatures rose, (b) explain the shaded band, (c) find Harare 1980-2012, (d) reach chapter 4 with the keyboard only. Record success (Y/N), time and comments.

| User | Age / role | Device | a | b | c | d | Issues / comments |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |

**Findings and changes made:** (problem, severity, fix).

### 10.2 Accessibility checklist (tick after testing)
| Check | How | Built in | Result |
|---|---|---|---|
| Keyboard only, visible focus | Tab and arrow keys | Yes | |
| Skip link works | Tab once | Yes | |
| Chart text alternatives | Screen reader, data tables | Yes | |
| Headings in order, page language set | WAVE / axe | Yes | |
| Contrast 4.5:1 text, 3:1 graphics | WebAIM checker, light and dark | Designed for it | |
| Reduced motion respected + switch | OS setting, on-page switch | Yes | |
| Zoom to 200% / 400% without losing content | Browser zoom | Responsive | |
| Lighthouse accessibility score | DevTools | Target 95+ | |

### 10.3 Responsiveness matrix
| Viewport | Browser | Result |
|---|---|---|
| 360x640 phone | Chrome (DevTools device mode and a real phone) | |
| 768x1024 tablet | | |
| 1366x768 laptop | | |
| 1920x1080 desktop | | |

### 10.4 Performance
Measured file sizes (uncompressed): index.html 5 KB, style.css 2 KB, script.js 7 KB, data/data.js 238 KB. No images, fonts or third-party requests. Run Lighthouse (Chrome DevTools, mobile mode) on the deployed site and record: Performance ___, Accessibility ___, Best Practices ___, SEO ___. Target 90+ for each.

## 11. Version control (Git)
The folder is a Git repository with a commit history. Workflow: small commits with clear messages, `main` stays working, test fixes on a branch (e.g. `fix/usability`) then merge. Commands are in README.md. Record after your tests: commit each fix from the usability findings so the history shows the improvement.

## 12. Ethical, privacy, security, cultural and sustainability considerations
- **Ethics and honesty:** uncertainty is shown, every caption states the axis does not start at zero, the cities-only limit is explained, and the source is credited. The story avoids fear framing and points to understanding, not alarm. It does not claim that city data represent the whole Earth.
- **Privacy:** no cookies, accounts, analytics, forms or tracking; no personal data stored. The user's CSV (if loaded) is processed only inside their browser. Usability-test participants: get consent (and parental or school consent for minors), record no names, store only anonymised notes, and delete raw notes after the report.
- **Security:** no third-party scripts or fonts (no supply-chain risk); no user input is inserted as HTML (city names come from our own data file); `_headers` adds a Content Security Policy and other headers on Netlify; deploy over HTTPS; keep the repo free of secrets.
- **Cultural and inclusive:** plain English with short sentences for English-as-additional-language readers; local relevance (Harare and other African cities are included); no culturally specific idioms; colour not the sole carrier of meaning; consider translation into Shona and Ndebele in future.
- **Sustainability:** very small page weight and no heavy libraries, images or video, which means less energy and data cost, and it works on older phones. Static hosting only.
- **Licensing:** see ASSET_REGISTER.md. Confirm the dataset's licence terms on Kaggle before publishing.

## 13. Design reflection (write in your own words, about 300 words)
Cover: why Mayer's principles fit this audience; what the usability tests changed; trade-offs (truncated axis, cities-only data, plain JS vs p5.js); ethical choices; what you would improve (oceans data, more datasets, narration, translation).
