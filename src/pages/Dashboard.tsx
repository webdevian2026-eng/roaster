import { Users, Calendar, Clock, Palmtree, Upload, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import UploadRosterModal from '@/components/roster/UploadRosterModal';

const stats = [
  {
    title: 'Total Agents',
    value: '248',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Active Rosters',
    value: '12',
    icon: Calendar,
    color: 'text-tertiary',
    bgColor: 'bg-tertiary/10',
  },
  {
    title: 'Pending ADOs',
    value: '8',
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    title: 'Upcoming Holidays',
    value: '3',
    icon: Palmtree,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

const recentWarnings = [
  { id: 1, message: 'Team A: Missing TL coverage on Dec 25', severity: 'high' },
  { id: 2, message: 'Agent John Smith: Consecutive night shifts exceed limit', severity: 'medium' },
  { id: 3, message: 'Team B: Insufficient day shift coverage on Dec 28', severity: 'high' },
];

export default function Dashboard() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h2 font-medium text-foreground">Dashboard</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Overview of your roster management system
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setUploadModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Upload className="mr-2 h-5 w-5" strokeWidth={1.5} />
            Upload Roster
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} strokeWidth={1.5} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-medium text-card-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Warnings Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-h3 font-medium text-card-foreground">
              Recent Warnings
            </CardTitle>
            <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWarnings.map((warning) => (
              <div
                key={warning.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-background p-4"
              >
                <div
                  className={`rounded-lg p-2 ${
                    warning.severity === 'high'
                      ? 'bg-error/10'
                      : 'bg-warning/10'
                  }`}
                >
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      warning.severity === 'high'
                        ? 'text-error'
                        : 'text-warning'
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{warning.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {warning.severity === 'high' ? 'High Priority' : 'Medium Priority'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-1 border-0 text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-h3 font-medium text-primary-foreground">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="secondary"
              className="w-full justify-start bg-background/20 text-primary-foreground hover:bg-background/30"
            >
              <Calendar className="mr-2 h-5 w-5" strokeWidth={1.5} />
              View Current Roster
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start bg-background/20 text-primary-foreground hover:bg-background/30"
            >
              <Clock className="mr-2 h-5 w-5" strokeWidth={1.5} />
              Manage ADOs
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start bg-background/20 text-primary-foreground hover:bg-background/30"
            >
              <Palmtree className="mr-2 h-5 w-5" strokeWidth={1.5} />
              Add Holiday
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-h3 font-medium text-card-foreground">
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Last Roster Upload</span>
              <span className="text-sm font-medium text-card-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Active Users</span>
              <span className="text-sm font-medium text-card-foreground">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">System Health</span>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success"></span>
                Operational
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <UploadRosterModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  );
}
