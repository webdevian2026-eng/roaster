import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Menu, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/rosters': 'Rosters',
  '/ado-tracker': 'ADO Tracker',
  '/holidays': 'Holidays',
  '/settings': 'Settings',
};

export default function TopBar({ onMobileMenuToggle }: TopBarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const breadcrumbs = [
    'Home',
    routeLabels[location.pathname] || 'Page',
  ];

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-8">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMobileMenuToggle}
        className="bg-transparent text-foreground hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Toggle mobile menu"
      >
        <Menu className="h-6 w-6" strokeWidth={1.5} />
      </Button>

      {/* Breadcrumbs */}
      <div className="hidden items-center gap-2 md:flex">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
            <span className={`text-sm ${index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {crumb}
            </span>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-1 items-center justify-end gap-4 ml-4">
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input
            type="search"
            placeholder="Search agents or teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background text-foreground border-input"
          />
        </div>

        <Select defaultValue="current">
          <SelectTrigger className="w-32 bg-background text-foreground border-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">This Month</SelectItem>
            <SelectItem value="next">Next Month</SelectItem>
            <SelectItem value="last">Last Month</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-32 bg-background text-foreground border-input hidden md:flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            <SelectItem value="team-a">Team A</SelectItem>
            <SelectItem value="team-b">Team B</SelectItem>
            <SelectItem value="team-c">Team C</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
