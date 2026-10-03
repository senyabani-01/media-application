"""Optional: builds data/data.json from data/GlobalLandTemperaturesByMajorCity.csv
Usage: pip install pandas   then   python prepare_data.py
(The website can also build the data itself in the browser, so this is optional.)"""
import json, pandas as pd
BASE, START, END = (1901, 1930), 1900, 2012   # 2013 is a partial year
d = pd.read_csv("data/GlobalLandTemperaturesByMajorCity.csv", parse_dates=["dt"]).dropna(subset=["AverageTemperature"])
d["y"] = d.dt.dt.year
d = d[(d.y >= START) & (d.y <= END)]
a = d.groupby(["City", "y"]).agg(t=("AverageTemperature", "mean"), u=("AverageTemperatureUncertainty", "mean"), n=("dt", "count")).reset_index()
a = a[a.n == 12]
years = END - START + 1
a = a[a.groupby("City").y.transform("count") == years]          # keep cities complete for every year
a["a"] = a.t - a.groupby("City").t.transform(lambda s: s[(a.loc[s.index, "y"] >= BASE[0]) & (a.loc[s.index, "y"] <= BASE[1])].mean())
g = a.groupby("y").agg(a=("a", "mean"), u=("u", "mean")).reset_index()
out = {"baseline": "1901-1930", "global": [dict(y=int(r.y), a=round(r.a, 3), u=round(r.u, 3)) for r in g.itertuples()],
       "cities": {c: [dict(y=int(r.y), a=round(r.a, 3)) for r in x.itertuples()] for c, x in a.groupby("City")}}
json.dump(out, open("data/data.json", "w"), separators=(",", ":"))
open("data/data.js", "w").write("window.CLIMATE_DATA=" + json.dumps(out, separators=(",", ":")) + ";")
open("data/transformations.md", "w").write(f"""# Data transformations
1. Source: GlobalLandTemperaturesByMajorCity.csv (Berkeley Earth via Kaggle), monthly values for 100 major cities.
2. Removed rows with missing temperature; kept {START}-{END} (2013 is incomplete).
3. Monthly -> annual mean; kept only city-years with all 12 months; kept only cities complete for every year ({a.City.nunique()} cities).
4. Anomaly = annual mean minus that city's own {BASE[0]}-{BASE[1]} mean.
5. Story line = average anomaly across cities; uncertainty = average of the cities' mean uncertainty. Rounded to 3 decimals.
""")
print("Wrote data/data.json:", a.City.nunique(), "cities")
