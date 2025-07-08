// hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import {
  signIn,
  signOut,
  getCurrentSession,
  getCurrentUser,
  refreshSession,
} from "~/lib/api/auth";
import type { SignInCredentials, AuthUser, AuthSession } from "~/types/auth";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

/**
 * Hook to get current user session
 */
export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: getCurrentSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry auth failures
  });
}

/**
 * Hook to get current user
 */
export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry auth failures
  });
}

/**
 * Hook for sign in mutation
 */
export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInCredentials) => signIn(credentials),
    onSuccess: (data) => {
      // Update cache with new session and user data
      queryClient.setQueryData(authKeys.session(), data.session);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: () => {
      // Clear any stale auth data on error
      queryClient.setQueryData(authKeys.session(), null);
      queryClient.setQueryData(authKeys.user(), null);
    },
  });
}

/**
 * Hook for sign out mutation
 */
export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.setQueryData(authKeys.session(), null);
      queryClient.setQueryData(authKeys.user(), null);

      // Optionally clear all cached data
      queryClient.clear();
    },
  });
}

/**
 * Hook that provides auth state and methods
 */
export function useAuth() {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  const { data: session, isLoading: sessionLoading } = useSession();
  const { data: user, isLoading: userLoading } = useUser();

  const signInMutation = useSignIn();
  const signOutMutation = useSignOut();

  // Listen to auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.setQueryData(authKeys.session(), session);
        queryClient.setQueryData(authKeys.user(), session?.user || null);
      } else if (event === "SIGNED_OUT") {
        queryClient.setQueryData(authKeys.session(), null);
        queryClient.setQueryData(authKeys.user(), null);
      }

      setIsInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  // Initialize auth state on mount
  useEffect(() => {
    getCurrentSession()
      .then((session) => {
        queryClient.setQueryData(authKeys.session(), session);
        queryClient.setQueryData(authKeys.user(), session?.user || null);
        setIsInitialized(true);
      })
      .catch(() => {
        setIsInitialized(true);
      });
  }, [queryClient]);

  const isLoading = !isInitialized || sessionLoading || userLoading;
  const isAuthenticated = !!session && !!user;

  return {
    // State
    user,
    session,
    isLoading,
    isAuthenticated,
    isInitialized,

    // Actions
    signIn: signInMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,

    // Mutation states
    isSigningIn: signInMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    signInError: signInMutation.error,
    signOutError: signOutMutation.error,
  };
}
