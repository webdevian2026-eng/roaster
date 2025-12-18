import { CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const pendingADOs = [
  { id: 1, agent: 'John Smith', team: 'Team A', date: '2024-12-25', reason: 'Government Holiday' },
  { id: 2, agent: 'Sarah Johnson', team: 'Team B', date: '2024-12-25', reason: 'Government Holiday' },
  { id: 3, agent: 'Mike Wilson', team: 'Team A', date: '2024-12-26', reason: 'Government Holiday' },
  { id: 4, agent: 'Emily Brown', team: 'Team C', date: '2024-12-25', reason: 'Government Holiday' },
];

const adjustedADOs = [
  { id: 5, agent: 'David Lee', team: 'Team B', date: '2024-12-20', completedDate: '2024-12-22' },
  { id: 6, agent: 'Lisa Chen', team: 'Team A', date: '2024-12-18', completedDate: '2024-12-21' },
  { id: 7, agent: 'Tom Anderson', team: 'Team C', date: '2024-12-15', completedDate: '2024-12-19' },
];

export default function ADOTracker() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-h2 font-medium text-foreground">ADO Tracker</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Track and manage adjusted day off assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Pending ADOs
            </CardTitle>
            <div className="rounded-lg bg-warning/10 p-2">
              <Clock className="h-5 w-5 text-warning" strokeWidth={1.5} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-h2 font-medium text-card-foreground">{pendingADOs.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Completed ADOs
            </CardTitle>
            <div className="rounded-lg bg-success/10 p-2">
              <CheckCircle className="h-5 w-5 text-success" strokeWidth={1.5} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-h2 font-medium text-card-foreground">{adjustedADOs.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* ADO Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending ADOs */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-h3 font-medium text-card-foreground">
              Pending ADOs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingADOs.map((ado) => (
                <div
                  key={ado.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{ado.agent}</p>
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                          {ado.team}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Original Date: {ado.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Reason: {ado.reason}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Assign Off Day
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground"
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Adjusted ADOs */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-h3 font-medium text-card-foreground">
              Adjusted ADOs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adjustedADOs.map((ado) => (
                <div
                  key={ado.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-success/10 p-2">
                      <CheckCircle className="h-5 w-5 text-success" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{ado.agent}</p>
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                          {ado.team}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Original: {ado.date}
                      </p>
                      <p className="text-sm text-success">
                        Completed: {ado.completedDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
