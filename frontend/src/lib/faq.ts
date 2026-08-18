export interface FaqItem {
  value: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    value: "what-info",
    question: "What information can I check about a vehicle?",
    answer:
      "CarTrace can display available vehicle information including manufacturer and model, model year and variant, fuel type and engine specifications, vehicle body type and class, registration details and RTO information, insurance status and expiry where available, PUC and fitness status, and ownership details when legally and publicly supplied by the active data provider. Not all fields are available for every vehicle — sections only appear when the provider actually returns that data.",
  },
  {
    value: "reg-check",
    question: "How do I check a vehicle using its registration number?",
    answer:
      "Go to the vehicle search section and enter the vehicle's registration number in the format like MH12AB1234. CarTrace will auto-detect the state from the plate prefix and query the configured data provider for available information. You can also use the search bar in the navigation or the quick search on the homepage. Results include whatever publicly available data the provider returns for that registration number.",
  },
  {
    value: "vin-search",
    question: "Can I search for a vehicle using a VIN?",
    answer:
      "Yes. Switch to the VIN tab in the search form and enter the 17-character Vehicle Identification Number. VIN decoding is powered by the free NHTSA vPIC API (US Department of Transportation) and covers US/Canada market vehicles. The VIN decoder returns manufacturer, model year, engine, body type, and plant location data as published by that source.",
  },
  {
    value: "state-detection",
    question: "How does CarTrace detect my state automatically?",
    answer:
      "CarTrace reads the two-letter RTO prefix at the start of any Indian registration number (e.g. MH, DL, KA, RJ) and maps it to the corresponding state or union territory. This detection happens in real time as you type — the background, example registrations, and location selector all update to match the detected state. If you have manually selected a location, auto-detection will not override your choice.",
  },
  {
    value: "official",
    question: "Is the vehicle information provided by CarTrace official?",
    answer:
      "No. CarTrace is an independent vehicle-information platform that aggregates data from third-party public APIs and directories. It is not an RTO authority, is not affiliated with any government body, and does not provide ownership or legal verification. Always verify records independently before making financial or legal decisions.",
  },
  {
    value: "guaranteed",
    question: "Is my vehicle information guaranteed to be available?",
    answer:
      "No. Data availability depends on the active provider and regional coverage. Not every vehicle or registration number will return results — CarTrace honestly reports when a lookup is unavailable rather than fabricating records. Missing fields are clearly labeled as 'Not available from this source' so you always know what data was actually returned.",
  },
  {
    value: "save-vehicles",
    question: "Can I save vehicles for later?",
    answer:
      "Yes. Create a free account to save vehicles to your personal dashboard. You can rename saved vehicles for easy reference and re-check them with one click. Saved vehicles and search history sync across your devices when you are signed in. Guest users can also keep recent searches locally in their browser.",
  },
  {
    value: "free",
    question: "Is CarTrace free to use?",
    answer:
      "Yes. Vehicle search, VIN decoding, RTO directory browsing, and new car discovery are all free. Creating an account to save vehicles and keep history is also free. CarTrace uses publicly available APIs and does not charge for access to vehicle information.",
  },
  {
    value: "new-cars",
    question: "Can I search and compare new cars?",
    answer:
      "Yes. The New Cars section lets you browse cars by brand, body type, fuel type and budget. You can compare up to three vehicles side-by-side, view variant-wise pricing and specifications, and explore detailed car pages with features, safety, pros and cons. Car specifications are sourced from publicly available data and clearly labeled.",
  },
  {
    value: "accuracy",
    question: "How accurate is the information shown on CarTrace?",
    answer:
      "CarTrace displays data exactly as it is returned by the active provider — we do not modify, embellish or invent any vehicle information. Accuracy depends on the data source. Every result page shows which provider supplied the data and when it was retrieved. You should independently verify important details with official sources.",
  },
  {
    value: "privacy",
    question: "Does CarTrace store my vehicle registration number?",
    answer:
      "Guest searches are stored only in your browser's local storage as recent searches and are cleared when you clear browser data or press 'Clear history'. If you are signed in, searches are stored server-side in your account history. CarTrace does not sell or share vehicle search data with third parties.",
  },
  {
    value: "not-found",
    question: "What should I do if my vehicle cannot be found?",
    answer:
      "If a vehicle lookup returns no results, try the following: double-check the registration number or VIN for typos, ensure you are using the correct format (e.g. MH12AB1234 for registrations), try switching between registration and VIN search, or try a different data provider from the Providers page. Some registration numbers — especially very new or very old plates — may not yet be in the provider's database.",
  },
];
