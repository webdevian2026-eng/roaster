import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const daysInMonth = 31;
const startDay = 5; // Friday

const holidays = [25, 26];

export default function HolidayCalendar() {
  const [currentMonth, setCurrentMonth] = useState('December 2024');

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
            const isHoliday = holidays.includes(day);
            return (
              <button
                key={day}
                className={`aspect-square rounded-lg border p-2 text-center transition-all hover:border-primary hover:shadow-sm ${
                  isHoliday
                    ? 'border-success bg-success/10 text-success'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                <div className="text-sm font-medium">{day}</div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
