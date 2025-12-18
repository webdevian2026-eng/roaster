import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Clock, Palmtree, Settings, LogOut, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/rosters', label: 'Rosters', icon: Calendar },
  { path: '/ado-tracker', label: 'ADO Tracker', icon: Clock },
  { path: '/holidays', label: 'Holidays', icon: Palmtree },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-primary text-primary-foreground
          transition-all duration-250 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 py-4">
          {!collapsed && (
            <h1 className="text-xl font-medium text-primary-foreground">RosterPro</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={mobileOpen ? onMobileClose : onToggle}
            className="bg-transparent text-primary-foreground hover:bg-secondary hover:text-secondary-foreground ml-auto"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : collapsed ? (
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
            )}
          </Button>
        </div>

        <Separator className="bg-secondary" />

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => mobileOpen && onMobileClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-primary-foreground transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground ${
                  isActive ? 'bg-secondary text-secondary-foreground' : ''
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className="h-6 w-6 flex-shrink-0" strokeWidth={1.5} />
              {!collapsed && <span className="text-base font-normal">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <Separator className="bg-secondary" />

        {/* User Section */}
        <div className="p-4">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-secondary text-secondary-foreground">JD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-foreground truncate">John Doe</p>
                <p className="text-xs text-primary-foreground/80 truncate">Admin</p>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            className={`mt-3 w-full bg-transparent text-primary-foreground hover:bg-secondary hover:text-secondary-foreground ${
              collapsed ? 'px-0' : ''
            }`}
          >
            <LogOut className="h-5 w-5" strokeWidth={1.5} />
            {!collapsed && <span className="ml-2 text-base font-normal">Log Out</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
