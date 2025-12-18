export type RosterStatus = 'draft' | 'published' | 'archived';
export type ADOStatus = 'pending' | 'adjusted';
export type Gender = 'M' | 'F' | 'Other';

export interface Team {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

export interface Designation {
  id: string;
  name: string;
  created_at: string;
}

export interface ShiftMaster {
  id: string;
  name: string;
  code: string;
  start_time: string;
  end_time: string;
  category: string;
  created_at: string;
}

export interface LeaveType {
  id: string;
  code: string;
  name: string;
  description: string | null;
  color: string;
  created_at: string;
}

export interface Agent {
  id: string;
  user_id: string | null;
  name: string;
  gender: Gender | null;
  employee_id: string | null;
  team_id: string | null;
  designation_id: string | null;
  created_at: string;
  updated_at: string;
  team?: Team;
  designation?: Designation;
}

export interface Roster {
  id: string;
  month: number;
  year: number;
  status: RosterStatus;
  created_by: string | null;
  created_at: string;
  published_at: string | null;
  published_by: string | null;
}

export interface RosterEntry {
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
  agent?: Agent;
}

export interface Holiday {
  id: string;
  date: string;
  title: string;
  is_government_holiday: boolean;
  notes: string | null;
  created_at: string;
}

export interface ADORecord {
  id: string;
  agent_id: string;
  holiday_date: string;
  worked_shift: string;
  adjusted_off_date: string | null;
  status: ADOStatus;
  roster_id: string | null;
  notes: string | null;
  created_at: string;
  adjusted_at: string | null;
  agent?: Agent;
}

export interface ValidationWarning {
  type: 'error' | 'warning';
  category: string;
  message: string;
  date?: string;
  team?: string;
}

export interface BusinessRules {
  adReview: {
    minMorning: number;
    minSuperEvening: number;
    minNight: number;
    minEvening: number;
  };
  helpDesk: {
    minMorning: number;
    minEvening: number;
  };
  emailSupport: {
    minMorning: number;
    minEvening: number;
  };
  global: {
    minOffPerWeek: number;
    noNightToMorning: boolean;
  };
}
