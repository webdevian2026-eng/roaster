import { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HolidayCalendar from '@/components/holiday/HolidayCalendar';
import AddHolidayModal from '@/components/holiday/AddHolidayModal';

const upcomingHolidays = [
  { id: 1, name: 'Christmas Day', date: '2024-12-25', isGovernment: true },
  { id: 2, name: 'Boxing Day', date: '2024-12-26', isGovernment: true },
  { id: 3, name: "New Year's Day", date: '2025-01-01', isGovernment: true },
];

export default function HolidayManagement() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h2 font-medium text-foreground">Holiday Management</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Manage holidays and trigger ADO recalculations
          </p>
        </div>
        <Button
          onClick={() => setAddModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-5 w-5" strokeWidth={1.5} />
          Add Holiday
        </Button>
      </div>

      {/* Calendar and List */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <HolidayCalendar />
        </div>

        {/* Upcoming Holidays */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-h3 font-medium text-card-foreground">
              Upcoming Holidays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingHolidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <CalendarIcon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-foreground">{holiday.name}</p>
                        {holiday.isGovernment && (
                          <Badge className="bg-success text-white">
                            Government
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{holiday.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddHolidayModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
}
