# Asset and attribution register

| ID | Asset | Type | Author / source | Licence | Where used | Modified? |
|---|---|---|---|---|---|---|
| A1 | index.html, style.css, script.js | Code | Project author (original) | Author's own; add a licence (e.g. MIT) if publishing | Whole site | n/a |
| A2 | GlobalLandTemperaturesByMajorCity.csv | Dataset | Berkeley Earth, via Kaggle: https://www.kaggle.com/datasets/berkeleyearth/climate-change-earth-surface-temperature-data | Check the licence shown on the Kaggle page (Berkeley Earth data is published as CC BY-NC 4.0 at the time of writing; confirm before submitting) | Source data | No |
| A3 | data/data.json, data/data.js | Derived dataset | Generated from A2 by prepare_data.py | Same terms as A2 (attribution required) | Charts | Yes: annual means and anomalies (see data/transformations.md) |
| A4 | Line charts | Graphic | Generated in the browser as SVG by script.js | Original | Chapters 1-3 | n/a |
| A5 | Warming stripes | Graphic | Original SVG built from data. The "warming stripes" idea was created by Prof. Ed Hawkins (credit given, design re-implemented, no files copied) | Original code | Chapter 1 | n/a |
| A6 | Typeface | Font | Visitor's system font (system-ui, Segoe UI, Arial) | Not distributed with the site | All text | No |
| A7 | Images, audio, video | Media | None used | n/a | n/a | n/a |

**Attribution text shown on the site (chapter 4):** Berkeley Earth, Climate Change: Earth Surface Temperature Data (Kaggle).
**Update this table** if you add any image, icon, font or library.
