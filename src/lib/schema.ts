export const DATABASE_SCHEMA = `
CATALOG: workspace
SCHEMA: urban_ai

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE: urban_ai.grocery_safety_index
USE FOR: questions about specific stores, grocery stores, which stores are dangerous/safe
EXACT COLUMNS:
  store_name     string   — store name (e.g. "18TH STREET LIQUOR STORE", "Walmart")
  city           string   — city name (e.g. "Phoenix", "Mesa", "Tempe")
  zip_code       string   — ZIP code (e.g. "85034")
  total_crimes   bigint   — total crimes in that ZIP
  population     double   — population of that ZIP
  priority_score double   — DANGER score. Range: 0.17 (safest) to ~3030 (most dangerous). HIGHER = MORE DANGEROUS.
  safety_score   double   — SAFETY score. Range: -2030 to ~999. HIGHER = SAFER. Inverse of priority_score.
NOTE: Multiple stores share the same zip_code so total_crimes and population repeat per ZIP. Each store row is UNIQUE. Never use GROUP BY.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE: urban_ai.zip_crime_summary
USE FOR: comparing ZIPs by crime count, which ZIPs have most/least crime
EXACT COLUMNS:
  zip_code       string   — ZIP code
  total_crimes   bigint   — total crimes in that ZIP
NOTE: No population column in this table.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE: urban_ai.urban_safety_index  (also called urban_priority_index — same structure)
USE FOR: ZIP-level risk ranking, corridors, area safety, infrastructure planning
EXACT COLUMNS:
  zip_code                string   — ZIP code
  total_crimes            bigint   — total crimes
  population              double   — population
  crimes_per_1000_residents double — danger score. HIGHER = MORE DANGEROUS.
NOTE: urban_safety_index does NOT have a priority_score column. Use crimes_per_1000_residents for ordering.
NOTE: urban_safety_index and urban_priority_index have the same columns.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE: urban_ai.svi_clean
USE FOR: poverty, unemployment, social vulnerability, uninsured, no vehicle, demographics
KEY COLUMNS:
  LOCATION       string   — census tract description
  COUNTY         string   — county name
  E_TOTPOP       bigint   — total population
  EP_POV150      double   — % below 150% poverty line
  EP_UNEMP       double   — % unemployed
  EP_UNINSUR     double   — % uninsured
  EP_MINRTY      double   — % minority
  EP_NOVEH       double   — % no vehicle
  EP_DISABL      double   — % disabled
  RPL_THEMES     double   — overall vulnerability 0–1 (higher = more vulnerable)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE: urban_ai.snap_retailers
USE FOR: food access, food deserts, SNAP stores, authorized food retailers
NOTE: Column names have spaces — use backticks
COLUMNS: \`Store Name\`, \`Store Type\`, \`City\`, \`Zip Code\`, \`County\`, \`Latitude\`, \`Longitude\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE: urban_ai.census_clean
USE FOR: population, income, housing, census data
COLUMNS: zip_code, population, median_income, poverty_rate
`;