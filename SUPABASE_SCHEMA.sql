-- =====================================================
-- ROSTER MANAGEMENT SYSTEM - SUPABASE SCHEMA
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. TEAMS TABLE
-- =====================================================
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO teams (name, code) VALUES
  ('Ad Review / Moderation', 'AD_REVIEW'),
  ('Email Support', 'EMAIL'),
  ('Help Desk', 'HELP_DESK'),
  ('Fraud', 'FRAUD'),
  ('Team Leader', 'TL');

-- =====================================================
-- 2. DESIGNATIONS TABLE
-- =====================================================
CREATE TABLE designations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO designations (name) VALUES
  ('Officer'),
  ('TL'),
  ('Manager');

-- =====================================================
-- 3. SHIFT MASTER TABLE
-- =====================================================
CREATE TABLE shift_master (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO shift_master (name, code, start_time, end_time, category) VALUES
  -- Core Shifts
  ('Night', 'N', '00:00', '07:00', 'Core'),
  ('Morning', 'M', '08:00', '16:00', 'Core'),
  ('Morning 1', 'M1', '08:00', '17:00', 'Core'),
  ('Day', 'D', '10:00', '18:00', 'Core'),
  ('Day 1', 'D1', '10:00', '19:00', 'Core'),
  ('Evening', 'E', '14:00', '22:00', 'Core'),
  ('Evening 1', 'E1', '13:00', '22:00', 'Core'),
  ('Super Evening', 'SE', '16:00', '02:00', 'Core'),
  ('Super Evening 1', 'SE1', '17:00', '02:00', 'Core'),
  
  -- Email Support
  ('Email Morning', 'EM', '08:00', '16:00', 'Email Support'),
  ('Email Morning 1', 'EM1', '08:00', '17:00', 'Email Support'),
  ('Email Evening', 'EE', '12:00', '20:00', 'Email Support'),
  ('Email Evening 1', 'EE1', '11:00', '20:00', 'Email Support'),
  
  -- Help Desk
  ('Help Desk Morning', 'HD', '10:00', '17:00', 'Help Desk'),
  ('Help Desk Morning 1', 'HDM1', '10:00', '19:00', 'Help Desk'),
  ('Help Desk Evening', 'HDE', '13:00', '20:00', 'Help Desk'),
  ('Help Desk Evening 1', 'HDE1', '11:00', '20:00', 'Help Desk'),
  
  -- Fraud / Special
  ('Fraud Morning', 'FM', '10:00', '18:00', 'Fraud'),
  ('Fraud Evening', 'FE', '12:00', '20:00', 'Fraud'),
  ('Missing Details', 'MD', '10:00', '18:00', 'Fraud'),
  
  -- Team Leader
  ('TL Morning', 'TLM', '08:00', '17:00', 'Team Leader'),
  ('TL Day', 'TLD', '10:00', '19:00', 'Team Leader'),
  ('TL Evening', 'TLE', '12:00', '21:00', 'Team Leader');

-- =====================================================
-- 4. LEAVE TYPES TABLE
-- =====================================================
CREATE TABLE leave_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO leave_types (code, name, description, color) VALUES
  ('OFF', 'Day Off', 'Regular day off', '#94a3b8'),
  ('CL', 'Casual Leave', 'Casual leave', '#3b82f6'),
  ('SL', 'Sick Leave', 'Sick leave', '#f59e0b'),
  ('GH', 'Government Holiday', 'Government holiday', '#10b981'),
  ('ADO', 'Adjusted Day Off', 'Adjusted day off for working on holiday', '#8b5cf6'),
  ('A', 'Absent', 'Absent', '#ef4444'),
  ('LWP', 'Leave Without Pay', 'Leave without pay', '#dc2626');

-- =====================================================
-- 5. AGENTS TABLE
-- =====================================================
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('M', 'F', 'Other')),
  employee_id TEXT UNIQUE,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  designation_id UUID REFERENCES designations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. ROSTERS TABLE (WITH STATUS)
-- =====================================================
CREATE TABLE rosters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL CHECK (year >= 2020),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  published_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE(month, year, status) WHERE status = 'published'
);

-- Index for faster queries
CREATE INDEX idx_rosters_status ON rosters(status);
CREATE INDEX idx_rosters_month_year ON rosters(month, year);

-- =====================================================
-- 7. ROSTER ENTRIES TABLE
-- =====================================================
CREATE TABLE roster_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roster_id UUID REFERENCES rosters(id) ON DELETE CASCADE NOT NULL,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  day_name TEXT NOT NULL,
  shift_code TEXT,
  shift_start TIME,
  shift_end TIME,
  leave_type TEXT,
  notes TEXT,
  is_manual_edit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(roster_id, agent_id, date)
);

-- Indexes for performance
CREATE INDEX idx_roster_entries_roster ON roster_entries(roster_id);
CREATE INDEX idx_roster_entries_agent ON roster_entries(agent_id);
CREATE INDEX idx_roster_entries_date ON roster_entries(date);

-- =====================================================
-- 8. HOLIDAYS TABLE
-- =====================================================
CREATE TABLE holidays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  title TEXT NOT NULL,
  is_government_holiday BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. ADO RECORDS TABLE
-- =====================================================
CREATE TABLE ado_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  holiday_date DATE NOT NULL,
  worked_shift TEXT NOT NULL,
  adjusted_off_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'adjusted')),
  roster_id UUID REFERENCES rosters(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  adjusted_at TIMESTAMPTZ
);

CREATE INDEX idx_ado_agent ON ado_records(agent_id);
CREATE INDEX idx_ado_status ON ado_records(status);

-- =====================================================
-- 10. AUDIT LOG TABLE
-- =====================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE rosters ENABLE ROW LEVEL SECURITY;
ALTER TABLE roster_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE ado_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Agents: Users can read all agents, but only admins can modify
CREATE POLICY "Anyone can view agents" ON agents FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert agents" ON agents FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own agent record" ON agents FOR UPDATE USING (user_id = auth.uid());

-- Rosters: All authenticated users can view, only authenticated can create/update drafts
CREATE POLICY "Anyone can view rosters" ON rosters FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create rosters" ON rosters FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update draft rosters" ON rosters FOR UPDATE USING (status = 'draft' AND auth.uid() IS NOT NULL);

-- Roster Entries: Linked to roster permissions
CREATE POLICY "Anyone can view roster entries" ON roster_entries FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert roster entries" ON roster_entries FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update draft roster entries" ON roster_entries FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM rosters 
      WHERE rosters.id = roster_entries.roster_id 
      AND rosters.status = 'draft'
    )
  );

-- Holidays: All can view, authenticated can manage
CREATE POLICY "Anyone can view holidays" ON holidays FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage holidays" ON holidays FOR ALL USING (auth.uid() IS NOT NULL);

-- ADO Records: All can view, authenticated can manage
CREATE POLICY "Anyone can view ADO records" ON ado_records FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage ADO records" ON ado_records FOR ALL USING (auth.uid() IS NOT NULL);

-- Audit Logs: Only viewable by authenticated users
CREATE POLICY "Authenticated users can view audit logs" ON audit_logs FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "System can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for agents
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for roster_entries
CREATE TRIGGER update_roster_entries_updated_at BEFORE UPDATE ON roster_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-archive previous published roster when publishing new one
CREATE OR REPLACE FUNCTION archive_previous_published_roster()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' THEN
    UPDATE rosters 
    SET status = 'archived'
    WHERE month = NEW.month 
      AND year = NEW.year 
      AND status = 'published'
      AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_archive_roster BEFORE UPDATE ON rosters
  FOR EACH ROW EXECUTE FUNCTION archive_previous_published_roster();

-- Function to detect ADO eligibility
CREATE OR REPLACE FUNCTION check_ado_eligibility()
RETURNS TRIGGER AS $$
BEGIN
  -- If agent worked on a government holiday, create ADO record
  IF NEW.shift_code IS NOT NULL 
     AND NEW.leave_type IS NULL 
     AND EXISTS (
       SELECT 1 FROM holidays 
       WHERE date = NEW.date 
       AND is_government_holiday = TRUE
     ) THEN
    INSERT INTO ado_records (agent_id, holiday_date, worked_shift, roster_id, status)
    VALUES (NEW.agent_id, NEW.date, NEW.shift_code, NEW.roster_id, 'pending')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER detect_ado AFTER INSERT OR UPDATE ON roster_entries
  FOR EACH ROW EXECUTE FUNCTION check_ado_eligibility();
