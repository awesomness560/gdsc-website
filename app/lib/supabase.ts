// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (e.g. in .env or .env.local).",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Since we're not using auth for RSVPs
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types (auto-generated from Supabase)
export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          location: string;
          date: string;
          start_time: string;
          end_time: string | null;
          max_capacity: number;
          status: "upcoming" | "ongoing" | "past";
          event_type: string;
          allow_anonymous_rsvp: boolean;
          rsvp_limit_per_ip: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          location: string;
          date: string;
          start_time: string;
          end_time?: string | null;
          max_capacity?: number;
          status?: "upcoming" | "ongoing" | "past";
          event_type?: string;
          allow_anonymous_rsvp?: boolean;
          rsvp_limit_per_ip?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          location?: string;
          date?: string;
          start_time?: string;
          end_time?: string | null;
          max_capacity?: number;
          status?: "upcoming" | "ongoing" | "past";
          event_type?: string;
          allow_anonymous_rsvp?: boolean;
          rsvp_limit_per_ip?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      events_with_rsvp_count: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          location: string;
          date: string;
          start_time: string;
          end_time: string | null;
          max_capacity: number;
          status: "upcoming" | "ongoing" | "past";
          event_type: string;
          allow_anonymous_rsvp: boolean;
          rsvp_limit_per_ip: number;
          created_at: string;
          updated_at: string;
          rsvp_count: number;
        };
      };
    };
  };
};
