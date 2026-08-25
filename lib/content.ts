export const phone = {
  display: "+91 98300 50189",
  tel: "+919830050189",
  whatsapp: "919830050189",
};

export const project = {
  name: "Shantiban City",
  fullName: "Mrityika Shantiban City",
  builder: "Mrityika Realters",
  locality: "Tapna, Baruipur, South 24 Parganas",
  distanceFromKolkata: "20 km",
  possession: "Ready to Move",
  totalPlots: 220,
  plotUnit: "2.5 Katha",
  commercialLand: "100 Katha",
  commercialArea: "72,000 sq ft",
  rating: 4.0,
  reviewCount: 34,
};

export const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1572001135898-7d20cb98965a?q=80&w=1920&auto=format&fit=crop",
    alt: "Aerial view of Kolkata with high-rise buildings and green parkland",
    eyebrow: "20 KM From Your Kolkata",
    headline: "A city planned around green.",
  },
  {
    src: "https://images.unsplash.com/photo-1650874210636-269503e6c2bc?q=80&w=1920&auto=format&fit=crop",
    alt: "A landscaped Kolkata park with a fountain",
    eyebrow: "The Lake, At the Heart of It",
    headline: "Water, light and open sky.",
  },
  {
    src: "https://images.unsplash.com/photo-1700210326989-7908f6de618f?q=80&w=1920&auto=format&fit=crop",
    alt: "A tree-lined walkway through a green Kolkata park",
    eyebrow: "Pollution-Free, Fresh Air",
    headline: "Green surrounds every plot.",
  },
] as const;

export const galleryImages = {
  overview:
    "https://images.unsplash.com/photo-1640282898962-42bc714de660?q=80&w=1400&auto=format&fit=crop",
  seniorDeck:
    "https://images.unsplash.com/photo-1609251489433-615c04e0d958?q=80&w=1200&auto=format&fit=crop",
  sportsCourt:
    "https://images.unsplash.com/photo-1607494629394-bcc30e45c7b2?q=80&w=1200&auto=format&fit=crop",
  lake:
    "https://images.unsplash.com/photo-1673782451304-bab153644e4a?q=80&w=1200&auto=format&fit=crop",
  clubhouse:
    "https://images.unsplash.com/photo-1775993167276-743bbcde77e1?q=80&w=1200&auto=format&fit=crop",
  seatingNursery:
    "https://images.unsplash.com/photo-1779639513853-7dcb70c0a5da?q=80&w=1200&auto=format&fit=crop",
  bbqDeck: "/images/amenity-bbq-deck.jpg",
  fishingDeck: "/images/amenity-fishing-deck.jpg",
  clubHouseFountain: "/images/amenity-club-house-fountain.jpg",
  clubHouse: "/images/amenity-club-house.jpg",
} as const;

export type Feature = {
  icon:
    | "train"
    | "map-pin"
    | "road-horizon"
    | "leaf"
    | "speaker-slash"
    | "tree"
    | "first-aid"
    | "graduation-cap"
    | "gate"
    | "shield-check"
    | "lightning"
    | "buildings"
    | "trend-up";
  title: string;
  body: string;
  image: string;
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`;

export const features: Feature[] = [
  {
    icon: "train",
    title: "Future Metro Connectivity",
    body: "A metro station is coming within 5 years.",
    image: u("1760816417642-6a43a279fb4c"),
  },
  {
    icon: "map-pin",
    title: "Prime Location",
    body: "You're just 20 km from Kolkata.",
    image: u("1572001135898-7d20cb98965a"),
  },
  {
    icon: "road-horizon",
    title: "Excellent Connectivity",
    body: "Reach the city easily via Baruipur Bypass.",
    image: u("1750715832512-6a4c46dc4ee7"),
  },
  {
    icon: "leaf",
    title: "Pollution-Free Environment",
    body: "Breathe fresh air in green surroundings.",
    image: u("1700210326989-7908f6de618f"),
  },
  {
    icon: "speaker-slash",
    title: "Noise-Free Lifestyle",
    body: "Live away from city congestion.",
    image: u("1651678938586-affccc71c270"),
  },
  {
    icon: "tree",
    title: "Landscaped Green Parks",
    body: "Open spaces to unwind in, right outside.",
    image: u("1650874210636-269503e6c2bc"),
  },
  {
    icon: "first-aid",
    title: "Hospitals Nearby",
    body: "Healthcare stays within easy reach.",
    image: u("1758292109543-a5c7f0c4cb9b"),
  },
  {
    icon: "graduation-cap",
    title: "Schools & Daily Essentials",
    body: "Everything you need is close by.",
    image: u("1780504863787-2b42d4f260d9"),
  },
  {
    icon: "gate",
    title: "Premium Gated Community",
    body: "Enjoy exclusive living, with privacy.",
    image: u("1660406703725-79152d5a8ff8"),
  },
  {
    icon: "shield-check",
    title: "24x7 Security",
    body: "Your safety is looked after, always.",
    image: u("1589935447067-5531094415d1"),
  },
  {
    icon: "lightning",
    title: "Electricity Available",
    body: "Power stays on, uninterrupted.",
    image: u("1552965734-5b9e868808b6"),
  },
  {
    icon: "buildings",
    title: "Residential & Commercial Plots",
    body: "Build your dream investment here.",
    image: u("1640282898962-42bc714de660"),
  },
  {
    icon: "trend-up",
    title: "High Future Appreciation",
    body: "Invest today, grow with tomorrow.",
    image: u("1708064235942-03d8a4fbbeef"),
  },
];

export type Amenity = {
  code: string;
  title: string;
  body: string;
  icon:
    | "baby"
    | "footprints"
    | "personArmchair"
    | "flowerLotus"
    | "waves"
    | "cookingPot"
    | "fish"
    | "basketball"
    | "martini"
    | "houseLine"
    | "barbell";
  image?: keyof typeof galleryImages;
  video?: string;
};

// The player.cloudinary.com iframe embed leaves a bare, src-less <video> in
// its initial HTML until its own JS loads and swaps a real source in — a
// second layer of third-party JS to depend on, nested inside our own
// GSAP-transformed card. The direct delivery URL is a real, immediately
// playable video file, so a native <video> tag here is far more reliable.
const cldVideo = (publicId: string) =>
  `https://res.cloudinary.com/eranwpa1/video/upload/f_mp4/${publicId}.mp4`;

export const amenities: Amenity[] = [
  {
    code: "01",
    title: "Seating & Nursery",
    body: "A shaded corner to sit and let the day slow down.",
    icon: "baby",
    image: "seatingNursery",
  },
  {
    code: "02",
    title: "Bare Feet Sensory Path",
    body: "Walk it barefoot, morning or evening.",
    icon: "footprints",
    video: cldVideo("Initial_Scene_-_2026-08-24_202608250253"),
  },
  {
    code: "03",
    title: "Senior Citizen Deck",
    body: "A quiet, shaded stretch built for slower mornings.",
    icon: "personArmchair",
    video: cldVideo("Initial_Scene_-_2026-08-24_202608250230"),
  },
  {
    code: "04",
    title: "Orchid Garden",
    body: "A pocket of colour you'll want to walk through daily.",
    icon: "flowerLotus",
    video: cldVideo("Initial_Scene_-_2026-08-24_202608250115"),
  },
  {
    code: "05",
    title: "Lake Area with Fountain",
    body: "The heart of the campus, for evening adda by the water.",
    icon: "waves",
    image: "lake",
  },
  {
    code: "06",
    title: "Sitting Deck with BBQ Zone",
    body: "Bring the evening adda outdoors.",
    icon: "cookingPot",
    image: "bbqDeck",
  },
  {
    code: "07",
    title: "Fishing Deck",
    body: "Cast a line without leaving home.",
    icon: "fish",
    image: "fishingDeck",
  },
  {
    code: "08",
    title: "Multi Sport Court",
    body: "An open court for evenings that need a little competition.",
    icon: "basketball",
    image: "sportsCourt",
  },
  {
    code: "09",
    title: "Club House with Fountain",
    body: "Where the evenings gather, by the water.",
    icon: "martini",
    image: "clubHouseFountain",
  },
  {
    code: "10",
    title: "Club House",
    body: "Your own space to host, meet and celebrate Pujo with the neighbourhood.",
    icon: "houseLine",
    image: "clubHouse",
  },
  {
    code: "11",
    title: "Club House with AC Gym",
    body: "Train indoors, in comfort, any time of day.",
    icon: "barbell",
    image: "clubhouse",
  },
];

export type LocationIcon =
  | "bank"
  | "college"
  | "academy"
  | "bazar"
  | "hospital"
  | "factory"
  | "bypass"
  | "railway"
  | "junction"
  | "metro";

export type LocationItem = {
  category: "Banking" | "Education" | "Market" | "Healthcare" | "Transit";
  name: string;
  distance: string;
  icon: LocationIcon;
};

export const locationItems: LocationItem[] = [
  { category: "Banking", name: "ICICI Bank", distance: "0.5 km", icon: "bank" },
  {
    category: "Education",
    name: "Tapna More / D.C. & A.J. Academy S.E. College",
    distance: "1 km",
    icon: "college",
  },
  { category: "Market", name: "Belapur Bazar", distance: "1 km", icon: "bazar" },
  { category: "Healthcare", name: "Baruipur Hospital", distance: "2 km", icon: "hospital" },
  { category: "Transit", name: "Biplab Railway Factory", distance: "2 km", icon: "factory" },
  { category: "Education", name: "G.M.I.T. Engineering College", distance: "4 km", icon: "college" },
  { category: "Education", name: "Tele Academy", distance: "3.5 km", icon: "academy" },
  { category: "Transit", name: "Baruipur Bypass", distance: "6 km", icon: "bypass" },
  { category: "Transit", name: "Baruipur Station", distance: "7 km", icon: "railway" },
  { category: "Transit", name: "Amtala More", distance: "8 km", icon: "junction" },
  { category: "Transit", name: "Tollygunge Metro Station", distance: "15 km", icon: "metro" },
];

export const faqs = [
  {
    q: "Which is the closest metro station to Mrityika Shantiban City?",
    a: "Tollygunge Metro Station, about 15 km away, is the closest today. A new metro station is also planned within 5 years, much closer to the project.",
  },
  {
    q: "Are there any hospitals near Mrityika Shantiban City?",
    a: "Baruipur Sub Division Hospital, Sevatirtham Nursing Home and ESIC Center are all close by.",
  },
  {
    q: "How many residential projects are there in Baruipur, Kolkata South?",
    a: "You'll find 28 projects under construction in this locality, around 35 already ready, and 10 new options if you're still comparing.",
  },
  {
    q: "Where is Mrityika Shantiban City situated?",
    a: "In Tapna, Baruipur, Kolkata South, roughly 20 km from central Kolkata.",
  },
  {
    q: "What is the possession status of Mrityika Shantiban City?",
    a: "Ready to Move, so you can move in as soon as you're ready. Several homeowners already have.",
  },
  {
    q: "What is the name of the builder constructing this project?",
    a: "Mrityika Realters.",
  },
  {
    q: "How are the reviews for Mrityika Shantiban City's location?",
    a: "This locality holds a 4.0 out of 5 rating, based on 34 reviews from property owners, tenants and buyers like you.",
  },
  {
    q: "Is Mrityika Shantiban City well connected to nearby areas?",
    a: "Yes, through the Baruipur Bypass, with easy access to schools, markets, banks and hospitals.",
  },
];
