import { Asset, JournalStory } from './types';

export const ASSETS: Asset[] = [
  {
    id: 'athena-115',
    category: 'yachts',
    name: 'ATHENA 115',
    tagline: 'BEYOND HORIZONS',
    description: 'CURATED OCEAN INFRASTRUCTURE FOR ETERNAL EXPLORATION.',
    serial: '01 / 03',
    indexNum: '01',
    bgImage: '/src/assets/images/yacht_athena_1780933550108.png',
    dimensions: '115M | LURSSEN | 2024',
    priceEstimate: '$265,000,000',
    verifiedHash: '0x3f5c907106e2eaefcfbbdced8cb6894371fa79e218fdcb32df1e513fe9000a12',
    longDescription: 'Athena 115 represents the absolute pinnacle of naval architecture of the 21st century. Engineered specifically for seamless, multi-month deep ocean exploration without port dependency, she marries extreme polar ice class compliance with a masterwork of light, architectural bronze, and raw mineral slab interiors.',
    features: [
      'Helideck with integrated hangar and refueling capabilities',
      'Dual 12m custom limousine tenders crafted in mahogany and carbon fiber',
      'Polar class hull structure capable of extreme latitude transit',
      'Hybrid diesel-electric propulsion with near-silent under-water acoustics',
      '25-meter glass-bottomed internal beach club and multi-level wellness spa'
    ],
    specs: [
      { label: 'Length Overall', value: '115.0 Meters (377.3 ft)' },
      { label: 'Builder & Yard', value: 'Lürssen Yachts, Rendsburg, Germany' },
      { label: 'Year Built', value: '2024 (Custom Delivery)' },
      { label: 'Cruising Range', value: '9,500 Nautical Miles @ 12 knots' },
      { label: 'Gross Tonnage', value: '4,850 GT' },
      { label: 'Beam Overall', value: '18.2 Meters' },
      { label: 'Max Speed', value: '21.5 Knots' },
      { label: 'Guest Capacity', value: '16 VIP Guests in 8 Suites' },
      { label: 'Crew Complement', value: '38 Officers & Crew Members' }
    ]
  },
  {
    id: 'phantom-nova',
    category: 'automobiles',
    name: 'PHANTOM NOVA',
    tagline: 'POWER SCULPTED',
    description: 'MACHINES OF ART, ENGINEERED WITHOUT COMPROMISE.',
    serial: '02 / 03',
    indexNum: '02',
    bgImage: '/src/assets/images/car_phantom_1780933564492.png',
    dimensions: 'ONE-OFF | BESPOKE | 2025',
    priceEstimate: '$2,450,000',
    verifiedHash: '0x7eab207de688bfb02faad832a8debbd3a812cf5ee40939d888ea9da32ffb288a',
    longDescription: 'Created exclusively as a single-commission masterwork, Phantom Nova is the physical manifestation of silent power. Clad in multi-layer Obsidian-infused matte carbon fiber, every single surface has been hand-contoured to smooth out visual drag, creating a flawless sculptural presence.',
    features: [
      'Hand-matched ebony wood marquetry mirroring mountain range contours',
      'Obsidian metallic flakes suspended inside premium self-healing ceramic coating',
      'Dual-throated custom valved exhaust meticulously modeled to echo C major scale tones',
      'Starlight headliner utilizing 2,400 hand-threaded variable fiber-optic stars',
      'On-chain telemetry vault storing engine build blueprints dynamically updated via IPFS'
    ],
    specs: [
      { label: 'Engine', value: '6.75L Twin-Turbocharged V12' },
      { label: 'Power Output', value: '610 bhp / 900 Nm torque' },
      { label: 'Chassis', value: 'Full Aluminum Spaceframe with Carbon Reinforcement' },
      { label: 'Paint Finish', value: 'Bespoke Obsidian Matte Satin Coated' },
      { label: 'Brakes', value: 'Carbon Ceramic Composite Vent-cooling' },
      { label: '0-100 km/h', value: '4.2 Seconds (Electronically Governed)' },
      { label: 'Suspension', value: 'Camera-scanning predictive air suspension system' },
      { label: 'Interior Leather', value: 'Top-grain aniline hides sourced from mountain-raised Alpine bulls' }
    ]
  },
  {
    id: 'elysium-80',
    category: 'yachts',
    name: 'ELYSIUM 80',
    tagline: 'QUIET LUXURY',
    description: 'AN INTIMATE SANCTUARY FOR SHORELESS CONTEMPLATION.',
    serial: '03 / 03',
    indexNum: '03',
    bgImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1200',
    dimensions: '80M | FEADSHIP | 2023',
    priceEstimate: '$145,000,000',
    verifiedHash: '0x992384a8bcda34d588ade88fafade982bb71fd4de029c0defa8839cb8788910d',
    longDescription: 'Specifically structured to navigate remote archipelagos with light ecological impact, Elysium 80 relies entirely on custom high-density fuel cell storage systems alongside classic hybrid diesel engines. Designed with panoramic double-height flush-glazing across the entire saloon.',
    features: [
      'Zero-emission hydrogen fuel-cell battery system for anchoring silence',
      'Fold-out side balconies directly in Master Suite',
      '9-meter infinity pool featuring counter-current swim jets',
      'Onboard micro-filtration water desalination array'
    ],
    specs: [
      { label: 'Length', value: '80.0 Meters (262.4 ft)' },
      { label: 'Yard', value: 'Feadship, Royal Van Lent, Netherlands' },
      { label: 'Year', value: '2023' },
      { label: 'Cruising Range', value: '6,200 Nautical Miles' },
      { label: 'Cruising Speed', value: '14 Knots' }
    ]
  },
  {
    id: 'spectre-luminary',
    category: 'automobiles',
    name: 'SPECTRE LUMINARY',
    tagline: 'ELECTRIC MAJESTY',
    description: 'THE EVOLUTION OF SILENT TRANSIT INTO PURE MODERNISM.',
    serial: '03 / 03',
    indexNum: '03',
    bgImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    dimensions: 'ONE-OFF | BESPOKE | 2024',
    priceEstimate: '$820,000',
    verifiedHash: '0xab67cf89be11ffded78bce009ea83bcad34ef7701e9ea89279dc678bcdaf02f9',
    longDescription: 'The Spectre Luminary combines classic proportions of grand touring luxury with the hyper-instant torque of bespoke electric drivetrains. Styled with high-contrast metallic details, and massive polished billet wheels, it represents the zero-emission visual statement.',
    features: [
      'Dual synchronous motors transmitting all-wheel drive stability',
      'Acoustic multi-layer glass providing class-exclusive -45db ambient cabin silence',
      'Sculpted raw titanium control toggles inside standard steering column',
      'Regenerative coast-and-glide kinetics configured for absolute smoothness'
    ],
    specs: [
      { label: 'Drivetrain', value: 'Dual-motor Permanent Magnet Synchronous AWD' },
      { label: 'Battery Capacity', value: '102 kWh Lithium-Ion Liquid Cooled' },
      { label: 'Power', value: '584 bhp / 430 kW' },
      { label: 'Torque', value: '900 Nm instant torque' },
      { label: 'Electric Range', value: '530 km (WLTP certified)' },
      { label: '0-100 km/h', value: '4.5 Seconds' }
    ]
  }
];

export const STORIES: JournalStory[] = [
  {
    id: 'deep-quietude',
    title: 'The Architecture of Absolute Silence',
    category: 'HYDRODYNAMIC ENGINEERING',
    date: 'MAY 2026',
    readTime: '6 MIN READ',
    summary: 'An investigative exploration into how Lürssen and Thorne hydrodynamicists collaborated to synthesize the near-silent acoustic signature of the Athena 115.',
    content: [
      'Modern mega-yachts are floating systems of massive thermal, electrical, and propulsion energy. Translating these systems into environments of utter tranquility requires addressing noise at the molecular level.',
      'For the Athena 115, designers crafted a custom virtual model of fluid dynamics. By redirecting propeller turbulence and mounting high-vibration powerplants on double-resilient elastic dampers, acoustic transfer into the hull has been effectively minimized.',
      'Our team reached an unprecedented benchmark: an internal acoustic volume of only 38 dB(A) at cruising speed—equivalent to the background murmur of a quiet library in the country.'
    ],
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'exhaust-synthesis',
    title: 'V12 Acoustics: Tuning the C Major Exhaust',
    category: 'ACOUSTIC MARVELS',
    date: 'APRIL 2026',
    readTime: '8 MIN READ',
    summary: 'A look inside the custom exhaust workshop of Thorne Automobiles, where titanium chambers are hand-configured to echo pure chord structures.',
    content: [
      'Exhaust gas exhaust is typically regarded as an architectural byproduct. At Thorne, we see sound as a vital physical expression of power and performance.',
      'We spent fourteen months testing chamber patterns inside the Phantom Nova. Our mission: bypass standard raspy turbo muffle sound and return to the rich, swelling, low-frequency pressure curves resembling historical acoustic compositions.',
      'By sculpting three physical expansion channels with variable electric valves, the exhaust note sounds a flawless tonic third in C major during peak mid-range acceleration.'
    ],
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cryptographic-assets',
    title: 'The Future of Real-World Crypto Portfolios',
    category: 'CRYPTOGRAPHY',
    date: 'MARCH 2026',
    readTime: '5 MIN READ',
    summary: 'Decrypting the smart-contract protocols enabling flawless structural division of tangible real-world luxury assets among high-net-worth circles.',
    content: [
      'The transfer of massive yachts and hyper-cars is traditionally locked behind mountains of broker paper, multi-week escrow audits, and outdated jurisdictional registries.',
      'Thorne introduces the decentralized IPFS registry solution. Every vehicle, hull, and bespoke commission has its legal ownership wrapped into a non-fungible digital cryptographic vault.',
      'This grants members instant global liquidity, absolute provenance clarity, and friction-free asset authentication on-chain.',
      'When your wallet connects to Thorne, your portfolio unlocks immediate authentication credentials, yacht club board accesses, and digital gate keys.'
    ],
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=600'
  }
];
