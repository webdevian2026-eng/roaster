import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockData = [
  {
    id: 1,
    agent: 'John Smith',
    team: 'Team A',
    designation: 'Team Leader',
    shifts: ['M', 'M', 'D', 'D', 'N', 'N', 'OFF'],
  },
  {
    id: 2,
    agent: 'Sarah Johnson',
    team: 'Team B',
    designation: 'Senior Agent',
    shifts: ['D', 'D', 'N', 'N', 'OFF', 'M', 'M'],
  },
  {
    id: 3,
    agent: 'Mike Wilson',
    team: 'Team A',
    designation: 'Agent',
    shifts: ['N', 'N', 'OFF', 'M', 'M', 'D', 'D'],
  },
  {
    id: 4,
    agent: 'Emily Brown',
    team: 'Team C',
    designation: 'Agent',
    shifts: ['OFF', 'M', 'M', 'D', 'D', 'N', 'N'],
  },
];

const shiftColors: Record<string, string> = {
  M: 'bg-primary/20 text-primary border-primary',
  D: 'bg-tertiary/20 text-tertiary border-tertiary',
  N: 'bg-secondary/20 text-secondary border-secondary',
  OFF: 'bg-gray-200 text-gray-700 border-gray-300',
};

export default function RosterTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');

  const filteredData = mockData.filter((row) => {
    const matchesSearch = row.agent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = teamFilter === 'all' || row.team === teamFilter;
    return matchesSearch && matchesTeam;
  });

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-h3 font-medium text-card-foreground">Roster Table</CardTitle>
        
        {/* Filters */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Input
            placeholder="Search by agent name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-background text-foreground border-input"
          />
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-background text-foreground border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="Team A">Team A</SelectItem>
              <SelectItem value="Team B">Team B</SelectItem>
              <SelectItem value="Team C">Team C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="sticky left-0 bg-muted px-4 py-3 text-left text-sm font-medium text-foreground">
                  Agent
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Team</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  Designation
                </th>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-medium text-foreground">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border transition-colors hover:bg-muted/50"
                >
                  <td className="sticky left-0 bg-card px-4 py-3 text-sm font-medium text-foreground">
                    {row.agent}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{row.team}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{row.designation}</td>
                  {row.shifts.map((shift, index) => (
                    <td key={index} className="px-4 py-3 text-center">
                      <Badge
                        variant="outline"
                        className={`${shiftColors[shift]} font-normal`}
                      >
                        {shift}
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
