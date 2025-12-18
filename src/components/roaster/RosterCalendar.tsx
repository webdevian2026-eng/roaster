import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const daysInMonth = 31;
const startDay = 5; // Friday

const mockShifts: Record<number, { agent: string; shift: string }[]> = {
  1: [
    { agent: 'John Smith', shift: 'M' },
    { agent: 'Sarah Johnson', shift: 'D' },
  ],
  2: [
    { agent: 'Mike Wilson', shift: 'N' },
    { agent: 'Emily Brown', shift: 'M' },
  ],
  15: [
    { agent: 'John Smith', shift: 'D' },
    { agent: 'Sarah Johnson', shift: 'N' },
  ],
  25: [
    { agent: 'Mike Wilson', shift: 'OFF' },
    { agent: 'Emily Brown', shift: 'OFF' },
  ],
};

const shiftColors: Record<string, string> = {
  M: 'bg-primary/20 text-primary border-primary',
  D: 'bg-tertiary/20 text-tertiary border-tertiary',
  N: 'bg-secondary/20 text-secondary border-secondary',
  OFF: 'bg-gray-200 text-gray-700 border-gray-300',
};

export default function RosterCalendar() {
  const [currentMonth, setCurrentMonth] = useState('December 2024');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const emptyDays = Array(startDay).fill(null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-h3 font-medium text-card-foreground">
            {currentMonth}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {days.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}

          {/* Empty Days */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="p-2" />
          ))}

          {/* Month Days */}
          {monthDays.map((day) => {
            const hasShifts = mockShifts[day];
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`min-h-24 rounded-lg border p-2 text-left transition-all hover:border-primary hover:shadow-sm ${
                  selectedDate === day
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background'
                }`}
              >
                <div className="mb-2 text-sm font-medium text-foreground">{day}</div>
                {hasShifts && (
                  <div className="space-y-1">
                    {hasShifts.slice(0, 2).map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`${shiftColors[item.shift]} w-full justify-center text-xs font-normal`}
                      >
                        {item.shift}
                      </Badge>
                    ))}
                    {hasShifts.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{hasShifts.length - 2} more
                      </p>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Details */}
        {selectedDate && mockShifts[selectedDate] && (
          <div className="mt-6 rounded-lg border border-border bg-background p-4">
            <h4 className="mb-3 font-medium text-foreground">
              Shifts for December {selectedDate}
            </h4>
            <div className="space-y-2">
              {mockShifts[selectedDate].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-muted p-3"
                >
                  <span className="text-sm text-foreground">{item.agent}</span>
                  <Badge
                    variant="outline"
                    className={`${shiftColors[item.shift]} font-normal`}
                  >
                    {item.shift}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
