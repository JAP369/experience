/**
 * Experience - Hong Kong Event Platform
 * Database Types and Interfaces
 * 
 * These types define the core data models for the platform.
 * Designed for Supabase/PostgreSQL backend.
 */

// =============================================================================
// ENUMS & TYPE UNIONS
// =============================================================================

/**
 * Venue types available on the platform
 */
export enum VenueType {
  Nightclub = "Nightclub",
  Bar = "Bar",
  Hotel = "Hotel",
  Stadium = "Stadium",
  PrivateDining = "Private Dining",
}

/**
 * Hong Kong districts where venues are located
 * Restricted to major commercial and entertainment districts
 */
export type HK_District =
  | "Central"
  | "Lan Kwai Fong"
  | "Tsim Sha Tsui"
  | "Causeway Bay"
  | "Admiralty"
  | "Wan Chai"
  | "Kwun Tong";

/**
 * Price tier classification for venues
 * 1 = Budget-friendly, 4 = Ultra-luxury
 */
export type PriceTier = 1 | 2 | 3 | 4;

/**
 * Corporate event types offered on the platform
 */
export enum EventType {
  ProductLaunch = "Product Launch",
  AnnualDinner = "Annual Dinner",
  Networking = "Networking",
  Conference = "Conference",
  TeamBuilding = "Team Building",
  Gala = "Gala",
  Wedding = "Wedding",
  PrivateParty = "Private Party",
}

/**
 * Status tracking for corporate inquiries/bookings
 */
export enum InquiryStatus {
  Pending = "Pending",
  Approved = "Approved",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

// =============================================================================
// CORE INTERFACES
// =============================================================================

/**
 * Venue interface representing event spaces in Hong Kong
 */
export interface Venue {
  /** Unique identifier (UUID) */
  id: string;
  /** Venue display name */
  name: string;
  /** Type of venue */
  type: VenueType;
  /** Maximum guest capacity */
  capacity: number;
  /** Price tier (1-4, where 4 is most expensive) */
  price_tier: PriceTier;
  /** Array of image URLs for the venue */
  images: string[];
  /** Detailed description of the venue */
  description: string;
  /** Hong Kong district location */
  district: HK_District;
  /** Street address */
  address: string;
  /** Contact phone number */
  phone?: string;
  /** Contact email */
  email?: string;
  /** Array of amenities offered */
  amenities?: string[];
  /** Average rating (0-5) */
  rating?: number;
  /** Whether the venue is currently available */
  is_available?: boolean;
  /** Timestamp when venue was added */
  created_at?: string;
  /** Timestamp of last update */
  updated_at?: string;
}

/**
 * Corporate inquiry/booking request
 */
export interface CorporateInquiry {
  /** Unique identifier (UUID) */
  id: string;
  /** User who submitted the inquiry (references auth.users) */
  user_id: string;
  /** Venue being inquired about (references venues) */
  venue_id: string;
  /** Proposed date for the event */
  event_date: string;
  /** Expected number of guests */
  guest_count: number;
  /** Type of corporate event */
  event_type: EventType;
  /** Current status of the inquiry */
  status: InquiryStatus;
  /** Additional notes or special requirements */
  notes?: string;
  /** Contact person name */
  contact_name?: string;
  /** Contact person email */
  contact_email?: string;
  /** Contact person phone */
  contact_phone?: string;
  /** Estimated budget */
  budget?: number;
  /** Timestamp when inquiry was created */
  created_at?: string;
  /** Timestamp of last status update */
  updated_at?: string;
}

/**
 * User profile interface (extends Supabase auth.users)
 */
export interface UserProfile {
  /** Unique identifier (matches auth.users.id) */
  id: string;
  /** User's display name */
  full_name: string;
  /** User's email address */
  email: string;
  /** User's phone number */
  phone?: string;
  /** Company name */
  company?: string;
  /** User role */
  role: "user" | "admin" | "venue_manager";
  /** Timestamp when profile was created */
  created_at?: string;
  /** Timestamp of last update */
  updated_at?: string;
}

// =============================================================================
// HELPER TYPES
// =============================================================================

/**
 * Venue filter options for search functionality
 */
export interface VenueFilters {
  district?: HK_District;
  type?: VenueType;
  min_capacity?: number;
  max_capacity?: number;
  price_tier?: PriceTier;
  is_available?: boolean;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * All available Hong Kong districts
 */
export const HK_DISTRICTS: HK_District[] = [
  "Central",
  "Lan Kwai Fong",
  "Tsim Sha Tsui",
  "Causeway Bay",
  "Admiralty",
  "Wan Chai",
  "Kwun Tong",
];

/**
 * All venue types
 */
export const VENUE_TYPES: VenueType[] = Object.values(VenueType);

/**
 * All event types
 */
export const EVENT_TYPES: EventType[] = Object.values(EventType);

/**
 * Price tier labels for display
 */
export const PRICE_TIER_LABELS: Record<PriceTier, string> = {
  1: "$$",
  2: "$$$",
  3: "$$$$",
  4: "$$$$$",
};

/**
 * Price tier descriptions
 */
export const PRICE_TIER_DESCRIPTIONS: Record<PriceTier, string> = {
  1: "Budget-friendly options",
  2: "Mid-range venues",
  3: "Premium venues",
  4: "Ultra-luxury exclusive venues",
};
