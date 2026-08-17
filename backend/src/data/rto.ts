/**
 * RTO directory — curated from standardized public RTO codes published by
 * state transport departments (India). RTO codes are public facts; this is
 * a community-curated subset. Contact details are intentionally NOT
 * included (never fabricate). See docs/RTO_DATA.md for provenance.
 */

export interface RtoEntry {
  code: string; // "MH-12"
  stateCode: string; // "MH"
  state: string; // "Maharashtra"
  city: string; // "Pune"
  officeName: string; // "Pune City RTO"
  location: string; // "Pune, Maharashtra"
  services: string[];
  contact: null; // never fabricate contact details
}

const SERVICES = [
  "Vehicle registration",
  "Driving licenses",
  "Vehicle permits",
  "Tax collection",
];

function entry(
  stateCode: string,
  state: string,
  code: string,
  city: string,
  officeName: string
): RtoEntry {
  return {
    code,
    stateCode,
    state,
    city,
    officeName,
    location: `${city}, ${state}`,
    services: [...SERVICES],
    contact: null,
  };
}

// Format: [stateCode, state, code, city, officeName]
// (officeName defaults to "<city> RTO" when omitted)
const RAW: [string, string, string, string, string?][] = [
  // --- Maharashtra ---
  ["MH", "Maharashtra", "MH-01", "Mumbai", "Mumbai (South) RTO"],
  ["MH", "Maharashtra", "MH-02", "Mumbai", "Mumbai (West) RTO"],
  ["MH", "Maharashtra", "MH-03", "Mumbai", "Mumbai (East) RTO"],
  ["MH", "Maharashtra", "MH-04", "Thane", "Thane RTO"],
  ["MH", "Maharashtra", "MH-05", "Kalyan", "Kalyan RTO"],
  ["MH", "Maharashtra", "MH-06", "Raigad", "Raigad RTO"],
  ["MH", "Maharashtra", "MH-07", "Sindhudurg", "Sindhudurg RTO"],
  ["MH", "Maharashtra", "MH-08", "Ratnagiri", "Ratnagiri RTO"],
  ["MH", "Maharashtra", "MH-09", "Kolhapur", "Kolhapur RTO"],
  ["MH", "Maharashtra", "MH-10", "Sangli", "Sangli RTO"],
  ["MH", "Maharashtra", "MH-11", "Satara", "Satara RTO"],
  ["MH", "Maharashtra", "MH-12", "Pune", "Pune City RTO"],
  ["MH", "Maharashtra", "MH-13", "Solapur", "Solapur RTO"],
  ["MH", "Maharashtra", "MH-14", "Pimpri-Chinchwad", "Pimpri Chinchwad RTO"],
  ["MH", "Maharashtra", "MH-15", "Nashik", "Nashik RTO"],
  ["MH", "Maharashtra", "MH-16", "Ahmednagar", "Ahmednagar RTO"],
  ["MH", "Maharashtra", "MH-17", "Shirdi", "Shirdi RTO"],
  ["MH", "Maharashtra", "MH-18", "Dhule", "Dhule RTO"],
  ["MH", "Maharashtra", "MH-19", "Jalgaon", "Jalgaon RTO"],
  ["MH", "Maharashtra", "MH-20", "Aurangabad", "Aurangabad RTO"],
  ["MH", "Maharashtra", "MH-21", "Jalna", "Jalna RTO"],
  ["MH", "Maharashtra", "MH-22", "Parbhani", "Parbhani RTO"],
  ["MH", "Maharashtra", "MH-23", "Nanded", "Nanded RTO"],
  ["MH", "Maharashtra", "MH-24", "Latur", "Latur RTO"],
  ["MH", "Maharashtra", "MH-25", "Osmanabad", "Osmanabad RTO"],
  ["MH", "Maharashtra", "MH-26", "Beed", "Beed RTO"],
  ["MH", "Maharashtra", "MH-27", "Amravati", "Amravati RTO"],
  ["MH", "Maharashtra", "MH-28", "Buldhana", "Buldhana RTO"],
  ["MH", "Maharashtra", "MH-29", "Akola", "Akola RTO"],
  ["MH", "Maharashtra", "MH-30", "Washim", "Washim RTO"],
  ["MH", "Maharashtra", "MH-31", "Yavatmal", "Yavatmal RTO"],
  ["MH", "Maharashtra", "MH-32", "Wardha", "Wardha RTO"],
  ["MH", "Maharashtra", "MH-33", "Nagpur", "Nagpur RTO"],
  ["MH", "Maharashtra", "MH-34", "Bhandara", "Bhandara RTO"],
  ["MH", "Maharashtra", "MH-35", "Gondia", "Gondia RTO"],
  ["MH", "Maharashtra", "MH-36", "Chandrapur", "Chandrapur RTO"],
  ["MH", "Maharashtra", "MH-37", "Gadchiroli", "Gadchiroli RTO"],
  ["MH", "Maharashtra", "MH-38", "Malegaon", "Malegaon RTO"],
  ["MH", "Maharashtra", "MH-39", "Ichalkaranji", "Ichalkaranji RTO"],
  ["MH", "Maharashtra", "MH-40", "Nandurbar", "Nandurbar RTO"],
  ["MH", "Maharashtra", "MH-41", "Hingoli", "Hingoli RTO"],
  ["MH", "Maharashtra", "MH-43", "Nashik", "Gangapur RTO"],
  ["MH", "Maharashtra", "MH-44", "Baramati", "Baramati RTO"],
  ["MH", "Maharashtra", "MH-45", "Karad", "Karad RTO"],
  ["MH", "Maharashtra", "MH-46", "Shirpur", "Shirpur RTO"],

  // --- Delhi ---
  ["DL", "Delhi", "DL-01", "Delhi", "Delhi RTO (Zone 1)"],
  ["DL", "Delhi", "DL-02", "Delhi", "Delhi RTO (Zone 2)"],
  ["DL", "Delhi", "DL-03", "Delhi", "Delhi RTO (Zone 3)"],
  ["DL", "Delhi", "DL-04", "Delhi", "Delhi RTO (Zone 4)"],
  ["DL", "Delhi", "DL-05", "Delhi", "Delhi RTO (Zone 5)"],
  ["DL", "Delhi", "DL-06", "Delhi", "Delhi RTO (Zone 6)"],
  ["DL", "Delhi", "DL-07", "Delhi", "Delhi RTO (Zone 7)"],
  ["DL", "Delhi", "DL-08", "Delhi", "Delhi RTO (Zone 8)"],
  ["DL", "Delhi", "DL-09", "Delhi", "Delhi RTO (Zone 9)"],
  ["DL", "Delhi", "DL-10", "Delhi", "Delhi RTO (Zone 10)"],
  ["DL", "Delhi", "DL-11", "Delhi", "Delhi RTO (Zone 11)"],
  ["DL", "Delhi", "DL-12", "Delhi", "Delhi RTO (Zone 12)"],
  ["DL", "Delhi", "DL-13", "Delhi", "Delhi RTO (Zone 13)"],
  ["DL", "Delhi", "DL-14", "Delhi", "Delhi RTO (Zone 14)"],
  ["DL", "Delhi", "DL-15", "Delhi", "Delhi RTO (Zone 15)"],

  // --- Karnataka ---
  ["KA", "Karnataka", "KA-01", "Bengaluru", "Bengaluru Central RTO"],
  ["KA", "Karnataka", "KA-02", "Bengaluru", "Bengaluru East RTO"],
  ["KA", "Karnataka", "KA-03", "Mysuru", "Mysuru RTO"],
  ["KA", "Karnataka", "KA-04", "Mangaluru", "Mangaluru RTO"],
  ["KA", "Karnataka", "KA-05", "Hubballi-Dharwad", "Hubballi-Dharwad RTO"],
  ["KA", "Karnataka", "KA-06", "Belagavi", "Belagavi RTO"],
  ["KA", "Karnataka", "KA-07", "Kalaburagi", "Kalaburagi RTO"],
  ["KA", "Karnataka", "KA-09", "Davanagere", "Davanagere RTO"],
  ["KA", "Karnataka", "KA-10", "Tumakuru", "Tumakuru RTO"],
  ["KA", "Karnataka", "KA-13", "Chitradurga", "Chitradurga RTO"],
  ["KA", "Karnataka", "KA-17", "Kodagu", "Kodagu RTO"],
  ["KA", "Karnataka", "KA-19", "Ballari", "Ballari RTO"],
  ["KA", "Karnataka", "KA-21", "Shivamogga", "Shivamogga RTO"],
  ["KA", "Karnataka", "KA-22", "Udupi", "Udupi RTO"],
  ["KA", "Karnataka", "KA-23", "Bidar", "Bidar RTO"],
  ["KA", "Karnataka", "KA-24", "Raichur", "Raichur RTO"],
  ["KA", "Karnataka", "KA-25", "Bagalkote", "Bagalkote RTO"],
  ["KA", "Karnataka", "KA-26", "Vijayapura", "Vijayapura RTO"],
  ["KA", "Karnataka", "KA-27", "Haveri", "Haveri RTO"],
  ["KA", "Karnataka", "KA-28", "Koppal", "Koppal RTO"],
  ["KA", "Karnataka", "KA-29", "Gadag", "Gadag RTO"],
  ["KA", "Karnataka", "KA-30", "Chikkamagaluru", "Chikkamagaluru RTO"],
  ["KA", "Karnataka", "KA-31", "Uttara Kannada", "Uttara Kannada RTO"],
  ["KA", "Karnataka", "KA-32", "Chamarajanagara", "Chamarajanagara RTO"],
  ["KA", "Karnataka", "KA-33", "Mandya", "Mandya RTO"],
  ["KA", "Karnataka", "KA-34", "Ramanagara", "Ramanagara RTO"],
  ["KA", "Karnataka", "KA-35", "Hassan", "Hassan RTO"],
  ["KA", "Karnataka", "KA-36", "Chikkaballapura", "Chikkaballapura RTO"],
  ["KA", "Karnataka", "KA-37", "Yadgir", "Yadgir RTO"],
  ["KA", "Karnataka", "KA-38", "Bengaluru", "Bengaluru East (new) RTO"],
  ["KA", "Karnataka", "KA-39", "Bengaluru", "Bengaluru West RTO"],
  ["KA", "Karnataka", "KA-40", "Bengaluru", "Bengaluru South RTO"],
  ["KA", "Karnataka", "KA-41", "Bengaluru", "Bengaluru Central (new) RTO"],
  ["KA", "Karnataka", "KA-50", "Devanahalli", "Devanahalli RTO"],
  ["KA", "Karnataka", "KA-51", "Bengaluru", "Bengaluru Airport Road RTO"],
  ["KA", "Karnataka", "KA-52", "Bengaluru", "Bengaluru Electronic City RTO"],
  ["KA", "Karnataka", "KA-53", "Mysuru", "Mysuru (new) RTO"],

  // --- Rajasthan ---
  ["RJ", "Rajasthan", "RJ-01", "Jaipur", "Jaipur RTO"],
  ["RJ", "Rajasthan", "RJ-02", "Ajmer", "Ajmer RTO"],
  ["RJ", "Rajasthan", "RJ-03", "Bharatpur", "Bharatpur RTO"],
  ["RJ", "Rajasthan", "RJ-04", "Jodhpur", "Jodhpur RTO"],
  ["RJ", "Rajasthan", "RJ-05", "Udaipur", "Udaipur RTO"],
  ["RJ", "Rajasthan", "RJ-06", "Kota", "Kota RTO"],
  ["RJ", "Rajasthan", "RJ-07", "Bikaner", "Bikaner RTO"],
  ["RJ", "Rajasthan", "RJ-08", "Sri Ganganagar", "Sri Ganganagar RTO"],
  ["RJ", "Rajasthan", "RJ-09", "Alwar", "Alwar RTO"],
  ["RJ", "Rajasthan", "RJ-10", "Barmer", "Barmer RTO"],
  ["RJ", "Rajasthan", "RJ-11", "Sikar", "Sikar RTO"],
  ["RJ", "Rajasthan", "RJ-12", "Churu", "Churu RTO"],
  ["RJ", "Rajasthan", "RJ-13", "Jhunjhunu", "Jhunjhunu RTO"],
  ["RJ", "Rajasthan", "RJ-14", "Jalore", "Jalore RTO"],
  ["RJ", "Rajasthan", "RJ-15", "Pali", "Pali RTO"],
  ["RJ", "Rajasthan", "RJ-16", "Sirohi", "Sirohi RTO"],
  ["RJ", "Rajasthan", "RJ-17", "Bhilwara", "Bhilwara RTO"],
  ["RJ", "Rajasthan", "RJ-18", "Chittorgarh", "Chittorgarh RTO"],
  ["RJ", "Rajasthan", "RJ-19", "Dungarpur", "Dungarpur RTO"],
  ["RJ", "Rajasthan", "RJ-20", "Banswara", "Banswara RTO"],
  ["RJ", "Rajasthan", "RJ-21", "Nagaur", "Nagaur RTO"],
  ["RJ", "Rajasthan", "RJ-22", "Jaisalmer", "Jaisalmer RTO"],
  ["RJ", "Rajasthan", "RJ-23", "Sawai Madhopur", "Sawai Madhopur RTO"],
  ["RJ", "Rajasthan", "RJ-24", "Dholpur", "Dholpur RTO"],
  ["RJ", "Rajasthan", "RJ-25", "Tonk", "Tonk RTO"],
  ["RJ", "Rajasthan", "RJ-26", "Hanumangarh", "Hanumangarh RTO"],
  ["RJ", "Rajasthan", "RJ-27", "Karauli", "Karauli RTO"],
  ["RJ", "Rajasthan", "RJ-28", "Dausa", "Dausa RTO"],
  ["RJ", "Rajasthan", "RJ-29", "Pratapgarh", "Pratapgarh RTO"],
  ["RJ", "Rajasthan", "RJ-30", "Rajsamand", "Rajsamand RTO"],

  // --- Tamil Nadu ---
  ["TN", "Tamil Nadu", "TN-01", "Chennai", "Chennai Central RTO"],
  ["TN", "Tamil Nadu", "TN-02", "Chennai", "Chennai West RTO"],
  ["TN", "Tamil Nadu", "TN-03", "Chennai", "Chennai North RTO"],
  ["TN", "Tamil Nadu", "TN-04", "Chennai", "Chennai South RTO"],
  ["TN", "Tamil Nadu", "TN-05", "Chennai", "Chennai East RTO"],
  ["TN", "Tamil Nadu", "TN-06", "Thiruvallur", "Thiruvallur RTO"],
  ["TN", "Tamil Nadu", "TN-07", "Chennai", "Chennai Central (old) RTO"],
  ["TN", "Tamil Nadu", "TN-09", "Chennai", "Chennai South (old) RTO"],
  ["TN", "Tamil Nadu", "TN-10", "Chennai", "Chennai West (old) RTO"],
  ["TN", "Tamil Nadu", "TN-11", "Chennai", "Chennai North (old) RTO"],
  ["TN", "Tamil Nadu", "TN-20", "Coimbatore", "Coimbatore South RTO"],
  ["TN", "Tamil Nadu", "TN-21", "Coimbatore", "Coimbatore North RTO"],
  ["TN", "Tamil Nadu", "TN-22", "Tiruchirappalli", "Tiruchirappalli RTO"],
  ["TN", "Tamil Nadu", "TN-23", "Tiruppur", "Tiruppur RTO"],
  ["TN", "Tamil Nadu", "TN-24", "Vellore", "Vellore RTO"],
  ["TN", "Tamil Nadu", "TN-25", "Salem", "Salem RTO"],

  // --- Gujarat ---
  ["GJ", "Gujarat", "GJ-01", "Ahmedabad", "Ahmedabad RTO"],
  ["GJ", "Gujarat", "GJ-02", "Gandhinagar", "Gandhinagar RTO"],
  ["GJ", "Gujarat", "GJ-03", "Vadodara", "Vadodara RTO"],
  ["GJ", "Gujarat", "GJ-04", "Nadiad", "Nadiad (Kheda) RTO"],
  ["GJ", "Gujarat", "GJ-05", "Surat", "Surat RTO"],
  ["GJ", "Gujarat", "GJ-06", "Valsad", "Valsad RTO"],
  ["GJ", "Gujarat", "GJ-07", "Navsari", "Navsari RTO"],
  ["GJ", "Gujarat", "GJ-08", "Bharuch", "Bharuch RTO"],
  ["GJ", "Gujarat", "GJ-09", "Anand", "Anand RTO"],
  ["GJ", "Gujarat", "GJ-10", "Godhra", "Godhra (Panchmahal) RTO"],
  ["GJ", "Gujarat", "GJ-11", "Dahod", "Dahod RTO"],
  ["GJ", "Gujarat", "GJ-12", "Bhavnagar", "Bhavnagar RTO"],
  ["GJ", "Gujarat", "GJ-13", "Jamnagar", "Jamnagar RTO"],
  ["GJ", "Gujarat", "GJ-14", "Rajkot", "Rajkot RTO"],
  ["GJ", "Gujarat", "GJ-15", "Junagadh", "Junagadh RTO"],
  ["GJ", "Gujarat", "GJ-16", "Amreli", "Amreli RTO"],
  ["GJ", "Gujarat", "GJ-17", "Surendranagar", "Surendranagar RTO"],
  ["GJ", "Gujarat", "GJ-18", "Bhuj", "Bhuj (Kutch) RTO"],
  ["GJ", "Gujarat", "GJ-19", "Palanpur", "Palanpur (Banaskantha) RTO"],
  ["GJ", "Gujarat", "GJ-20", "Mehsana", "Mehsana RTO"],
  ["GJ", "Gujarat", "GJ-21", "Patan", "Patan RTO"],
  ["GJ", "Gujarat", "GJ-22", "Himmatnagar", "Himmatnagar (Sabarkantha) RTO"],
  ["GJ", "Gujarat", "GJ-23", "Vyara", "Vyara (Tapi) RTO"],
  ["GJ", "Gujarat", "GJ-24", "Rajpipla", "Rajpipla (Narmada) RTO"],
  ["GJ", "Gujarat", "GJ-27", "Rajkot", "Rajkot (new) RTO"],
  ["GJ", "Gujarat", "GJ-28", "Surat", "Surat (new) RTO"],
  ["GJ", "Gujarat", "GJ-29", "Ahmedabad", "Ahmedabad (new) RTO"],
  ["GJ", "Gujarat", "GJ-30", "Vadodara", "Vadodara (new) RTO"],

  // --- Haryana ---
  ["HR", "Haryana", "HR-01", "Ambala", "Ambala RTO"],
  ["HR", "Haryana", "HR-02", "Karnal", "Karnal RTO"],
  ["HR", "Haryana", "HR-03", "Kurukshetra", "Kurukshetra RTO"],
  ["HR", "Haryana", "HR-04", "Sonipat", "Sonipat RTO"],
  ["HR", "Haryana", "HR-05", "Faridabad", "Faridabad RTO"],
  ["HR", "Haryana", "HR-06", "Rohtak", "Rohtak RTO"],
  ["HR", "Haryana", "HR-07", "Gurugram", "Gurugram RTO"],
  ["HR", "Haryana", "HR-08", "Hisar", "Hisar RTO"],
  ["HR", "Haryana", "HR-09", "Panipat", "Panipat RTO"],
  ["HR", "Haryana", "HR-10", "Sirsa", "Sirsa RTO"],
  ["HR", "Haryana", "HR-11", "Bhiwani", "Bhiwani RTO"],
  ["HR", "Haryana", "HR-12", "Jind", "Jind RTO"],
  ["HR", "Haryana", "HR-13", "Mahendragarh", "Mahendragarh RTO"],
  ["HR", "Haryana", "HR-14", "Rewari", "Rewari RTO"],
  ["HR", "Haryana", "HR-15", "Yamunanagar", "Yamunanagar RTO"],
  ["HR", "Haryana", "HR-16", "Jhajjar", "Jhajjar RTO"],
  ["HR", "Haryana", "HR-17", "Palwal", "Palwal RTO"],
  ["HR", "Haryana", "HR-18", "Kaithal", "Kaithal RTO"],
  ["HR", "Haryana", "HR-19", "Panchkula", "Panchkula RTO"],
  ["HR", "Haryana", "HR-20", "Fatehabad", "Fatehabad RTO"],
  ["HR", "Haryana", "HR-21", "Nuh", "Nuh (Mewat) RTO"],
  ["HR", "Haryana", "HR-26", "Gurugram", "Gurugram (new) RTO"],
  ["HR", "Haryana", "HR-51", "Faridabad", "Faridabad (new) RTO"],
  ["HR", "Haryana", "HR-55", "Panchkula", "Panchkula (new) RTO"],

  // --- Punjab ---
  ["PB", "Punjab", "PB-01", "Jalandhar", "Jalandhar RTO"],
  ["PB", "Punjab", "PB-02", "Amritsar", "Amritsar RTO"],
  ["PB", "Punjab", "PB-03", "Ludhiana", "Ludhiana RTO"],
  ["PB", "Punjab", "PB-04", "Patiala", "Patiala RTO"],
  ["PB", "Punjab", "PB-05", "Faridkot", "Faridkot RTO"],
  ["PB", "Punjab", "PB-06", "Ferozepur", "Ferozepur RTO"],
  ["PB", "Punjab", "PB-07", "Hoshiarpur", "Hoshiarpur RTO"],
  ["PB", "Punjab", "PB-08", "Ropar", "Ropar RTO"],
  ["PB", "Punjab", "PB-09", "Kapurthala", "Kapurthala RTO"],
  ["PB", "Punjab", "PB-10", "Bathinda", "Bathinda RTO"],
  ["PB", "Punjab", "PB-11", "Moga", "Moga RTO"],
  ["PB", "Punjab", "PB-12", "Gurdaspur", "Gurdaspur RTO"],
  ["PB", "Punjab", "PB-13", "Sangrur", "Sangrur RTO"],
  ["PB", "Punjab", "PB-14", "Nawanshahr", "Nawanshahr RTO"],
  ["PB", "Punjab", "PB-15", "Muktsar", "Muktsar RTO"],
  ["PB", "Punjab", "PB-16", "Mansa", "Mansa RTO"],
  ["PB", "Punjab", "PB-17", "Barnala", "Barnala RTO"],
  ["PB", "Punjab", "PB-18", "Fazilka", "Fazilka RTO"],
  ["PB", "Punjab", "PB-19", "Pathankot", "Pathankot RTO"],
  ["PB", "Punjab", "PB-20", "Malerkotla", "Malerkotla RTO"],
  ["PB", "Punjab", "PB-21", "Fatehgarh Sahib", "Fatehgarh Sahib RTO"],
  ["PB", "Punjab", "PB-22", "Mohali", "SAS Nagar (Mohali) RTO"],
  ["PB", "Punjab", "PB-23", "Tarn Taran", "Tarn Taran RTO"],
  ["PB", "Punjab", "PB-65", "Mohali", "Mohali (new) RTO"],
  ["PB", "Punjab", "PB-77", "Ludhiana", "Ludhiana (new) RTO"],

  // --- Madhya Pradesh ---
  ["MP", "Madhya Pradesh", "MP-01", "Bhopal", "Bhopal RTO"],
  ["MP", "Madhya Pradesh", "MP-02", "Gwalior", "Gwalior RTO"],
  ["MP", "Madhya Pradesh", "MP-03", "Jabalpur", "Jabalpur RTO"],
  ["MP", "Madhya Pradesh", "MP-04", "Indore", "Indore RTO"],
  ["MP", "Madhya Pradesh", "MP-05", "Sagar", "Sagar RTO"],
  ["MP", "Madhya Pradesh", "MP-06", "Rewa", "Rewa RTO"],
  ["MP", "Madhya Pradesh", "MP-07", "Ujjain", "Ujjain RTO"],
  ["MP", "Madhya Pradesh", "MP-08", "Khargone", "Khargone RTO"],
  ["MP", "Madhya Pradesh", "MP-09", "Chhindwara", "Chhindwara RTO"],
  ["MP", "Madhya Pradesh", "MP-10", "Katni", "Katni RTO"],
  ["MP", "Madhya Pradesh", "MP-11", "Hoshangabad", "Hoshangabad RTO"],
  ["MP", "Madhya Pradesh", "MP-12", "Damoh", "Damoh RTO"],
  ["MP", "Madhya Pradesh", "MP-13", "Betul", "Betul RTO"],
  ["MP", "Madhya Pradesh", "MP-14", "Morena", "Morena RTO"],
  ["MP", "Madhya Pradesh", "MP-16", "Shivpuri", "Shivpuri RTO"],
  ["MP", "Madhya Pradesh", "MP-23", "Dhar", "Dhar RTO"],
  ["MP", "Madhya Pradesh", "MP-27", "Dewas", "Dewas RTO"],
  ["MP", "Madhya Pradesh", "MP-46", "Satna", "Satna RTO"],

  // --- Uttar Pradesh ---
  ["UP", "Uttar Pradesh", "UP-01", "Meerut", "Meerut RTO"],
  ["UP", "Uttar Pradesh", "UP-02", "Ghaziabad", "Ghaziabad RTO"],
  ["UP", "Uttar Pradesh", "UP-03", "Bareilly", "Bareilly RTO"],
  ["UP", "Uttar Pradesh", "UP-04", "Lucknow", "Lucknow RTO"],
  ["UP", "Uttar Pradesh", "UP-05", "Kanpur", "Kanpur RTO"],
  ["UP", "Uttar Pradesh", "UP-06", "Prayagraj", "Prayagraj (Allahabad) RTO"],
  ["UP", "Uttar Pradesh", "UP-07", "Varanasi", "Varanasi RTO"],
  ["UP", "Uttar Pradesh", "UP-08", "Gorakhpur", "Gorakhpur RTO"],
  ["UP", "Uttar Pradesh", "UP-09", "Agra", "Agra RTO"],
  ["UP", "Uttar Pradesh", "UP-10", "Aligarh", "Aligarh RTO"],
  ["UP", "Uttar Pradesh", "UP-11", "Jhansi", "Jhansi RTO"],
  ["UP", "Uttar Pradesh", "UP-12", "Moradabad", "Moradabad RTO"],
  ["UP", "Uttar Pradesh", "UP-13", "Saharanpur", "Saharanpur RTO"],
  ["UP", "Uttar Pradesh", "UP-14", "Ayodhya", "Ayodhya (Faizabad) RTO"],
  ["UP", "Uttar Pradesh", "UP-15", "Basti", "Basti RTO"],
  ["UP", "Uttar Pradesh", "UP-16", "Gonda", "Gonda RTO"],
  ["UP", "Uttar Pradesh", "UP-17", "Sitapur", "Sitapur RTO"],
  ["UP", "Uttar Pradesh", "UP-18", "Lakhimpur Kheri", "Lakhimpur Kheri RTO"],
  ["UP", "Uttar Pradesh", "UP-19", "Hardoi", "Hardoi RTO"],
  ["UP", "Uttar Pradesh", "UP-20", "Unnao", "Unnao RTO"],
  ["UP", "Uttar Pradesh", "UP-21", "Raebareli", "Raebareli RTO"],
  ["UP", "Uttar Pradesh", "UP-22", "Sultanpur", "Sultanpur RTO"],
  ["UP", "Uttar Pradesh", "UP-23", "Pratapgarh", "Pratapgarh RTO"],
  ["UP", "Uttar Pradesh", "UP-24", "Farrukhabad", "Farrukhabad RTO"],
  ["UP", "Uttar Pradesh", "UP-25", "Etawah", "Etawah RTO"],
  ["UP", "Uttar Pradesh", "UP-26", "Mainpuri", "Mainpuri RTO"],
  ["UP", "Uttar Pradesh", "UP-27", "Etah", "Etah RTO"],
  ["UP", "Uttar Pradesh", "UP-28", "Mathura", "Mathura RTO"],
  ["UP", "Uttar Pradesh", "UP-29", "Bulandshahr", "Bulandshahr RTO"],
  ["UP", "Uttar Pradesh", "UP-30", "Budaun", "Budaun RTO"],
  ["UP", "Uttar Pradesh", "UP-31", "Pilibhit", "Pilibhit RTO"],
  ["UP", "Uttar Pradesh", "UP-32", "Shahjahanpur", "Shahjahanpur RTO"],
  ["UP", "Uttar Pradesh", "UP-33", "Bijnor", "Bijnor RTO"],
  ["UP", "Uttar Pradesh", "UP-34", "Muzaffarnagar", "Muzaffarnagar RTO"],

  // --- West Bengal ---
  ["WB", "West Bengal", "WB-01", "Kolkata", "Kolkata RTO"],
  ["WB", "West Bengal", "WB-02", "Howrah", "Howrah RTO"],
  ["WB", "West Bengal", "WB-03", "Hooghly", "Hooghly (Chinsurah) RTO"],
  ["WB", "West Bengal", "WB-04", "Nadia", "Nadia RTO"],
  ["WB", "West Bengal", "WB-05", "Murshidabad", "Murshidabad RTO"],
  ["WB", "West Bengal", "WB-06", "Birbhum", "Birbhum RTO"],
  ["WB", "West Bengal", "WB-07", "Bardhaman", "Bardhaman RTO"],
  ["WB", "West Bengal", "WB-08", "Jalpaiguri", "Jalpaiguri RTO"],
  ["WB", "West Bengal", "WB-09", "Darjeeling", "Darjeeling RTO"],
  ["WB", "West Bengal", "WB-10", "Malda", "Malda RTO"],
  ["WB", "West Bengal", "WB-11", "Balurghat", "Balurghat (Dakshin Dinajpur) RTO"],
  ["WB", "West Bengal", "WB-12", "Cooch Behar", "Cooch Behar RTO"],

  // --- Telangana ---
  ["TS", "Telangana", "TS-01", "Hyderabad", "Hyderabad Central RTO"],
  ["TS", "Telangana", "TS-07", "Rangareddy", "Rangareddy RTO"],
  ["TS", "Telangana", "TS-08", "Medchal", "Medchal RTO"],
  ["TS", "Telangana", "TS-09", "Sangareddy", "Sangareddy RTO"],
  ["TS", "Telangana", "TS-10", "Nizamabad", "Nizamabad RTO"],
  ["TS", "Telangana", "TS-11", "Karimnagar", "Karimnagar RTO"],
  ["TS", "Telangana", "TS-12", "Warangal", "Warangal RTO"],
  ["TS", "Telangana", "TS-13", "Khammam", "Khammam RTO"],
  ["TS", "Telangana", "TS-14", "Nalgonda", "Nalgonda RTO"],
  ["TS", "Telangana", "TS-15", "Mahabubnagar", "Mahabubnagar RTO"],
  ["TS", "Telangana", "TS-16", "Adilabad", "Adilabad RTO"],

  // --- Kerala ---
  ["KL", "Kerala", "KL-01", "Thiruvananthapuram", "Thiruvananthapuram RTO"],
  ["KL", "Kerala", "KL-02", "Kollam", "Kollam RTO"],
  ["KL", "Kerala", "KL-03", "Pathanamthitta", "Pathanamthitta RTO"],
  ["KL", "Kerala", "KL-04", "Alappuzha", "Alappuzha RTO"],
  ["KL", "Kerala", "KL-05", "Kottayam", "Kottayam RTO"],
  ["KL", "Kerala", "KL-06", "Idukki", "Idukki RTO"],
  ["KL", "Kerala", "KL-07", "Kochi", "Ernakulam RTO"],
  ["KL", "Kerala", "KL-08", "Thrissur", "Thrissur RTO"],
  ["KL", "Kerala", "KL-09", "Palakkad", "Palakkad RTO"],
  ["KL", "Kerala", "KL-10", "Malappuram", "Malappuram RTO"],
  ["KL", "Kerala", "KL-11", "Kozhikode", "Kozhikode RTO"],
  ["KL", "Kerala", "KL-12", "Wayanad", "Wayanad RTO"],
  ["KL", "Kerala", "KL-13", "Kannur", "Kannur RTO"],
  ["KL", "Kerala", "KL-14", "Kasaragod", "Kasaragod RTO"],

  // --- Bihar ---
  ["BR", "Bihar", "BR-01", "Patna", "Patna RTO"],
  ["BR", "Bihar", "BR-02", "Gaya", "Gaya RTO"],
  ["BR", "Bihar", "BR-03", "Bhagalpur", "Bhagalpur RTO"],
  ["BR", "Bihar", "BR-04", "Muzaffarpur", "Muzaffarpur RTO"],
  ["BR", "Bihar", "BR-05", "Darbhanga", "Darbhanga RTO"],
  ["BR", "Bihar", "BR-06", "Motihari", "East Champaran RTO"],
  ["BR", "Bihar", "BR-07", "Bettiah", "West Champaran RTO"],
  ["BR", "Bihar", "BR-08", "Chhapra", "Saran RTO"],
  ["BR", "Bihar", "BR-09", "Siwan", "Siwan RTO"],
  ["BR", "Bihar", "BR-10", "Gopalganj", "Gopalganj RTO"],
  ["BR", "Bihar", "BR-11", "Purnia", "Purnia RTO"],
  ["BR", "Bihar", "BR-12", "Katihar", "Katihar RTO"],
  ["BR", "Bihar", "BR-13", "Araria", "Araria RTO"],
  ["BR", "Bihar", "BR-14", "Kishanganj", "Kishanganj RTO"],
  ["BR", "Bihar", "BR-15", "Saharsa", "Saharsa RTO"],
  ["BR", "Bihar", "BR-16", "Madhepura", "Madhepura RTO"],
  ["BR", "Bihar", "BR-17", "Supaul", "Supaul RTO"],
  ["BR", "Bihar", "BR-18", "Madhubani", "Madhubani RTO"],
  ["BR", "Bihar", "BR-19", "Samastipur", "Samastipur RTO"],
  ["BR", "Bihar", "BR-20", "Begusarai", "Begusarai RTO"],
  ["BR", "Bihar", "BR-21", "Khagaria", "Khagaria RTO"],
  ["BR", "Bihar", "BR-22", "Munger", "Munger RTO"],
  ["BR", "Bihar", "BR-23", "Lakhisarai", "Lakhisarai RTO"],
  ["BR", "Bihar", "BR-24", "Sheikhpura", "Sheikhpura RTO"],
  ["BR", "Bihar", "BR-25", "Nawada", "Nawada RTO"],
  ["BR", "Bihar", "BR-26", "Jamui", "Jamui RTO"],
  ["BR", "Bihar", "BR-27", "Arrah", "Bhojpur RTO"],
  ["BR", "Bihar", "BR-28", "Buxar", "Buxar RTO"],
  ["BR", "Bihar", "BR-29", "Bhabua", "Kaimur RTO"],
  ["BR", "Bihar", "BR-30", "Sasaram", "Rohtas RTO"],
  ["BR", "Bihar", "BR-31", "Aurangabad", "Aurangabad RTO"],
  ["BR", "Bihar", "BR-32", "Jehanabad", "Jehanabad RTO"],
  ["BR", "Bihar", "BR-33", "Biharsharif", "Nalanda RTO"],
  ["BR", "Bihar", "BR-34", "Hajipur", "Vaishali RTO"],
  ["BR", "Bihar", "BR-35", "Sitamarhi", "Sitamarhi RTO"],
  ["BR", "Bihar", "BR-36", "Sheohar", "Sheohar RTO"],

  // --- Odisha ---
  ["OD", "Odisha", "OD-01", "Bhubaneswar", "Bhubaneswar RTO"],
  ["OD", "Odisha", "OD-02", "Cuttack", "Cuttack RTO"],
  ["OD", "Odisha", "OD-03", "Berhampur", "Berhampur RTO"],
  ["OD", "Odisha", "OD-04", "Puri", "Puri RTO"],
  ["OD", "Odisha", "OD-05", "Balasore", "Balasore RTO"],
  ["OD", "Odisha", "OD-06", "Bhadrak", "Bhadrak RTO"],

  // --- Chhattisgarh ---
  ["CG", "Chhattisgarh", "CG-01", "Raipur", "Raipur RTO"],
  ["CG", "Chhattisgarh", "CG-02", "Bilaspur", "Bilaspur RTO"],
  ["CG", "Chhattisgarh", "CG-03", "Durg", "Durg RTO"],
  ["CG", "Chhattisgarh", "CG-04", "Rajnandgaon", "Rajnandgaon RTO"],
  ["CG", "Chhattisgarh", "CG-05", "Raigarh", "Raigarh RTO"],
  ["CG", "Chhattisgarh", "CG-06", "Jagdalpur", "Bastar RTO"],
  ["CG", "Chhattisgarh", "CG-07", "Korba", "Korba RTO"],
  ["CG", "Chhattisgarh", "CG-08", "Janjgir", "Janjgir-Champa RTO"],
  ["CG", "Chhattisgarh", "CG-09", "Mahasamund", "Mahasamund RTO"],
  ["CG", "Chhattisgarh", "CG-10", "Kanker", "Kanker RTO"],
  ["CG", "Chhattisgarh", "CG-11", "Dhamtari", "Dhamtari RTO"],
  ["CG", "Chhattisgarh", "CG-12", "Kawardha", "Kabirdham RTO"],
  ["CG", "Chhattisgarh", "CG-13", "Jashpur", "Jashpur RTO"],
  ["CG", "Chhattisgarh", "CG-14", "Ambikapur", "Surguja RTO"],
  ["CG", "Chhattisgarh", "CG-15", "Baikunthpur", "Korea RTO"],
  ["CG", "Chhattisgarh", "CG-16", "Dantewada", "Dantewada RTO"],
  ["CG", "Chhattisgarh", "CG-17", "Bijapur", "Bijapur RTO"],
  ["CG", "Chhattisgarh", "CG-18", "Narayanpur", "Narayanpur RTO"],

  // --- Jharkhand ---
  ["JH", "Jharkhand", "JH-01", "Ranchi", "Ranchi RTO"],
  ["JH", "Jharkhand", "JH-02", "Hazaribagh", "Hazaribagh RTO"],
  ["JH", "Jharkhand", "JH-03", "Dhanbad", "Dhanbad RTO"],
  ["JH", "Jharkhand", "JH-04", "Jamshedpur", "Jamshedpur RTO"],
  ["JH", "Jharkhand", "JH-05", "Bokaro", "Bokaro RTO"],
  ["JH", "Jharkhand", "JH-06", "Giridih", "Giridih RTO"],
  ["JH", "Jharkhand", "JH-07", "Daltonganj", "Palamu RTO"],
  ["JH", "Jharkhand", "JH-08", "Deoghar", "Deoghar RTO"],
  ["JH", "Jharkhand", "JH-09", "Dumka", "Dumka RTO"],
  ["JH", "Jharkhand", "JH-10", "Godda", "Godda RTO"],
  ["JH", "Jharkhand", "JH-11", "Sahebganj", "Sahebganj RTO"],
  ["JH", "Jharkhand", "JH-12", "Pakur", "Pakur RTO"],
  ["JH", "Jharkhand", "JH-13", "Lohardaga", "Lohardaga RTO"],
  ["JH", "Jharkhand", "JH-14", "Gumla", "Gumla RTO"],
  ["JH", "Jharkhand", "JH-15", "Simdega", "Simdega RTO"],

  // --- Uttarakhand ---
  ["UK", "Uttarakhand", "UK-01", "Dehradun", "Dehradun RTO"],
  ["UK", "Uttarakhand", "UK-02", "Haldwani", "Nainital RTO"],
  ["UK", "Uttarakhand", "UK-03", "Haridwar", "Haridwar RTO"],
  ["UK", "Uttarakhand", "UK-04", "Rudrapur", "Udham Singh Nagar RTO"],
  ["UK", "Uttarakhand", "UK-05", "Pauri", "Pauri Garhwal RTO"],
  ["UK", "Uttarakhand", "UK-06", "Chamoli", "Chamoli RTO"],
  ["UK", "Uttarakhand", "UK-07", "Uttarkashi", "Uttarkashi RTO"],
  ["UK", "Uttarakhand", "UK-08", "Tehri", "Tehri Garhwal RTO"],
  ["UK", "Uttarakhand", "UK-09", "Rudraprayag", "Rudraprayag RTO"],
  ["UK", "Uttarakhand", "UK-10", "Pithoragarh", "Pithoragarh RTO"],
  ["UK", "Uttarakhand", "UK-11", "Almora", "Almora RTO"],
  ["UK", "Uttarakhand", "UK-12", "Bageshwar", "Bageshwar RTO"],
  ["UK", "Uttarakhand", "UK-13", "Champawat", "Champawat RTO"],

  // --- Himachal Pradesh ---
  ["HP", "Himachal Pradesh", "HP-01", "Shimla", "Shimla RTO"],
  ["HP", "Himachal Pradesh", "HP-02", "Solan", "Solan RTO"],
  ["HP", "Himachal Pradesh", "HP-03", "Mandi", "Mandi RTO"],
  ["HP", "Himachal Pradesh", "HP-04", "Kangra", "Kangra RTO"],
  ["HP", "Himachal Pradesh", "HP-05", "Una", "Una RTO"],
  ["HP", "Himachal Pradesh", "HP-06", "Bilaspur", "Bilaspur RTO"],
  ["HP", "Himachal Pradesh", "HP-07", "Hamirpur", "Hamirpur RTO"],
  ["HP", "Himachal Pradesh", "HP-08", "Kullu", "Kullu RTO"],
  ["HP", "Himachal Pradesh", "HP-09", "Keylong", "Lahaul-Spiti RTO"],
  ["HP", "Himachal Pradesh", "HP-10", "Reckong Peo", "Kinnaur RTO"],
  ["HP", "Himachal Pradesh", "HP-11", "Chamba", "Chamba RTO"],
  ["HP", "Himachal Pradesh", "HP-12", "Nahan", "Sirmaur RTO"],

  // --- Union territories & others ---
  ["CH", "Chandigarh", "CH-01", "Chandigarh", "Chandigarh RTO"],
  ["PY", "Puducherry", "PY-01", "Puducherry", "Puducherry RTO"],
  ["PY", "Puducherry", "PY-02", "Karaikal", "Karaikal RTO"],
  ["PY", "Puducherry", "PY-03", "Mahe", "Mahe RTO"],
  ["PY", "Puducherry", "PY-04", "Yanam", "Yanam RTO"],
  ["GA", "Goa", "GA-01", "Panaji", "North Goa RTO"],
  ["GA", "Goa", "GA-02", "Margao", "South Goa RTO"],
  ["DN", "Dadra and Nagar Haveli and Daman and Diu", "DN-01", "Silvassa", "Dadra and Nagar Haveli RTO"],
  ["DD", "Dadra and Nagar Haveli and Daman and Diu", "DD-01", "Daman", "Daman RTO"],
  ["DD", "Dadra and Nagar Haveli and Daman and Diu", "DD-02", "Diu", "Diu RTO"],
  ["AN", "Andaman and Nicobar Islands", "AN-01", "Port Blair", "Port Blair RTO"],
  ["LD", "Lakshadweep", "LD-01", "Kavaratti", "Kavaratti RTO"],
  ["JK", "Jammu and Kashmir", "JK-01", "Jammu", "Jammu RTO"],
  ["JK", "Jammu and Kashmir", "JK-02", "Srinagar", "Srinagar RTO"],
];

export const rtoDirectory: RtoEntry[] = RAW.map(([stateCode, state, code, city, officeName]) =>
  entry(stateCode, state, code, city, officeName ?? `${city} RTO`)
);

export const STATE_NAMES: Record<string, string> = {};

for (const item of rtoDirectory) {
  STATE_NAMES[item.stateCode] = item.state;
}

const byCode = new Map<string, RtoEntry>();
const byState = new Map<string, RtoEntry[]>();
const byCity = new Map<string, RtoEntry[]>();

for (const item of rtoDirectory) {
  byCode.set(item.code, item);
  const stateKey = item.state.toLowerCase();
  const cityKey = item.city.toLowerCase();
  if (!byState.has(stateKey)) byState.set(stateKey, []);
  byState.get(stateKey)!.push(item);
  if (!byCity.has(cityKey)) byCity.set(cityKey, []);
  byCity.get(cityKey)!.push(item);
}

export function rtoByCode(code: string): RtoEntry | undefined {
  return byCode.get(code.toUpperCase());
}

/** Match by state code ("MH") or full name ("Maharashtra"), case-insensitive. */
export function rtoByState(state: string): RtoEntry[] {
  const q = state.toLowerCase();
  return byState.get(q) ?? rtoDirectory.filter(
    (item) => item.stateCode.toLowerCase() === q || item.state.toLowerCase() === q
  );
}

export function rtoByCity(city: string): RtoEntry[] {
  return byCity.get(city.toLowerCase()) ?? [];
}

/** Case-insensitive search across code/state/city/office name. */
export function searchRto(query: string): RtoEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return rtoDirectory;
  return rtoDirectory.filter(
    (item) =>
      item.code.toLowerCase().includes(q) ||
      item.state.toLowerCase().includes(q) ||
      item.stateCode.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.officeName.toLowerCase().includes(q)
  );
}

export const rtoStats = {
  total: rtoDirectory.length,
  states: new Set(rtoDirectory.map((r) => r.stateCode)).size,
};
