import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  getPeople,
  updateEvent,
  deleteEvent,
} from "~/lib/api/events";
import { eventKeys } from "./useEvents";
import type { CreateEventData } from "~/types/events";

/**
 * Hook to create a new event
 */
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventData: CreateEventData) => createEvent(eventData),
    onSuccess: (newEvent) => {
      // Invalidate all event-related queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: eventKeys.all,
      });

      // Optionally set the new event in cache
      queryClient.setQueryData(eventKeys.detail(newEvent.id), newEvent);

      console.log("Event created successfully:", newEvent);
    },
    onError: (error) => {
      console.error("Failed to create event:", error);
    },
  });
}

/**
 * Hook to update an existing event
 */
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventId,
      eventData,
    }: {
      eventId: string;
      eventData: Partial<CreateEventData>;
    }) => updateEvent(eventId, eventData),
    onSuccess: (updatedEvent, variables) => {
      // Invalidate all event-related queries
      queryClient.invalidateQueries({
        queryKey: eventKeys.all,
      });

      // Update the specific event in cache
      queryClient.setQueryData(
        eventKeys.detail(variables.eventId),
        updatedEvent,
      );

      console.log("Event updated successfully:", updatedEvent);
    },
    onError: (error) => {
      console.error("Failed to update event:", error);
    },
  });
}

/**
 * Hook to delete an event
 */
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: (_, eventId) => {
      // Remove the deleted event from cache
      queryClient.removeQueries({
        queryKey: eventKeys.detail(eventId),
      });

      // Invalidate all event lists to refresh
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: eventKeys.byStatus(),
      });

      console.log("Event deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete event:", error);
    },
  });
}

/**
 * Hook to fetch all people for host selection
 */
export function usePeople(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["people"],
    queryFn: getPeople,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: options?.enabled ?? true,
  });
}

/**
 * Hook to prefetch people data (useful for forms)
 */
export function usePrefetchPeople() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: ["people"],
      queryFn: getPeople,
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };
}
