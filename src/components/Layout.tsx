import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Calendar,
  FileEdit,
  Gift,
  CalendarDays,
  Users,
  LogOut,
} from 'lucide-react';
import { Button } from './ui/button';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/main-roster', label: 'Main Roster', icon: Calendar },
    { path: '/draft-roster', label: 'Draft Roster', icon: FileEdit },
    { path: '/ado-tracker', label: 'ADO Tracker', icon: Gift },
    { path: '/holidays', label: 'Holidays', icon: CalendarDays },
    { path: '/agents', label: 'Agents', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Roster Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Workforce Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
