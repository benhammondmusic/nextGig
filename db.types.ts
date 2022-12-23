export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
      gigs: {
        Row: {
          id: number;
          user_id: string;
          amount_due: number | null;
          is_paid: boolean | null;
          inserted_at: string;
          start_date: string | null;
          end_date: string | null;
          venue: number | null;
          client: number | null;
          start_time: string | null;
          end_time: string | null;
        };
        Insert: {
          id?: number;
          user_id: string;
          amount_due?: number | null;
          is_paid?: boolean | null;
          inserted_at?: string;
          start_date?: string | null;
          end_date?: string | null;
          venue?: number | null;
          client?: number | null;
          start_time?: string | null;
          end_time?: string | null;
        };
        Update: {
          id?: number;
          user_id?: string;
          amount_due?: number | null;
          is_paid?: boolean | null;
          inserted_at?: string;
          start_date?: string | null;
          end_date?: string | null;
          venue?: number | null;
          client?: number | null;
          start_time?: string | null;
          end_time?: string | null;
        };
      };
      venues: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          address: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          address?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          address?: string | null;
        };
      };
      clients: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

