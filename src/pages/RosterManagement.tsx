import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RosterTable from '@/components/roster/RosterTable';
import RosterCalendar from '@/components/roster/RosterCalendar';
import UploadRosterModal from '@/components/roster/UploadRosterModal';

export default function RosterManagement() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h2 font-medium text-foreground">Roster Management</h1>
          <p className="mt-2 text-base text-muted-foreground">
            View and manage workforce schedules
          </p>
        </div>
        <Button
          onClick={() => setUploadModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Upload className="mr-2 h-5 w-5" strokeWidth={1.5} />
          Upload Roster
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="table" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            Table View
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-6">
          <RosterTable />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <RosterCalendar />
        </TabsContent>
      </Tabs>

      <UploadRosterModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  );
}
