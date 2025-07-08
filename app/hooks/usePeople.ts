import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
  getCommittees,
  getRoles,
} from "~/lib/api/people";
import type {
  PersonFilters,
  CreatePersonData,
  UpdatePersonData,
} from "~/types/people";

// Query Keys
export const personKeys = {
  all: ["people"] as const,
  lists: () => [...personKeys.all, "list"] as const,
  list: (filters: PersonFilters) => [...personKeys.lists(), filters] as const,
  details: () => [...personKeys.all, "detail"] as const,
  detail: (id: string) => [...personKeys.details(), id] as const,
  committees: () => [...personKeys.all, "committees"] as const,
  roles: () => [...personKeys.all, "roles"] as const,
};

/**
 * Hook to fetch all people with optional filtering
 */
export function usePeople(
  filters: PersonFilters = {},
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  },
) {
  return useQuery({
    queryKey: personKeys.list(filters),
    queryFn: () => getPeople(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
}

/**
 * Hook to fetch a single person by ID
 */
export function usePerson(
  personId: string,
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: personKeys.detail(personId),
    queryFn: () => getPerson(personId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: (options?.enabled ?? true) && !!personId,
  });
}

/**
 * Hook to fetch all committees
 */
export function useCommittees(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: personKeys.committees(),
    queryFn: getCommittees,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: options?.enabled ?? true,
  });
}

/**
 * Hook to fetch all roles
 */
export function useRoles(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: personKeys.roles(),
    queryFn: getRoles,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: options?.enabled ?? true,
  });
}

/**
 * Mutation hook for creating a new person
 */
export function useCreatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (personData: CreatePersonData) => createPerson(personData),
    onSuccess: () => {
      // Invalidate all people-related queries
      queryClient.invalidateQueries({
        queryKey: personKeys.all,
      });
    },
    onError: (error) => {
      console.error("Create person failed:", error);
    },
  });
}

/**
 * Mutation hook for updating a person
 */
export function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      personId,
      personData,
    }: {
      personId: string;
      personData: UpdatePersonData;
    }) => updatePerson(personId, personData),
    onSuccess: (updatedPerson) => {
      // Update the specific person in cache
      queryClient.setQueryData(
        personKeys.detail(updatedPerson.id),
        updatedPerson,
      );

      // Invalidate all people lists
      queryClient.invalidateQueries({
        queryKey: personKeys.lists(),
      });
    },
    onError: (error) => {
      console.error("Update person failed:", error);
    },
  });
}

/**
 * Mutation hook for deleting a person
 */
export function useDeletePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (personId: string) => deletePerson(personId),
    onSuccess: (_, personId) => {
      // Remove person from cache
      queryClient.removeQueries({
        queryKey: personKeys.detail(personId),
      });

      // Invalidate all people lists
      queryClient.invalidateQueries({
        queryKey: personKeys.lists(),
      });
    },
    onError: (error) => {
      console.error("Delete person failed:", error);
    },
  });
}

/**
 * Hook to prefetch person details (useful for hover states)
 */
export function usePrefetchPerson() {
  const queryClient = useQueryClient();

  return (personId: string) => {
    queryClient.prefetchQuery({
      queryKey: personKeys.detail(personId),
      queryFn: () => getPerson(personId),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };
}

/**
 * Hook to invalidate all person-related queries (useful for admin actions)
 */
export function useInvalidatePeople() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: personKeys.all,
    });
  };
}
