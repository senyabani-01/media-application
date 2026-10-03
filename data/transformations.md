# Data transformations
1. Source: GlobalLandTemperaturesByMajorCity.csv (Berkeley Earth via Kaggle), monthly values for 100 major cities.
2. Removed rows with missing temperature; kept 1900-2012 (2013 is incomplete).
3. Monthly -> annual mean; kept only city-years with all 12 months; kept only cities complete for every year (100 cities).
4. Anomaly = annual mean minus that city's own 1901-1930 mean.
5. Story line = average anomaly across cities; uncertainty = average of the cities' mean uncertainty. Rounded to 3 decimals.
