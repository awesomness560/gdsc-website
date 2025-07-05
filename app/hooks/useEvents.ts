import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEvents,
  getEventsByStatus,
  getEventDetails,
  getEventLinks,
  checkExistingRSVP,
  toggleEventRSVP,
  getEventRSVPCount,
} from "~/lib/api/events";
import type {
  EventFilters,
  PaginationParams,
  EventStatus,
} from "~/types/events";

// Query Keys
export const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  list: (filters: EventFilters, pagination: PaginationParams) =>
    [...eventKeys.lists(), filters, pagination] as const,
  byStatus: () => [...eventKeys.all, "by-status"] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  links: (id: string, status: EventStatus) =>
    [...eventKeys.detail(id), "links", status] as const,
  rsvp: (id: string, fingerprint: string) =>
    [...eventKeys.detail(id), "rsvp", fingerprint] as const,
  rsvpCount: (id: string) => [...eventKeys.detail(id), "rsvp-count"] as const,
};

/**
 * Hook to fetch events with filtering and pagination
 */
export function useEvents(
  filters: EventFilters = {},
  pagination: PaginationParams = {},
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  },
) {
  return useQuery({
    queryKey: eventKeys.list(filters, pagination),
    queryFn: () => getEvents(filters, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
}

/**
 * Hook to fetch events grouped by status (for main events page)
 */
export function useEventsByStatus(options?: {
  enabled?: boolean;
  refetchInterval?: number;
}) {
  return useQuery({
    queryKey: eventKeys.byStatus(),
    queryFn: getEventsByStatus,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
}

/**
 * Hook to fetch single event details
 */
export function useEventDetails(
  eventId: string,
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: eventKeys.detail(eventId),
    queryFn: () => getEventDetails(eventId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: (options?.enabled ?? true) && !!eventId,
  });
}

/**
 * Hook to fetch event links based on status
 */
export function useEventLinks(
  eventId: string,
  currentStatus: EventStatus,
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: eventKeys.links(eventId, currentStatus),
    queryFn: () => getEventLinks(eventId, currentStatus),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: (options?.enabled ?? true) && !!eventId,
  });
}

/**
 * Hook to check if user has RSVPed for an event
 */
export function useEventRSVPStatus(
  eventId: string,
  fingerprint: string,
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: eventKeys.rsvp(eventId, fingerprint),
    queryFn: () => checkExistingRSVP(eventId, fingerprint),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    enabled: (options?.enabled ?? true) && !!eventId && !!fingerprint,
  });
}

/**
 * Hook to get real-time RSVP count for an event
 */
export function useEventRSVPCount(
  eventId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  },
) {
  return useQuery({
    queryKey: eventKeys.rsvpCount(eventId),
    queryFn: () => getEventRSVPCount(eventId),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    enabled: (options?.enabled ?? true) && !!eventId,
    refetchInterval: options?.refetchInterval ?? 30 * 1000, // Refetch every 30 seconds
  });
}

/**
 * Mutation hook for RSVP toggle
 */
export function useToggleEventRSVP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      eventId,
      fingerprint,
      ipAddress,
      userAgent,
    }: {
      eventId: string;
      fingerprint: string;
      ipAddress?: string;
      userAgent?: string;
    }) => {
      return toggleEventRSVP(eventId, fingerprint, ipAddress, userAgent);
    },
    onSuccess: (isRSVPed, variables) => {
      const { eventId, fingerprint } = variables;

      // Update RSVP status cache
      queryClient.setQueryData(eventKeys.rsvp(eventId, fingerprint), isRSVPed);

      // Invalidate and refetch RSVP count
      queryClient.invalidateQueries({
        queryKey: eventKeys.rsvpCount(eventId),
      });

      // Invalidate events lists to update counts
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(),
      });

      // Invalidate by status query
      queryClient.invalidateQueries({
        queryKey: eventKeys.byStatus(),
      });

      // Invalidate event details
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(eventId),
      });
    },
    onError: (error) => {
      console.error("RSVP toggle failed:", error);
    },
  });
}

/**
 * Hook to prefetch event details (useful for hover states)
 */
export function usePrefetchEventDetails() {
  const queryClient = useQueryClient();

  return (eventId: string) => {
    queryClient.prefetchQuery({
      queryKey: eventKeys.detail(eventId),
      queryFn: () => getEventDetails(eventId),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };
}

/**
 * Hook to invalidate all event-related queries (useful for admin actions)
 */
export function useInvalidateEvents() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: eventKeys.all,
    });
  };
}
