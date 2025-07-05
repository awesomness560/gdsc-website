export type EventStatus = "upcoming" | "ongoing" | "past";
export type EventType = "workshop" | "tech_talk" | "hackathon" | "networking";
export type RSVPStatus = "attending" | "cancelled";
export type LinkType = "resource" | "slide" | "code" | "download" | "general";

export interface Person {
  id: string;
  name: string;
  role: string;
  image_url?: string;
  major?: string;
  year?: string;
  committee?: string;
  specialties?: string[];
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface EventHost extends Person {
  host_role?: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  location: string;
  date: string;
  start_time: string;
  end_time?: string;
  max_capacity: number;
  status: EventStatus;
  event_type: EventType;
  allow_anonymous_rsvp: boolean;
  rsvp_limit_per_ip: number;
  created_at: string;
  updated_at: string;
}

export interface EventWithRSVPCount extends Event {
  rsvp_count: number;
}

export interface EventWithHosts extends Event {
  hosts: EventHost[];
}

export interface EventDetails extends Event {
  rsvp_count: number;
  hosts: EventHost[];
}

export interface EventLink {
  id: string;
  event_id: string;
  title: string;
  description?: string;
  url: string;
  link_type: LinkType;
  display_order: number;
  show_for_status: string[];
  created_at: string;
}

export interface EventRSVP {
  id: string;
  event_id: string;
  browser_fingerprint: string;
  ip_address?: string;
  user_agent?: string;
  status: RSVPStatus;
  rsvp_date: string;
}

// API Response types
export interface EventsResponse {
  data: EventWithRSVPCount[] | null;
  error: any;
}

export interface EventDetailsResponse {
  data: EventDetails | null;
  error: any;
}

export interface EventLinksResponse {
  data: EventLink[] | null;
  error: any;
}

// Filter and pagination types
export interface EventFilters {
  status?: EventStatus | "all";
  event_type?: EventType;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
