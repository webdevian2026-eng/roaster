import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase credentials
// Get them from: https://app.supabase.com/project/_/settings/api

// For development in Sandpack, using placeholder values
// In production, use environment variables
const supabaseUrl = typeof window !== 'undefined' && (window as any).VITE_SUPABASE_URL 
  ? (window as any).VITE_SUPABASE_URL 
  : 'https://placeholder.supabase.co';

const supabaseAnonKey = typeof window !== 'undefined' && (window as any).VITE_SUPABASE_ANON_KEY
  ? (window as any).VITE_SUPABASE_ANON_KEY
  : 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string;
          name: string;
          code: string;
          created_at: string;
        };
      };
      designations: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
      };
      shift_master: {
        Row: {
          id: string;
          name: string;
          code: string;
          start_time: string;
          end_time: string;
          category: string;
          created_at: string;
        };
      };
      leave_types: {
        Row: {
          id: string;
          code: string;
          name: string;
          description: string | null;
          color: string;
          created_at: string;
        };
      };
      agents: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          gender: string | null;
          employee_id: string | null;
          team_id: string | null;
          designation_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      rosters: {
        Row: {
          id: string;
          month: number;
          year: number;
          status: 'draft' | 'published' | 'archived';
          created_by: string | null;
          created_at: string;
          published_at: string | null;
          published_by: string | null;
        };
      };
      roster_entries: {
        Row: {
          id: string;
          roster_id: string;
          agent_id: string;
          date: string;
          day_name: string;
          shift_code: string | null;
          shift_start: string | null;
          shift_end: string | null;
          leave_type: string | null;
          notes: string | null;
          is_manual_edit: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      holidays: {
        Row: {
          id: string;
          date: string;
          title: string;
          is_government_holiday: boolean;
          notes: string | null;
          created_at: string;
        };
      };
      ado_records: {
        Row: {
          id: string;
          agent_id: string;
          holiday_date: string;
          worked_shift: string;
          adjusted_off_date: string | null;
          status: 'pending' | 'adjusted';
          roster_id: string | null;
          notes: string | null;
          created_at: string;
          adjusted_at: string | null;
        };
      };
    };
  };
}
