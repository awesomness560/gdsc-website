import type {
  Person,
  CreatePersonData,
  UpdatePersonData,
  PersonFilters,
} from "~/types/people";
import { supabase } from "../supabase";

/**
 * Fetch all people with optional filtering
 */
export async function getPeople(filters: PersonFilters = {}) {
  const { role, committee, search } = filters;

  let query = supabase
    .from("people")
    .select("*")
    .order("name", { ascending: true });

  // Apply role filter
  if (role) {
    query = query.eq("role", role);
  }

  // Apply committee filter
  if (committee) {
    query = query.eq("committee", committee);
  }

  // Apply search filter (searches name, role, and major)
  if (search) {
    query = query.or(
      `name.ilike.%${search}%,role.ilike.%${search}%,major.ilike.%${search}%`,
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch people: ${error.message}`);
  }

  return data as Person[];
}

/**
 * Fetch a single person by ID
 */
export async function getPerson(personId: string) {
  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("id", personId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch person: ${error.message}`);
  }

  return data as Person;
}

/**
 * Create a new person
 */
export async function createPerson(personData: CreatePersonData) {
  const { name, role, image_url, major, year, committee, specialties, bio } =
    personData;

  const { data, error } = await supabase
    .from("people")
    .insert({
      name,
      role,
      image_url,
      major,
      year,
      committee,
      specialties: specialties || [],
      bio,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create person: ${error.message}`);
  }

  return data as Person;
}

/**
 * Update an existing person
 */
export async function updatePerson(
  personId: string,
  personData: UpdatePersonData,
) {
  const { name, role, image_url, major, year, committee, specialties, bio } =
    personData;

  const { data, error } = await supabase
    .from("people")
    .update({
      name,
      role,
      image_url,
      major,
      year,
      committee,
      specialties: specialties || [],
      bio,
      updated_at: new Date().toISOString(),
    })
    .eq("id", personId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update person: ${error.message}`);
  }

  return data as Person;
}

/**
 * Delete a person
 */
export async function deletePerson(personId: string) {
  const { error } = await supabase.from("people").delete().eq("id", personId);

  if (error) {
    throw new Error(`Failed to delete person: ${error.message}`);
  }

  return true;
}

/**
 * Get unique committees from people table
 */
export async function getCommittees() {
  const { data, error } = await supabase
    .from("people")
    .select("committee")
    .not("committee", "is", null);

  if (error) {
    throw new Error(`Failed to fetch committees: ${error.message}`);
  }

  // Extract unique committees
  const committees = [...new Set(data.map((item) => item.committee))].filter(
    Boolean,
  );

  return committees as string[];
}

/**
 * Get unique roles from people table
 */
export async function getRoles() {
  const { data, error } = await supabase
    .from("people")
    .select("role")
    .not("role", "is", null);

  if (error) {
    throw new Error(`Failed to fetch roles: ${error.message}`);
  }

  // Extract unique roles
  const roles = [...new Set(data.map((item) => item.role))].filter(Boolean);

  return roles as string[];
}
