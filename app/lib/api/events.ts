import type {
  Event,
  EventWithRSVPCount,
  EventDetails,
  EventLink,
  EventFilters,
  PaginationParams,
  EventStatus,
} from "~/types/events";
import { supabase } from "../supabase";

/**
 * Fetch events with RSVP counts and optional filtering
 */
export async function getEvents(
  filters: EventFilters = {},
  pagination: PaginationParams = {},
) {
  const { status = "all", event_type, search } = filters;
  const { page = 1, limit = 20 } = pagination;

  let query = supabase.from("events_with_rsvp_count").select("*");

  // Apply status filter
  if (status !== "all") {
    query = query.eq("status", status);
  }

  // Apply event type filter
  if (event_type) {
    query = query.eq("event_type", event_type);
  }

  // Apply search filter (searches name and description)
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  // Order by date (upcoming first, then by date ascending, past events by date descending)
  query = query.order("date", { ascending: status !== "past" });

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return {
    events: data as EventWithRSVPCount[],
    totalCount: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

/**
 * Fetch events grouped by status for the main events page
 */
export async function getEventsByStatus() {
  const { data, error } = await supabase
    .from("events_with_rsvp_count")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch events by status: ${error.message}`);
  }

  // Group events by status
  const groupedEvents = {
    upcoming: [] as EventWithRSVPCount[],
    ongoing: [] as EventWithRSVPCount[],
    past: [] as EventWithRSVPCount[],
  };

  data?.forEach((event: EventWithRSVPCount) => {
    groupedEvents[event.status].push(event);
  });

  // Sort past events by date descending (most recent first)
  groupedEvents.past.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return groupedEvents;
}

/**
 * Fetch a single event with full details including hosts
 */
export async function getEventDetails(eventId: string) {
  const { data, error } = await supabase
    .from("event_details")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch event details: ${error.message}`);
  }

  return data as EventDetails;
}

/**
 * Fetch event links based on current status
 */
export async function getEventLinks(
  eventId: string,
  currentStatus: EventStatus,
) {
  const { data, error } = await supabase
    .from("event_links")
    .select("*")
    .eq("event_id", eventId)
    .contains("show_for_status", [currentStatus])
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch event links: ${error.message}`);
  }

  return data as EventLink[];
}

/**
 * Check if user has already RSVPed for an event
 */
export async function checkExistingRSVP(eventId: string, fingerprint: string) {
  const { data, error } = await supabase
    .from("event_rsvps")
    .select("id, status")
    .eq("event_id", eventId)
    .eq("browser_fingerprint", fingerprint)
    .eq("status", "attending")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to check existing RSVP: ${error.message}`);
  }

  return !!data;
}

/**
 * Add or update RSVP for an event
 */
export async function toggleEventRSVP(
  eventId: string,
  fingerprint: string,
  ipAddress?: string,
  userAgent?: string,
) {
  // First check if RSVP already exists
  const { data: existingRSVP } = await supabase
    .from("event_rsvps")
    .select("id, status")
    .eq("event_id", eventId)
    .eq("browser_fingerprint", fingerprint)
    .maybeSingle();

  if (existingRSVP) {
    // Toggle existing RSVP
    const newStatus =
      existingRSVP.status === "attending" ? "cancelled" : "attending";

    const { error } = await supabase
      .from("event_rsvps")
      .update({
        status: newStatus,
        rsvp_date: new Date().toISOString(),
      })
      .eq("id", existingRSVP.id);

    if (error) {
      throw new Error(`Failed to update RSVP: ${error.message}`);
    }

    return newStatus === "attending";
  } else {
    // Create new RSVP
    const { error } = await supabase.from("event_rsvps").insert({
      event_id: eventId,
      browser_fingerprint: fingerprint,
      ip_address: ipAddress,
      user_agent: userAgent,
      status: "attending",
    });

    if (error) {
      throw new Error(`Failed to create RSVP: ${error.message}`);
    }

    return true;
  }
}

/**
 * Get current RSVP count for an event (real-time)
 */
export async function getEventRSVPCount(eventId: string) {
  const { count, error } = await supabase
    .from("event_rsvps")
    .select("*", { count: "exact", head: true })
    .eq("event_id", eventId)
    .eq("status", "attending");

  if (error) {
    throw new Error(`Failed to fetch RSVP count: ${error.message}`);
  }

  return count || 0;
}
