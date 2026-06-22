/**
 * Experience - Hong Kong Event Platform
 * Dummy Venue Data
 * 
 * Sample luxury venues in Hong Kong for UI development.
 * Replace with actual Supabase data when connecting to backend.
 */

import { Venue, VenueType, HK_District, PriceTier } from "@/types/database";

/**
 * Sample luxury venues in Hong Kong
 * Images from Unsplash for development purposes
 */
export const DUMMY_VENUES: Venue[] = [
  {
    id: "venue-001",
    name: "Azure Rooftop Lounge",
    type: VenueType.Bar,
    capacity: 120,
    price_tier: 4,
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Perched atop one of Central's most prestigious towers, Azure Rooftop Lounge offers an unparalleled 360-degree view of Victoria Harbour. This ultra-luxury venue features a stunning infinity pool, private VIP sections, and a world-class mixology program. Perfect for exclusive product launches, intimate networking events, and sophisticated soirees.",
    district: "Central",
    address: "48/F, International Finance Centre, 1 Harbour View Street, Central",
    phone: "+852 2123 4567",
    email: "events@azure-hk.com",
    amenities: [
      "360° Harbour Views",
      "Infinity Pool",
      "Private VIP Rooms",
      "Dedicated Mixologist",
      "Valet Parking",
      "High-Speed WiFi",
      "AV Equipment",
      "Cloakroom Service",
    ],
    rating: 4.9,
    is_available: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-03-20T14:30:00Z",
  },
  {
    id: "venue-002",
    name: "The Grand Ballroom at Peninsula",
    type: VenueType.Hotel,
    capacity: 500,
    price_tier: 4,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "The legendary Peninsula Hong Kong presents its magnificent Grand Ballroom, a timeless venue for the most prestigious events. Featuring soaring ceilings adorned with crystal chandeliers, state-of-the-art lighting, and impeccable five-star service. Ideal for annual dinners, galas, and grand celebrations that demand nothing but the best.",
    district: "Tsim Sha Tsui",
    address: "Salisbury Road, Tsim Sha Tsui, Kowloon",
    phone: "+852 2920 2888",
    email: "events@peninsula.com",
    amenities: [
      "Crystal Chandeliers",
      "Grand Piano",
      "Bridal Suite",
      "In-House Catering",
      "Event Planning Service",
      "Valet Parking",
      "Security Personnel",
      "Wheelchair Accessible",
    ],
    rating: 5.0,
    is_available: true,
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-03-18T11:00:00Z",
  },
  {
    id: "venue-003",
    name: "Neon Garden Club",
    type: VenueType.Nightclub,
    capacity: 300,
    price_tier: 3,
    images: [
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Step into the electric atmosphere of Neon Garden Club, Lan Kwai Fong's most iconic nightlife destination. This multi-level venue combines cutting-edge sound systems, immersive LED installations, and world-renowned DJ lineups. Perfect for product launches, after-parties, and corporate celebrations that extend into the early hours.",
    district: "Lan Kwai Fong",
    address: "33 Wyndham Street, Lan Kwai Fong, Central",
    phone: "+852 2523 7890",
    email: "bookings@neongarden.hk",
    amenities: [
      " State-of-the-Art Sound System",
      "LED Wall Installations",
      "VIP Booths",
      "Dedicated Entrance",
      "Full Bar Service",
      "Coat Check",
      "Professional Lighting",
      "Backline Equipment",
    ],
    rating: 4.7,
    is_available: true,
    created_at: "2024-02-01T14:00:00Z",
    updated_at: "2024-03-22T16:45:00Z",
  },
  {
    id: "venue-004",
    name: "Harbour View Private Dining",
    type: VenueType.PrivateDining,
    capacity: 40,
    price_tier: 4,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "An intimate culinary sanctuary overlooking the glittering waters of Victoria Harbour. Our private dining room offers an exclusive setting for executive dinners, board meetings, and milestone celebrations. Curated menus by Michelin-starred chefs, personalized wine pairings, and impeccable service define this extraordinary venue.",
    district: "Admiralty",
    address: "Level 3, Two International Finance Centre, 8 Finance Street",
    phone: "+852 2801 8888",
    email: "privatedining@harbourview.hk",
    amenities: [
      "Michelin-Starred Chef",
      "Wine Cellar",
      "Private Entrance",
      "Dedicated Server",
      "Harbour Views",
      "WiFi",
      "Conference Facilities",
      "Wheelchair Accessible",
    ],
    rating: 4.8,
    is_available: true,
    created_at: "2024-01-20T11:30:00Z",
    updated_at: "2024-03-15T09:20:00Z",
  },
  {
    id: "venue-005",
    name: "The Star Lounge Causeway Bay",
    type: VenueType.Bar,
    capacity: 80,
    price_tier: 2,
    images: [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Nestled in the heart of Causeway Bay, The Star Lounge offers a sophisticated yet approachable venue for corporate gatherings. With its warm ambiance, craft cocktail menu, and flexible layout, it's ideal for team building events, networking sessions, and casual client entertainment. A hidden gem that balances elegance with accessibility.",
    district: "Causeway Bay",
    address: "22/F, Hysan Place, 500 Hennessy Road, Causeway Bay",
    phone: "+852 2890 1234",
    email: "info@starlounge.hk",
    amenities: [
      "Craft Cocktail Bar",
      "Flexible Layout",
      "Street-Level Access",
      "TV Screens",
      "WiFi",
      "Happy Hour Packages",
      "Semi-Private Area",
      "Bite Menu Available",
    ],
    rating: 4.5,
    is_available: true,
    created_at: "2024-02-10T10:00:00Z",
    updated_at: "2024-03-10T13:15:00Z",
  },
  {
    id: "venue-006",
    name: "Victoria Stadium Arena",
    type: VenueType.Stadium,
    capacity: 2000,
    price_tier: 4,
    images: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1561526854-0cb14d9d6b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Hong Kong's premier large-scale event venue, Victoria Stadium Arena is designed for grand corporate conferences, product launches, and company-wide celebrations. Featuring retractable seating, world-class acoustics, and cutting-edge production capabilities, this iconic venue transforms to accommodate events of any scale.",
    district: "Wan Chai",
    address: "1 Sports Road, Happy Valley, Wan Chai",
    phone: "+852 2890 6888",
    email: "events@victoriastadium.hk",
    amenities: [
      "Retractable Seating",
      "Full Production Setup",
      "Broadcast Facilities",
      "Parking for 500+",
      "Multiple Entry Points",
      "Catering Facilities",
      "VIP Boxes",
      "Backstage Areas",
    ],
    rating: 4.9,
    is_available: true,
    created_at: "2024-01-05T08:00:00Z",
    updated_at: "2024-03-25T10:00:00Z",
  },
  {
    id: "venue-007",
    name: "Kwun Tong Industrial Loft",
    type: VenueType.PrivateDining,
    capacity: 150,
    price_tier: 2,
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "A transformed industrial space in the heart of Kwun Tong's creative district. This raw, urban-chic venue features exposed brick walls, soaring ceilings, and an open floor plan perfect for creative brainstorming sessions, startup events, and trendy product reveals. The blank canvas allows for complete customization.",
    district: "Kwun Tong",
    address: "77 Hoi Yuen Road, Kwun Tong",
    phone: "+852 2345 6789",
    email: "hello@industrialoft.hk",
    amenities: [
      "Open Floor Plan",
      "Exposed Brick Walls",
      "Flexible Furniture",
      "Street Art Installations",
      "Parking Available",
      "Loading Dock",
      "Basic AV Setup",
      "BYO Catering Allowed",
    ],
    rating: 4.4,
    is_available: true,
    created_at: "2024-02-15T15:00:00Z",
    updated_at: "2024-03-19T12:30:00Z",
  },
  {
    id: "venue-008",
    name: "Skyline Penthouse Wan Chai",
    type: VenueType.Hotel,
    capacity: 200,
    price_tier: 3,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Elevate your events at Skyline Penthouse, a luxurious rooftop venue offering panoramic views of Hong Kong's iconic skyline. This versatile space seamlessly transitions from intimate cocktail receptions to lively celebrations. With a retractable roof and premium amenities, it's the perfect blend of indoor comfort and outdoor ambiance.",
    district: "Wan Chai",
    address: "18th Floor, Convention Plaza, 1 Harbour Road, Wan Chai",
    phone: "+852 2802 3333",
    email: "penthouse@skyline.hk",
    amenities: [
      "Panoramic Skyline Views",
      "Retractable Roof",
      "Outdoor Terrace",
      "Built-in Bar",
      "Dance Floor",
      "WiFi",
      "AV Equipment",
      "Dedicated Event Coordinator",
    ],
    rating: 4.7,
    is_available: true,
    created_at: "2024-01-25T12:00:00Z",
    updated_at: "2024-03-21T14:00:00Z",
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get venues filtered by district
 */
export function getVenuesByDistrict(district: HK_District): Venue[] {
  return DUMMY_VENUES.filter((venue) => venue.district === district);
}

/**
 * Get venues filtered by type
 */
export function getVenuesByType(type: VenueType): Venue[] {
  return DUMMY_VENUES.filter((venue) => venue.type === type);
}

/**
 * Get venues filtered by price tier
 */
export function getVenuesByPriceTier(price_tier: PriceTier): Venue[] {
  return DUMMY_VENUES.filter((venue) => venue.price_tier === price_tier);
}

/**
 * Get venues within a capacity range
 */
export function getVenuesByCapacity(min: number, max: number): Venue[] {
  return DUMMY_VENUES.filter(
    (venue) => venue.capacity >= min && venue.capacity <= max
  );
}

/**
 * Get a venue by its ID
 */
export function getVenueById(id: string): Venue | undefined {
  return DUMMY_VENUES.find((venue) => venue.id === id);
}

/**
 * Get featured venues (top-rated, available)
 */
export function getFeaturedVenues(limit: number = 4): Venue[] {
  return DUMMY_VENUES.filter((venue) => venue.is_available).slice(0, limit);
}

/**
 * Get all available districts with venue counts
 */
export function getDistrictsWithCounts(): { district: HK_District; count: number }[] {
  const districts: HK_District[] = [
    "Central",
    "Lan Kwai Fong",
    "Tsim Sha Tsui",
    "Causeway Bay",
    "Admiralty",
    "Wan Chai",
    "Kwun Tong",
  ];

  return districts.map((district) => ({
    district,
    count: DUMMY_VENUES.filter((venue) => venue.district === district).length,
  }));
}
