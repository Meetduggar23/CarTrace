/**
 * Locations offered by the CarTrace location selector.
 *
 * Covers all 28 Indian states and 8 union territories, each paired with a
 * recognizable landmark and a direct Pixabay CDN image (royalty-free,
 * hotlinkable). Images are sourced from Pixabay's India monuments collection.
 */
export interface LocationOption {
  /** State / UT display name, e.g. "Rajasthan". */
  label: string;
  /** Two-letter code, e.g. "RJ". */
  code: string;
  /** Grouping shown in the selector: states vs union territories. */
  group: "state" | "ut";
  /** Short landmark / landscape caption shown under the name. */
  landmark: string;
  /** Direct image URL (Pixabay CDN, 1280px). */
  image: string;
}

export const LOCATION_OPTIONS: LocationOption[] = [
  {
    label: "India",
    code: "IN",
    group: "state",
    landmark: "Rashtrapati Bhavan",
    image: "https://cdn.pixabay.com/photo/2020/01/25/17/33/rashtrapati-bhawan-4792982_1280.jpg",
  },
  {
    label: "Andhra Pradesh",
    code: "AP",
    group: "state",
    landmark: "Lepakshi Temple",
    image: "https://cdn.pixabay.com/photo/2015/05/20/07/57/lepakshi-774935_1280.jpg",
  },
  {
    label: "Arunachal Pradesh",
    code: "AR",
    group: "state",
    landmark: "Tawang Monastery",
    image: "https://cdn.pixabay.com/photo/2022/01/01/15/08/tawang-monastery-6907759_1280.jpg",
  },
  {
    label: "Assam",
    code: "AS",
    group: "state",
    landmark: "Brahmaputra River",
    image: "https://cdn.pixabay.com/photo/2021/03/02/11/00/brahmaputra-boatman-6062086_1280.jpg",
  },
  {
    label: "Bihar",
    code: "BR",
    group: "state",
    landmark: "Bodh Gaya",
    image: "https://cdn.pixabay.com/photo/2017/08/03/15/53/buddhist-2576958_1280.jpg",
  },
  {
    label: "Chhattisgarh",
    code: "CG",
    group: "state",
    landmark: "Tandula Lake",
    image: "https://cdn.pixabay.com/photo/2018/07/02/09/12/tandula-3511190_1280.jpg",
  },
  {
    label: "Goa",
    code: "GA",
    group: "state",
    landmark: "Basilica of Bom Jesus",
    image: "https://cdn.pixabay.com/photo/2013/08/15/15/23/goa-172819_1280.jpg",
  },
  {
    label: "Gujarat",
    code: "GJ",
    group: "state",
    landmark: "Statue of Unity",
    image: "https://cdn.pixabay.com/photo/2019/02/02/18/07/statue-of-unity-3971077_1280.jpg",
  },
  {
    label: "Haryana",
    code: "HR",
    group: "state",
    landmark: "Kurukshetra",
    image: "https://cdn.pixabay.com/photo/2020/05/17/13/14/kurukshetra-5181585_1280.jpg",
  },
  {
    label: "Himachal Pradesh",
    code: "HP",
    group: "state",
    landmark: "Manali",
    image: "https://cdn.pixabay.com/photo/2016/12/30/23/16/manali-1941810_1280.jpg",
  },
  {
    label: "Jharkhand",
    code: "JH",
    group: "state",
    landmark: "Dassam Falls",
    image: "https://cdn.pixabay.com/photo/2022/09/30/11/02/waterfall-7489267_1280.jpg",
  },
  {
    label: "Karnataka",
    code: "KA",
    group: "state",
    landmark: "Mysore Palace",
    image: "https://cdn.pixabay.com/photo/2020/09/17/18/10/palace-5579991_1280.jpg",
  },
  {
    label: "Kerala",
    code: "KL",
    group: "state",
    landmark: "Kerala Backwaters",
    image: "https://cdn.pixabay.com/photo/2013/07/19/17/38/kerala-165347_1280.jpg",
  },
  {
    label: "Madhya Pradesh",
    code: "MP",
    group: "state",
    landmark: "Khajuraho Temples",
    image: "https://cdn.pixabay.com/photo/2018/04/02/11/56/khajuraho-3283685_1280.jpg",
  },
  {
    label: "Maharashtra",
    code: "MH",
    group: "state",
    landmark: "Gateway of India",
    image: "https://cdn.pixabay.com/photo/2015/01/23/12/43/gateway-of-india-609076_1280.jpg",
  },
  {
    label: "Manipur",
    code: "MN",
    group: "state",
    landmark: "Manipur",
    image: "https://cdn.pixabay.com/photo/2021/06/14/18/57/manipur-6336729_1280.jpg",
  },
  {
    label: "Meghalaya",
    code: "ML",
    group: "state",
    landmark: "Umiam Lake",
    image: "https://cdn.pixabay.com/photo/2021/12/29/09/15/barapani-6901147_1280.jpg",
  },
  {
    label: "Mizoram",
    code: "MZ",
    group: "state",
    landmark: "Aizawl",
    image: "https://cdn.pixabay.com/photo/2019/12/10/17/00/aizawl-4686218_1280.jpg",
  },
  {
    label: "Nagaland",
    code: "NL",
    group: "state",
    landmark: "Naga Hills",
    image: "https://cdn.pixabay.com/photo/2025/11/13/17/13/nagaland-9955206_1280.jpg",
  },
  {
    label: "Odisha",
    code: "OD",
    group: "state",
    landmark: "Konark Sun Temple",
    image: "https://cdn.pixabay.com/photo/2014/03/28/03/44/sun-temple-299944_1280.jpg",
  },
  {
    label: "Punjab",
    code: "PB",
    group: "state",
    landmark: "Golden Temple",
    image: "https://cdn.pixabay.com/photo/2018/01/15/10/41/amritsar-3083693_1280.jpg",
  },
  {
    label: "Rajasthan",
    code: "RJ",
    group: "state",
    landmark: "Hawa Mahal",
    image: "https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_1280.jpg",
  },
  {
    label: "Sikkim",
    code: "SK",
    group: "state",
    landmark: "Kanchenjunga",
    image: "https://cdn.pixabay.com/photo/2017/08/03/05/17/goechala-2574736_1280.jpg",
  },
  {
    label: "Tamil Nadu",
    code: "TN",
    group: "state",
    landmark: "Brihadeeswarar Temple",
    image: "https://cdn.pixabay.com/photo/2017/04/11/20/28/brihadeeswarar-temple-2222737_1280.jpg",
  },
  {
    label: "Telangana",
    code: "TS",
    group: "state",
    landmark: "Charminar",
    image: "https://cdn.pixabay.com/photo/2022/01/09/09/33/charminar-6925617_1280.jpg",
  },
  {
    label: "Tripura",
    code: "TR",
    group: "state",
    landmark: "Neermahal Palace",
    image: "https://cdn.pixabay.com/photo/2021/08/25/18/06/neermahal-6574193_1280.jpg",
  },
  {
    label: "Uttar Pradesh",
    code: "UP",
    group: "state",
    landmark: "Taj Mahal",
    image: "https://cdn.pixabay.com/photo/2019/12/14/14/05/taj-mahal-4694915_1280.jpg",
  },
  {
    label: "Uttarakhand",
    code: "UK",
    group: "state",
    landmark: "Himalayan Peaks",
    image: "https://cdn.pixabay.com/photo/2020/12/03/15/17/mayali-pass-5800786_1280.jpg",
  },
  {
    label: "West Bengal",
    code: "WB",
    group: "state",
    landmark: "Victoria Memorial",
    image: "https://cdn.pixabay.com/photo/2019/09/25/06/12/victoria-memorial-4502670_1280.jpg",
  },
  {
    label: "Andaman and Nicobar Islands",
    code: "AN",
    group: "ut",
    landmark: "Cellular Jail",
    image: "https://cdn.pixabay.com/photo/2019/02/11/04/25/jail-3988719_1280.jpg",
  },
  {
    label: "Chandigarh",
    code: "CH",
    group: "ut",
    landmark: "Rock Garden",
    image: "https://cdn.pixabay.com/photo/2013/08/14/22/37/chandigarh-172617_1280.jpg",
  },
  {
    label: "Dadra and Nagar Haveli and Daman and Diu",
    code: "DN",
    group: "ut",
    landmark: "Daman Beach",
    image: "https://cdn.pixabay.com/photo/2020/04/15/12/26/daman-5046451_1280.jpg",
  },
  {
    label: "Delhi",
    code: "DL",
    group: "ut",
    landmark: "India Gate",
    image: "https://cdn.pixabay.com/photo/2018/07/09/14/48/india-gate-3526277_1280.jpg",
  },
  {
    label: "Jammu and Kashmir",
    code: "JK",
    group: "ut",
    landmark: "Dal Lake",
    image: "https://cdn.pixabay.com/photo/2022/05/08/15/58/dal-lake-7182417_1280.jpg",
  },
  {
    label: "Ladakh",
    code: "LA",
    group: "ut",
    landmark: "Pangong Lake",
    image: "https://cdn.pixabay.com/photo/2020/07/10/08/13/pangong-lake-5389937_1280.jpg",
  },
  {
    label: "Lakshadweep",
    code: "LD",
    group: "ut",
    landmark: "Lagoon Beach",
    image: "https://cdn.pixabay.com/photo/2017/03/19/04/47/beach-2155523_1280.jpg",
  },
  {
    label: "Puducherry",
    code: "PY",
    group: "ut",
    landmark: "Pondicherry Promenade",
    image: "https://cdn.pixabay.com/photo/2021/03/02/14/03/pondicherry-6062588_1280.jpg",
  },
];

/** Quick lookup by display label, used to resolve the current navbar location. */
export function findLocation(label: string): LocationOption | undefined {
  return LOCATION_OPTIONS.find((loc) => loc.label === label);
}
