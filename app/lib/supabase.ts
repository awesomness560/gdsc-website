// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cpkiiwfartocrloqrggq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwa2lpd2ZhcnRvY3Jsb3FyZ2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODI2MzMsImV4cCI6MjA2NzE1ODYzM30.VyYsUlCtrgKX0YOQ5jmuQEDvd_seKK0AJVB9gSjmcSI";

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
