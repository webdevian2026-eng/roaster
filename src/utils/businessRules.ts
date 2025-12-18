import { RosterEntry, ValidationWarning, Agent } from '../types';
import { format, addDays, parseISO } from 'date-fns';

export const BUSINESS_RULES = {
  adReview: {
    minMorning: 2,
    minSuperEvening: 3,
    minNight: 1,
    minEvening: 1,
  },
  helpDesk: {
    minMorning: 1,
    minEvening: 1,
  },
  emailSupport: {
    minMorning: 1,
    minEvening: 1,
  },
  global: {
    minOffPerWeek: 1,
    noNightToMorning: true,
  },
};

export function validateRoster(
  entries: RosterEntry[],
  agents: Agent[]
): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // Group entries by date
  const entriesByDate = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, RosterEntry[]>);

  // Validate each date
  Object.entries(entriesByDate).forEach(([date, dateEntries]) => {
    // Get agents for each team
    const adReviewAgents = agents.filter(a => a.team?.code === 'AD_REVIEW');
    const helpDeskAgents = agents.filter(a => a.team?.code === 'HELP_DESK');
    const emailAgents = agents.filter(a => a.team?.code === 'EMAIL');
    const tlAgents = agents.filter(a => a.team?.code === 'TL');

    // Ad Review validation
    const adReviewEntries = dateEntries.filter(e => 
      adReviewAgents.some(a => a.id === e.agent_id)
    );
    
    const morningCount = adReviewEntries.filter(e => 
      e.shift_code === 'M' || e.shift_code === 'M1'
    ).length;
    
    const superEveningCount = adReviewEntries.filter(e => 
      e.shift_code === 'SE' || e.shift_code === 'SE1'
    ).length;
    
    const nightCount = adReviewEntries.filter(e => e.shift_code === 'N').length;
    
    const eveningCount = adReviewEntries.filter(e => 
      e.shift_code === 'E' || e.shift_code === 'E1'
    ).length;

    if (morningCount < BUSINESS_RULES.adReview.minMorning) {
      warnings.push({
        type: 'warning',
        category: 'Ad Review Coverage',
        message: `Only ${morningCount} morning shifts (minimum: ${BUSINESS_RULES.adReview.minMorning})`,
        date,
        team: 'Ad Review'
      });
    }

    if (superEveningCount < BUSINESS_RULES.adReview.minSuperEvening) {
      warnings.push({
        type: 'warning',
        category: 'Ad Review Coverage',
        message: `Only ${superEveningCount} super evening shifts (minimum: ${BUSINESS_RULES.adReview.minSuperEvening})`,
        date,
        team: 'Ad Review'
      });
    }

    if (nightCount < BUSINESS_RULES.adReview.minNight) {
      warnings.push({
        type: 'warning',
        category: 'Ad Review Coverage',
        message: `Only ${nightCount} night shifts (minimum: ${BUSINESS_RULES.adReview.minNight})`,
        date,
        team: 'Ad Review'
      });
    }

    if (eveningCount < BUSINESS_RULES.adReview.minEvening) {
      warnings.push({
        type: 'warning',
        category: 'Ad Review Coverage',
        message: `Only ${eveningCount} evening shifts (minimum: ${BUSINESS_RULES.adReview.minEvening})`,
        date,
        team: 'Ad Review'
      });
    }

    // Help Desk validation
    const helpDeskEntries = dateEntries.filter(e => 
      helpDeskAgents.some(a => a.id === e.agent_id)
    );
    
    const hdMorning = helpDeskEntries.filter(e => 
      e.shift_code?.startsWith('HD') && e.shift_code.includes('M')
    ).length;
    
    const hdEvening = helpDeskEntries.filter(e => 
      e.shift_code?.startsWith('HD') && e.shift_code.includes('E')
    ).length;

    if (hdMorning < BUSINESS_RULES.helpDesk.minMorning) {
      warnings.push({
        type: 'warning',
        category: 'Help Desk Coverage',
        message: `Only ${hdMorning} morning shifts (minimum: ${BUSINESS_RULES.helpDesk.minMorning})`,
        date,
        team: 'Help Desk'
      });
    }

    if (hdEvening < BUSINESS_RULES.helpDesk.minEvening) {
      warnings.push({
        type: 'warning',
        category: 'Help Desk Coverage',
        message: `Only ${hdEvening} evening shifts (minimum: ${BUSINESS_RULES.helpDesk.minEvening})`,
        date,
        team: 'Help Desk'
      });
    }

    // Email Support validation
    const emailEntries = dateEntries.filter(e => 
      emailAgents.some(a => a.id === e.agent_id)
    );
    
    const emailMorning = emailEntries.filter(e => 
      e.shift_code === 'EM' || e.shift_code === 'EM1'
    ).length;
    
    const emailEvening = emailEntries.filter(e => 
      e.shift_code === 'EE' || e.shift_code === 'EE1'
    ).length;

    if (emailMorning < BUSINESS_RULES.emailSupport.minMorning) {
      warnings.push({
        type: 'warning',
        category: 'Email Support Coverage',
        message: `Only ${emailMorning} morning shifts (minimum: ${BUSINESS_RULES.emailSupport.minMorning})`,
        date,
        team: 'Email Support'
      });
    }

    if (emailEvening < BUSINESS_RULES.emailSupport.minEvening) {
      warnings.push({
        type: 'warning',
        category: 'Email Support Coverage',
        message: `Only ${emailEvening} evening shifts (minimum: ${BUSINESS_RULES.emailSupport.minEvening})`,
        date,
        team: 'Email Support'
      });
    }

    // Team Leader OFF conflict
    const tlEntries = dateEntries.filter(e => 
      tlAgents.some(a => a.id === e.agent_id)
    );
    
    const tlOffCount = tlEntries.filter(e => e.leave_type === 'OFF').length;
    
    if (tlOffCount >= 2) {
      warnings.push({
        type: 'error',
        category: 'Team Leader Conflict',
        message: `${tlOffCount} Team Leaders are OFF (maximum: 1)`,
        date,
        team: 'Team Leader'
      });
    }
  });

  // Validate weekly OFF for each agent
  agents.forEach(agent => {
    const agentEntries = entries.filter(e => e.agent_id === agent.id);
    
    // Group by week
    const weeks: Record<string, RosterEntry[]> = {};
    agentEntries.forEach(entry => {
      const date = parseISO(entry.date);
      const weekStart = format(date, 'yyyy-ww');
      if (!weeks[weekStart]) weeks[weekStart] = [];
      weeks[weekStart].push(entry);
    });

    Object.entries(weeks).forEach(([week, weekEntries]) => {
      const offCount = weekEntries.filter(e => e.leave_type === 'OFF').length;
      if (offCount < BUSINESS_RULES.global.minOffPerWeek) {
        warnings.push({
          type: 'warning',
          category: 'Weekly OFF',
          message: `${agent.name} has only ${offCount} OFF days in week ${week}`,
          team: agent.team?.name
        });
      }
    });
  });

  // Validate no Night -> Morning transition
  if (BUSINESS_RULES.global.noNightToMorning) {
    agents.forEach(agent => {
      const agentEntries = entries
        .filter(e => e.agent_id === agent.id)
        .sort((a, b) => a.date.localeCompare(b.date));

      for (let i = 0; i < agentEntries.length - 1; i++) {
        const today = agentEntries[i];
        const tomorrow = agentEntries[i + 1];

        if (today.shift_code === 'N' && 
            (tomorrow.shift_code === 'M' || tomorrow.shift_code === 'M1')) {
          warnings.push({
            type: 'error',
            category: 'Invalid Shift Transition',
            message: `${agent.name} has Night shift followed by Morning shift`,
            date: tomorrow.date,
            team: agent.team?.name
          });
        }
      }
    });
  }

  return warnings;
}
