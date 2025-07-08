// Base Person type matching the database schema
export interface Person {
  id: string;
  name: string;
  role: string;
  image_url: string;
  major?: string;
  year?: string;
  committee?: string;
  specialties?: string[];
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

// Type for creating a new person (excludes auto-generated fields)
export interface CreatePersonData {
  name: string;
  role: string;
  image_url: string;
  major?: string;
  year?: string;
  committee?: string;
  specialties?: string[];
  bio?: string;
}

// Type for updating a person (all fields optional except ID)
export interface UpdatePersonData {
  name?: string;
  role?: string;
  image_url?: string;
  major?: string;
  year?: string;
  committee?: string;
  specialties?: string[];
  bio?: string;
}

// Filters for querying people
export interface PersonFilters {
  role?: string;
  committee?: string;
  search?: string;
}

// Form data type for the person form
export interface PersonFormData {
  name: string;
  role: string;
  image_url: string;
  major: string;
  year: string;
  committee: string;
  specialties: string[];
  bio: string;
}

// Committee and role constants
export const COMMITTEES = [
  "Technical",
  "Marketing",
  "Business",
  "Administrative",
] as const;

export const ROLES = [
  "President",
  "Technical Director",
  "Marketing Director",
  "Business Director",
  "Administrative Director",
  "Technical Officer",
  "Marketing Officer",
  "Business Officer",
  "Finance Officer",
  "Industry Officer",
] as const;

export type Committee = (typeof COMMITTEES)[number];
export type Role = (typeof ROLES)[number];
