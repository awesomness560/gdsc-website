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

export interface CreateEventData {
  name: string;
  description?: string;
  image_url?: string;
  location: string;
  date: string; // YYYY-MM-DD format
  start_time: string; // HH:MM format
  end_time?: string; // HH:MM format
  max_capacity: number;
  event_type: string;
  status?: EventStatus; // Added for editing mode
  allow_anonymous_rsvp: boolean;
  rsvp_limit_per_ip: number;
  hosts?: EventHost[];
  links?: CreateEventLink[];
}

export interface EventHost {
  person_id: string;
  host_role?: string;
}

export interface CreateEventLink {
  title: string;
  description?: string;
  url: string;
  link_type: "resource" | "slide" | "code" | "download" | "general";
  display_order?: number;
  show_for_status?: EventStatus[];
}

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
}

export interface EventFormData {
  // Basic event info
  name: string;
  description: string;
  image_url: string;
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: string; // String for form handling, converted to number
  event_type: string;
  status: string; // Added for editing mode

  // RSVP settings
  allow_anonymous_rsvp: boolean;
  rsvp_limit_per_ip: string; // String for form handling, converted to number

  // Hosts and links
  hosts: EventHost[];
  links: CreateEventLink[];
}

export interface EventTypeOption {
  value: string;
  label: string;
  description: string;
}

export interface LinkTypeOption {
  value: "resource" | "slide" | "code" | "download" | "general";
  label: string;
  description: string;
}

// Default event types for the dropdown
export const EVENT_TYPES: EventTypeOption[] = [
  {
    value: "workshop",
    label: "Workshop",
    description: "Hands-on learning session",
  },
  {
    value: "seminar",
    label: "Seminar",
    description: "Educational presentation",
  },
  {
    value: "hackathon",
    label: "Hackathon",
    description: "Coding competition event",
  },
  {
    value: "networking",
    label: "Networking",
    description: "Professional networking event",
  },
  {
    value: "social",
    label: "Social Event",
    description: "Community building activity",
  },
  {
    value: "competition",
    label: "Competition",
    description: "Skills-based contest",
  },
  {
    value: "meeting",
    label: "Meeting",
    description: "General club meeting",
  },
  {
    value: "other",
    label: "Other",
    description: "Custom event type",
  },
];

// Link types for event resources
export const LINK_TYPES: LinkTypeOption[] = [
  {
    value: "resource",
    label: "Resource",
    description: "General learning materials",
  },
  {
    value: "slide",
    label: "Slides",
    description: "Presentation slides",
  },
  {
    value: "code",
    label: "Code",
    description: "Source code repository",
  },
  {
    value: "download",
    label: "Download",
    description: "Downloadable files",
  },
  {
    value: "general",
    label: "General Link",
    description: "Any other type of link",
  },
];
