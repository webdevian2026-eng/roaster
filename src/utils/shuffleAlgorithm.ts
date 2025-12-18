import { RosterEntry, Agent, ShiftMaster } from '../types';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, parseISO } from 'date-fns';

interface ShuffleOptions {
  month: number;
  year: number;
  agents: Agent[];
  shifts: ShiftMaster[];
  preserveOffs: boolean;
}

export function generateShuffledRoster(options: ShuffleOptions): RosterEntry[] {
  const { month, year, agents, shifts, preserveOffs } = options;
  
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(startDate);
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  const entries: RosterEntry[] = [];

  // Group agents by team
  const agentsByTeam = agents.reduce((acc, agent) => {
    const teamCode = agent.team?.code || 'UNKNOWN';
    if (!acc[teamCode]) acc[teamCode] = [];
    acc[teamCode].push(agent);
    return acc;
  }, {} as Record<string, Agent[]>);

  // Generate entries for each date
  dates.forEach((date, dateIndex) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayName = format(date, 'EEE');

    // Ad Review / Moderation
    const adReviewAgents = agentsByTeam['AD_REVIEW'] || [];
    const adReviewShifts = ['M', 'M', 'SE', 'SE', 'SE', 'N', 'E'];
    
    adReviewAgents.forEach((agent, index) => {
      const shiftIndex = (dateIndex + index) % adReviewShifts.length;
      const shiftCode = adReviewShifts[shiftIndex];
      const shift = shifts.find(s => s.code === shiftCode);

      // Give OFF every 7th day
      const isOff = (dateIndex + index) % 7 === 0;

      entries.push({
        id: `${agent.id}-${dateStr}`,
        roster_id: '',
        agent_id: agent.id,
        date: dateStr,
        day_name: dayName,
        shift_code: isOff ? null : shiftCode,
        shift_start: isOff ? null : shift?.start_time || null,
        shift_end: isOff ? null : shift?.end_time || null,
        leave_type: isOff ? 'OFF' : null,
        notes: null,
        is_manual_edit: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });

    // Email Support
    const emailAgents = agentsByTeam['EMAIL'] || [];
    const emailShifts = ['EM', 'EM1', 'EE', 'EE1'];
    
    emailAgents.forEach((agent, index) => {
      const shiftIndex = (dateIndex + index) % emailShifts.length;
      const shiftCode = emailShifts[shiftIndex];
      const shift = shifts.find(s => s.code === shiftCode);

      const isOff = (dateIndex + index) % 7 === 0;

      entries.push({
        id: `${agent.id}-${dateStr}`,
        roster_id: '',
        agent_id: agent.id,
        date: dateStr,
        day_name: dayName,
        shift_code: isOff ? null : shiftCode,
        shift_start: isOff ? null : shift?.start_time || null,
        shift_end: isOff ? null : shift?.end_time || null,
        leave_type: isOff ? 'OFF' : null,
        notes: null,
        is_manual_edit: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });

    // Help Desk
    const helpDeskAgents = agentsByTeam['HELP_DESK'] || [];
    const helpDeskShifts = ['HD', 'HDM1', 'HDE', 'HDE1'];
    
    helpDeskAgents.forEach((agent, index) => {
      const shiftIndex = (dateIndex + index) % helpDeskShifts.length;
      const shiftCode = helpDeskShifts[shiftIndex];
      const shift = shifts.find(s => s.code === shiftCode);

      const isOff = (dateIndex + index) % 7 === 0;

      entries.push({
        id: `${agent.id}-${dateStr}`,
        roster_id: '',
        agent_id: agent.id,
        date: dateStr,
        day_name: dayName,
        shift_code: isOff ? null : shiftCode,
        shift_start: isOff ? null : shift?.start_time || null,
        shift_end: isOff ? null : shift?.end_time || null,
        leave_type: isOff ? 'OFF' : null,
        notes: null,
        is_manual_edit: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });

    // Fraud
    const fraudAgents = agentsByTeam['FRAUD'] || [];
    const fraudShifts = ['FM', 'FE', 'MD'];
    
    fraudAgents.forEach((agent, index) => {
      const shiftIndex = (dateIndex + index) % fraudShifts.length;
      const shiftCode = fraudShifts[shiftIndex];
      const shift = shifts.find(s => s.code === shiftCode);

      const isOff = (dateIndex + index) % 7 === 0;

      entries.push({
        id: `${agent.id}-${dateStr}`,
        roster_id: '',
        agent_id: agent.id,
        date: dateStr,
        day_name: dayName,
        shift_code: isOff ? null : shiftCode,
        shift_start: isOff ? null : shift?.start_time || null,
        shift_end: isOff ? null : shift?.end_time || null,
        leave_type: isOff ? 'OFF' : null,
        notes: null,
        is_manual_edit: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });

    // Team Leaders
    const tlAgents = agentsByTeam['TL'] || [];
    const tlShifts = ['TLM', 'TLD', 'TLE'];
    
    tlAgents.forEach((agent, index) => {
      const shiftIndex = (dateIndex + index) % tlShifts.length;
      const shiftCode = tlShifts[shiftIndex];
      const shift = shifts.find(s => s.code === shiftCode);

      // Ensure only one TL is OFF per day
      const isOff = (dateIndex + index) % 7 === 0 && index === 0;

      entries.push({
        id: `${agent.id}-${dateStr}`,
        roster_id: '',
        agent_id: agent.id,
        date: dateStr,
        day_name: dayName,
        shift_code: isOff ? null : shiftCode,
        shift_start: isOff ? null : shift?.start_time || null,
        shift_end: isOff ? null : shift?.end_time || null,
        leave_type: isOff ? 'OFF' : null,
        notes: null,
        is_manual_edit: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });
  });

  return entries;
}
