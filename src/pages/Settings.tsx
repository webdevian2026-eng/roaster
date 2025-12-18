import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-h2 font-medium text-foreground">Settings</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Manage teams, designations, and shift configurations
        </p>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="teams" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            Teams
          </TabsTrigger>
          <TabsTrigger value="shifts" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            Shifts
          </TabsTrigger>
          <TabsTrigger value="designations" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
            Designations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-h3 font-medium text-card-foreground">
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="team-name" className="text-foreground">Team Name</Label>
                    <Input id="team-name" placeholder="Enter team name" className="bg-background text-foreground border-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-lead" className="text-foreground">Team Lead</Label>
                    <Input id="team-lead" placeholder="Enter team lead name" className="bg-background text-foreground border-input" />
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-5 w-5" strokeWidth={1.5} />
                  Add Team
                </Button>
              </div>

              <Separator className="bg-border" />

              <div className="space-y-4">
                <h4 className="text-base font-medium text-card-foreground">Existing Teams</h4>
                {['Team A', 'Team B', 'Team C'].map((team) => (
                  <div
                    key={team}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                  >
                    <span className="text-foreground">{team}</span>
                    <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-h3 font-medium text-card-foreground">
                Shift Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="shift-code" className="text-foreground">Shift Code</Label>
                    <Input id="shift-code" placeholder="e.g., M, D, N" className="bg-background text-foreground border-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-foreground">Start Time</Label>
                    <Input id="start-time" type="time" className="bg-background text-foreground border-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-foreground">End Time</Label>
                    <Input id="end-time" type="time" className="bg-background text-foreground border-input" />
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-5 w-5" strokeWidth={1.5} />
                  Add Shift
                </Button>
              </div>

              <Separator className="bg-border" />

              <div className="space-y-4">
                <h4 className="text-base font-medium text-card-foreground">Configured Shifts</h4>
                {[
                  { code: 'M', name: 'Morning', time: '06:00 - 14:00' },
                  { code: 'D', name: 'Day', time: '14:00 - 22:00' },
                  { code: 'N', name: 'Night', time: '22:00 - 06:00' },
                ].map((shift) => (
                  <div
                    key={shift.code}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {shift.code} - {shift.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{shift.time}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="designations" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-h3 font-medium text-card-foreground">
                Designation Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-foreground">Designation Title</Label>
                  <Input id="designation" placeholder="Enter designation" className="bg-background text-foreground border-input" />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-5 w-5" strokeWidth={1.5} />
                  Add Designation
                </Button>
              </div>

              <Separator className="bg-border" />

              <div className="space-y-4">
                <h4 className="text-base font-medium text-card-foreground">Existing Designations</h4>
                {['Team Leader', 'Senior Agent', 'Agent', 'Trainee'].map((designation) => (
                  <div
                    key={designation}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                  >
                    <span className="text-foreground">{designation}</span>
                    <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
