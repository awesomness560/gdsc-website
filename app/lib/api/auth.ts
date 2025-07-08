// lib/api/auth.ts
import { supabase } from "~/lib/supabase";
import type { SignInCredentials, AuthUser, AuthSession } from "~/types/auth";

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: data.user as AuthUser,
    session: data.session as AuthSession,
  };
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Get current user session
 */
export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return session as AuthSession | null;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user as AuthUser | null;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const session = await getCurrentSession();
    return !!session;
  } catch {
    return false;
  }
}

/**
 * Refresh the current session
 */
export async function refreshSession() {
  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: data.user as AuthUser,
    session: data.session as AuthSession,
  };
}
