// ========== GROCERY GRID — PRODUCT CATALOGUE DATA ==========
// Each category is either "flat" (items: [...]) or has "subcategories": [{name, items:[...]}]
// `icon` is an emoji fallback shown until you drop a real image at assets/images/categories/<id>.png
// image key = expected filename in assets/images/categories/ (add later, code already wired for it)

const productCategories = [
  {
    id: "bush-colour",
    name: "Bush Colour",
    icon: "🎨",
    items: ["ORANGE RED x 100g", "YELLOW x 100g", "GREEN APPLE x 100g", "KESARI x 100g"]
  },
  {
    id: "cleaning-household",
    name: "Cleaning & Household",
    icon: "🧼",
    items: [
      "FENA SURF 1kg", "FENA SURF x 500g", "GHARI SURF", "NIP SOAP SET", "VIM SET",
      "VIM POWDER", "DISH LIQUID x 5LTR", "PHENYL x 5LTR", "HANDWASH x 5LTR",
      "FLOOR CLEANER x 5LTR", "COLIN x 5LTR", "TOILET CLEANER x 5LTR",
      "ROOM FRESHNER x 5LTR", "ROOM FRESHNER ODONIL", "WYPER"
    ]
  },
  {
    id: "monin",
    name: "Monin",
    icon: "🍸",
    comingSoon: true,
    items: []
  },
  {
    id: "papad",
    name: "Papad",
    icon: "🥟",
    items: ["LIZZAT PAPAD MASALA 200g", "RAJHANS PAPAD 200g", "RAJHANS PAPAD 400g", "GOLGAPPA"]
  },
  {
    id: "ajanta",
    name: "Ajanta",
    icon: "🧁",
    items: [
      "BAKING POWDER x 100g", "BAKING POWDER x 500g", "BAKING POWDER x 1kg",
      "ORANGE RED COLOUR x 100g", "GREEN COLOUR x 100g", "YELLOW COLOUR x 100g",
      "RUSBHERY RED COLOUR x 100g"
    ]
  },
  {
    id: "morde-chocolate",
    name: "Morde Chocolate",
    icon: "🍫",
    items: ["DARK COMPOUND CHOCOLATE x 500g", "WHITE COMPOUND CHOCOLATE x 500g"]
  },
  {
    id: "bakery-premix",
    name: "Bakery Premix",
    icon: "🥐",
    items: ["PILSBURY PREMIX"]
  },
  {
    id: "mocktails-crushes",
    name: "Mocktails & Crushes",
    icon: "🍹",
    subcategories: [
      {
        name: "Zone Mocktail",
        items: [
          "MOJITO", "BLUE BERRY", "PINEAPPLE", "LITCHI", "MANGO", "PEACH",
          "KALA KHATTA", "ORANGE", "STRAWBERRY", "BLUE CURRACCO", "HAZLENUT",
          "GRENADINE", "KIWI"
        ]
      },
      {
        name: "Mapro & Mala's Crushes",
        items: ["MANGO", "STRAWBERRY", "KALA KHATTA", "LITCHI", "BLUE BERRY", "KIWI"]
      }
    ]
  },
  {
    id: "everplus-sauces-beverages",
    name: "Everplus Sauces & Beverages",
    icon: "🍅",
    items: [
      "GREEN CHILLY 4.5kg", "CONTINENTAL SAUCE 4.5kg", "SOYA SAUCE 4.5kg",
      "TOMATO KETCHUP 4.5kg", "VINEGAR 4.2LTR", "MAYONAISE", "VINEGAR POUCH",
      "GREEN CHILLI POUCH", "TOMATO SAUCE POUCH", "GREEN CHILI PICKLE 4.5kg",
      "MIX PICKLE x 4.5kg", "MANGO PICKLE"
    ]
  },
  {
    id: "lee-kum-sauces",
    name: "Lee Kum Sauces",
    icon: "🥡",
    items: ["LIGHT SOYA SOUCE", "DARK SOYA SOUCE", "OYESTAR SOUCE"]
  },
  {
    id: "imported-sauces",
    name: "Imported Sauces",
    icon: "🌏",
    items: ["BLACK BEAN SOUCE", "OYESTER SOUCE", "COOKING WINE", "SRI RAJA SOUCE"]
  },
  {
    id: "funtop-sauces",
    name: "Funtop Sauces",
    icon: "🍶",
    items: ["GREEN CHILLY SAUCE 4.5kg", "CONTINENTAL SOURCE 4.5kg", "SOYA SOUCE"]
  },
  {
    id: "tops-sauces-beverages",
    name: "Tops Sauces (Beverages)",
    icon: "🥤",
    items: [
      "CONTINENTAL SOUCE 1kg", "TOMATO KETCHUP 1kg", "GREEN CHILLY SAUCE 730g",
      "SOYA SOUCE 730 ML", "VINEGAR 730ML", "CUSTARD POWDER", "NOODLES",
      "PICKLES MANGO 1kg", "PICKLE MIX 1kg", "FRUIT JAM 1kg"
    ]
  },
  {
    id: "hul",
    name: "HUL",
    icon: "🏭",
    items: ["AROMATEL POWDER", "CHICKEN BROTH POWDER", "LIME SEASONING", "KISSAN SOUCE KETCHUP (DOY PACK)"]
  },
  {
    id: "mdh-masale",
    name: "MDH Masale",
    icon: "🌶️",
    items: [
      "KITCHEN KING", "DEGI MIRCH", "KASHMIRI MIRCH", "PAV BHAJI MASALA",
      "SAMBHAR MASALA", "WHITE PEPPER POWDER", "CHUNKY CHAT MASALA",
      "KASOORI METHI", "JALJEERA POWDER", "CHANA MASALA", "SHAHI PANEER MASALA",
      "RAJMA MASALA", "MEAT MASALA", "CHICKEN MASALA"
    ]
  },
  {
    id: "salt-sugar",
    name: "Salt & Sugar",
    icon: "🧂",
    items: [
      "BOORA", "GUDD", "BROWN SUGAR", "ICING BREAKFAST SUGAR", "SUGAR FREE SACHET",
      "WHITE DOUBLE REFINED SUGAR", "TATA NAMAK", "GOOD DAY SALT",
      "BLACK SALT (MANJEET)", "SABUT WHITE SALT"
    ]
  },
  {
    id: "holyland-golden-crown",
    name: "Holy Land Marketing & Golden Crown",
    icon: "👑",
    items: [
      "AJINOMOTO", "BREADCRUMBS", "KEWRA WATER", "ROSE WATER",
      "GREEN CHILLY POUCHONG 25kg", "PASTA PENNI", "PASTA SPIRAL", "COCONUT MILK",
      "PINEAPPLE SLICE", "FRUIT COCKTAIL", "TOMATO PUREE", "TOMATO PASTE",
      "BABY CORN", "SWEET CORN AMERICAN", "SWEET CORN (CREAMY STYLE)",
      "BAMBOO SHOOT", "GARKIN", "CHOCOLATE SYRUP", "SRIRACHA SOUCE",
      "FRIED CRISP ONION", "BROWN SUGAR POUCH", "WHITE SUGAR POUCH",
      "CORN FLAKES", "OYESTER SOUCE", "OLIVE BLACK SLICE", "OLIVE GREEN SLICE",
      "SWEET CHILLI SOUCE", "LAMENESE"
    ]
  },
  {
    id: "dry-fruits",
    name: "Dry Fruits",
    icon: "🥜",
    items: [
      "MAGAJ MOTA SUDANESE", "KAJU 4 Tukda (Gravy)", "KAJU 8 Tukda", "KAJU 6 Tukda",
      "KAJU 2 Tukda", "KAJU SABUT", "ANJEER", "MAKHANA", "BADAM GIRI", "KISHMISH",
      "MAGAJ KHARBOOJA", "CHIRONJI", "PISTA PISHORI", "PISTA MOTA",
      "MOONGFALI DANA (CHILKA)", "MOONGPHALI DANA (BINA CHILKA)"
    ]
  },
  {
    id: "disposable-items",
    name: "Disposable Items",
    icon: "🥡",
    items: [
      "CHEF CAP", "TEA CUP", "WATER GLASS", "MC DOWELL GLASS", "DUSTER", "POCHA",
      "STAFF PLATE", "4CP ECO SUGARCANE PLATE", "3CP ECO SUGARCANE PLATE",
      "CARRY BAG 6\" (MILKY)", "CARRY BAG 7\" (MILKY)", "PASTA RCT CONTAINER",
      "& MANY OTHER ITEMS"
    ]
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    icon: "📦",
    items: [
      "ENO BLUE", "OREGANO", "OREGANO SPICE MIX", "SILVER FOIL x 1kg",
      "MIDAS SPICE MIX 1kg", "CHILLY FLAKES", "OREGANO POUCH", "HONEY 1kg"
    ]
  },
  {
    id: "spices-powder",
    name: "Spices (Powder)",
    icon: "🌶️",
    items: [
      "GARLIC POWDER", "ONION POWDER", "SONTH POWDER", "JEERA POWDER",
      "KALI MIRCH POWDER", "KASHMIRI MIRCH POWDER", "KUTTI LAL MIRCH", "MIRCH POWDER",
      "PILI MIRCH POWDER", "WHITE PEPPER POWDER", "ANARDANA POWDER",
      "KITCHEN KING MASALA", "CHAT MASALA", "HALDI POWDER", "GARAM MASALA",
      "COCONUT POWDER (MANGAL)", "GULKAND (WHOLE)", "CHERRY PETHA (WHOLE)",
      "NOSADER (WHOLE)", "MEETHA SODA"
    ]
  },
  {
    id: "oil",
    name: "Oils & Ghee",
    icon: "🛢️",
    items: [
      "REFINED 13 KG", "REFINED 13 KG", "REFINED 15 KG", "PALMOLINE 15 KG", 
      "DESI GHEE 900ML", "MUSTARD OIL", "MUSTARD OIL", "VANASPATI 15 KG", 
      "VANASPATI 15 KG", "REFINED SOYA POUCH", "REFINED SOYA POUCH", "PALMOLINE POUCH"      
    ]
  },
  {
    id: "spices-whole",
    name: "Spices (Whole)",
    icon: "✨",
    items: [
      "AMCHOOR SABUT", "AJWAIN SORTEX", "BADI ELAICHI", "CHILLY FLAKES",
      "CHOTI ELAICHI", "DALCHINI PAPER DOSA", "DALCHINI CIGAR", "DRY GINGER",
      "DRY ONION", "DRY GARLIC", "JAIFAL", "JAVITRI", "JEERA SABUT", "SHAHI JEERA",
      "KALI MIRCH", "KHAS - KHAS", "KASHMIRI MIRCH", "LAUNG", "METHI DANA",
      "MIRCH SABUT (TEJA)", "MIRCH SABUT (INDORE)", "PEEPAL BADI", "YELLOW MUSTARD",
      "BLACK MUSTARD", "RESHAM PATTA", "CHABEELA (SAMUNDRI JHAG)", "ROSE PETAL",
      "MOTI SAUNF", "BAREEK SAUNF", "SCHEZWAN PEPPER", "FIVE SPICE POWDER",
      "SONTH SABUT", "WHITE PEPPER", "STAR ANISE", "TEJPATTA", "WHITE TIL",
      "ANARDANA SABUT", "KASOORI METHI", "CITRIC", "IMLI", "YEAST", "ELAICHI DANA"
    ]
  },
  {
    id: "pulses",
    name: "Pulses",
    icon: "🥘",
    items: [
      "ARHAR DAL (AKHRA)", "CHANA DAL", "KALA CHANA", "URAD SABUT (MANGAT RAM)",
      "URAD SABUT (CAPITAL FOODS)", "LOBHIA", "MASOOR LAL", "KALI MASOOR",
      "MATAR DAL", "MIX DAL", "MOONG CHILKA", "MOONG DHULI", "MOONG SABUT",
      "RAJMA CHITRA (CHINA)", "RAJMA CHITRA (BRAZIL)", "RAJMA DISCO",
      "SAFED CHOLE (KARNATKA SORTEX)", "SAFED MATAR", "SOYA BADI", "SOYA CHURA",
      "URAD CHILKA", "URAD DHOBA", "URAD DHULI SABUT (GOTA)", "BHUNA CHANA DAL"
    ]
  },
  {
    id: "flour-grain",
    name: "Flour & Grain Varieties",
    icon: "🌾",
    items: [
      "BESAN BARIK", "RAJDHANI BESAN", "BESAN MOTA", "BESAN GARGARA",
      "CHAKKI ATTA PURE", "CHAKKI ATTA M.P.", "CHAKKI ATTA (Delhi Flour Mill)",
      "MILL ATTA (Delhi Flour Mill)", "MAIDA M.P.M (Delhi Flour Mill)",
      "MAIDA PATENT (Delhi Flour Mill)", "MAIDA PATENT (Nourang Flour Mill)",
      "MAIDA PATENT (DOUBLE TALWAR)", "NON BRANDED POHA", "M.P BRANDED POHA",
      "RAWA", "SUJI", "VERMICELLI"
    ]
  },
  {
    id: "rice",
    name: "Rice",
    icon: "🍚",
    subcategories: [
      {
        name: "Golden Rice Category",
        items: ["Golden 1121 Tibar", "Golden 1121 Haryana Rozana", "Golden 1121 Galaxy Rice", "Golden 1121 Double Chabi Rice"]
      },
      {
        name: "Staff Rice",
        items: ["Deepawli Rice", "Ordinary Broken Rice", "Tibar Basmati", "Parmal Sortex Rice"]
      },
      {
        name: "Basmati Rice",
        items: ["India Gate Classic Rice", "Gauri Premium Rice", "1401 Basmati Rice", "Rojana Rice"]
      },
      {
        name: "South Indian Rice",
        items: ["T.G. Rice", "Idly Rice", "Ponni Rice", "Tajmahal Sela Rice"]
      }
    ]
  }
];

// ========== AUTHORISED DEALER OF — brand list ==========
const authorisedDealers = [
  { id: "mdh-spices", name: "MDH Spices" },
  { id: "funtop-sauces", name: "Funtop Sauces (Arora Beverages)" },
  { id: "everplus", name: "Everplus Sauces & Beverages" },
  { id: "delhi-flour-mills", name: "Delhi Flour Mills" },
  { id: "mangat-ram-pulses", name: "Mangat Ram Pulses" },
  { id: "holyland-golden-crown", name: "Holyland Marketing & Golden Crown" }
];

// ========== NEW RESTAURANT / OUTLET PARTNERS ==========
// These get appended to the "Trusted by Leading Chains" carousel on the homepage
const newPartners = [
  { id: "apni-rasoi", name: "Apni Rasoi", detail: "All Branches" },
  { id: "khadak-singh", name: "Khadak Singh", detail: "Delhi Branches" },
  { id: "bbq-company", name: "Barbeque Company (BBQ)", detail: "Delhi & NCR" },
  { id: "cheers-restro-bar", name: "Cheers Restro & Bar", detail: "Prashant Vihar" },
  { id: "metro-grill-bar", name: "Metro Grill & Bar", detail: "Sector-10" },
  { id: "punjab-aura", name: "Punjab Aura", detail: "Patel Nagar" }
];
