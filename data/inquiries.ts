/**
 * Experience - Hong Kong Event Platform
 * Dummy Corporate Inquiry Data
 * 
 * Sample corporate inquiries for UI development.
 * Replace with actual Supabase data when connecting to backend.
 */

import {
  CorporateInquiry,
  EventType,
  InquiryStatus,
} from "@/types/database";

/**
 * Sample corporate inquiries
 */
export const DUMMY_INQUIRIES: CorporateInquiry[] = [
  {
    id: "inquiry-001",
    user_id: "user-001",
    venue_id: "venue-001",
    event_date: "2024-06-15",
    guest_count: 80,
    event_type: EventType.ProductLaunch,
    status: InquiryStatus.Pending,
    notes: "Looking for a venue to launch our new luxury watch collection. Requires AV setup for product displays and champagne reception area.",
    contact_name: "Sarah Chen",
    contact_email: "sarah.chen@luxurybrand.hk",
    contact_phone: "+852 9123 4567",
    budget: 150000,
    created_at: "2024-03-20T10:30:00Z",
    updated_at: "2024-03-20T10:30:00Z",
  },
  {
    id: "inquiry-002",
    user_id: "user-002",
    venue_id: "venue-002",
    event_date: "2024-07-20",
    guest_count: 350,
    event_type: EventType.AnnualDinner,
    status: InquiryStatus.Approved,
    notes: "Annual company dinner for 350 guests. Requires stage for awards ceremony and live band setup.",
    contact_name: "Michael Wong",
    contact_email: "m.wong@financegroup.hk",
    contact_phone: "+852 9234 5678",
    budget: 500000,
    created_at: "2024-03-15T14:00:00Z",
    updated_at: "2024-03-18T09:15:00Z",
  },
  {
    id: "inquiry-003",
    user_id: "user-003",
    venue_id: "venue-003",
    event_date: "2024-05-10",
    guest_count: 200,
    event_type: EventType.Networking,
    status: InquiryStatus.Completed,
    notes: "Post-conference networking event for tech industry professionals. DJ and cocktail service required.",
    contact_name: "Emily Lau",
    contact_email: "emily@techconnect.hk",
    contact_phone: "+852 9345 6789",
    budget: 80000,
    created_at: "2024-02-28T11:00:00Z",
    updated_at: "2024-05-11T08:00:00Z",
  },
  {
    id: "inquiry-004",
    user_id: "user-004",
    venue_id: "venue-004",
    event_date: "2024-04-25",
    guest_count: 24,
    event_type: EventType.Conference,
    status: InquiryStatus.Approved,
    notes: "Executive board meeting followed by private dinner. Requires conference facilities and private dining room.",
    contact_name: "David Zhang",
    contact_email: "d.zhang@investment.hk",
    contact_phone: "+852 9456 7890",
    budget: 60000,
    created_at: "2024-03-10T16:45:00Z",
    updated_at: "2024-03-12T10:30:00Z",
  },
  {
    id: "inquiry-005",
    user_id: "user-005",
    venue_id: "venue-006",
    event_date: "2024-08-05",
    guest_count: 1500,
    event_type: EventType.Conference,
    status: InquiryStatus.Pending,
    notes: "Annual company-wide conference. Requires main stage, breakout rooms, and catering for full day event.",
    contact_name: "Jennifer Liu",
    contact_email: "j.liu@megacorp.hk",
    contact_phone: "+852 9567 8901",
    budget: 800000,
    created_at: "2024-03-22T09:00:00Z",
    updated_at: "2024-03-22T09:00:00Z",
  },
  {
    id: "inquiry-006",
    user_id: "user-006",
    venue_id: "venue-005",
    event_date: "2024-04-12",
    guest_count: 50,
    event_type: EventType.TeamBuilding,
    status: InquiryStatus.Completed,
    notes: "Quarterly team building event. Casual atmosphere preferred with space for activities and networking.",
    contact_name: "Alex Tsang",
    contact_email: "a.tsang@startup.hk",
    contact_phone: "+852 9678 9012",
    budget: 25000,
    created_at: "2024-03-01T13:20:00Z",
    updated_at: "2024-04-13T17:00:00Z",
  },
  {
    id: "inquiry-007",
    user_id: "user-007",
    venue_id: "venue-008",
    event_date: "2024-09-18",
    guest_count: 150,
    event_type: EventType.Gala,
    status: InquiryStatus.Pending,
    notes: "Charity gala dinner. Requires elegant setup, auction area, and space for live entertainment.",
    contact_name: "Rachel Ho",
    contact_email: "r.ho@charityfoundation.hk",
    contact_phone: "+852 9789 0123",
    budget: 300000,
    created_at: "2024-03-25T15:30:00Z",
    updated_at: "2024-03-25T15:30:00Z",
  },
  {
    id: "inquiry-008",
    user_id: "user-008",
    venue_id: "venue-007",
    event_date: "2024-05-22",
    guest_count: 100,
    event_type: EventType.PrivateParty,
    status: InquiryStatus.Cancelled,
    notes: "Company anniversary celebration. Client decided to postpone to later in the year.",
    contact_name: "Kevin Yip",
    contact_email: "k.yip@creativeagency.hk",
    contact_phone: "+852 9890 1234",
    budget: 45000,
    created_at: "2024-03-05T10:00:00Z",
    updated_at: "2024-03-20T14:00:00Z",
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get inquiries by status
 */
export function getInquiriesByStatus(status: InquiryStatus): CorporateInquiry[] {
  return DUMMY_INQUIRIES.filter((inquiry) => inquiry.status === status);
}

/**
 * Get inquiries by user ID
 */
export function getInquiriesByUserId(user_id: string): CorporateInquiry[] {
  return DUMMY_INQUIRIES.filter((inquiry) => inquiry.user_id === user_id);
}

/**
 * Get inquiries by venue ID
 */
export function getInquiriesByVenueId(venue_id: string): CorporateInquiry[] {
  return DUMMY_INQUIRIES.filter((inquiry) => inquiry.venue_id === venue_id);
}

/**
 * Get inquiries by event type
 */
export function getInquiriesByType(event_type: EventType): CorporateInquiry[] {
  return DUMMY_INQUIRIES.filter((inquiry) => inquiry.event_type === event_type);
}

/**
 * Get an inquiry by its ID
 */
export function getInquiryById(id: string): CorporateInquiry | undefined {
  return DUMMY_INQUIRIES.find((inquiry) => inquiry.id === id);
}

/**
 * Get inquiries within a date range
 */
export function getInquiriesByDateRange(
  startDate: string,
  endDate: string
): CorporateInquiry[] {
  return DUMMY_INQUIRIES.filter((inquiry) => {
    const eventDate = new Date(inquiry.event_date);
    return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
  });
}

/**
 * Get inquiry statistics
 */
export function getInquiryStats() {
  const total = DUMMY_INQUIRIES.length;
  const pending = DUMMY_INQUIRIES.filter(
    (i) => i.status === InquiryStatus.Pending
  ).length;
  const approved = DUMMY_INQUIRIES.filter(
    (i) => i.status === InquiryStatus.Approved
  ).length;
  const completed = DUMMY_INQUIRIES.filter(
    (i) => i.status === InquiryStatus.Completed
  ).length;
  const cancelled = DUMMY_INQUIRIES.filter(
    (i) => i.status === InquiryStatus.Cancelled
  ).length;

  return {
    total,
    pending,
    approved,
    completed,
    cancelled,
  };
}
