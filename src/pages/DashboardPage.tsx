import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Users, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalAgents: 0,
    publishedRosters: 0,
    draftRosters: 0,
    pendingADOs: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [agentsRes, rostersRes, adoRes] = await Promise.all([
        supabase.from('agents').select('id', { count: 'exact', head: true }),
        supabase.from('rosters').select('id, status', { count: 'exact' }),
        supabase.from('ado_records').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);

      const published = rostersRes.data?.filter(r => r.status === 'published').length || 0;
      const draft = rostersRes.data?.filter(r => r.status === 'draft').length || 0;

      setStats({
        totalAgents: agentsRes.count || 0,
        publishedRosters: published,
        draftRosters: draft,
        pendingADOs: adoRes.count || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const statCards = [
    {
      label: 'Total Agents',
      value: stats.totalAgents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: 'Published Rosters',
      value: stats.publishedRosters,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'Draft Rosters',
      value: stats.draftRosters,
      icon: Calendar,
      color: 'bg-yellow-500',
    },
    {
      label: 'Pending ADOs',
      value: stats.pendingADOs,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your roster management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/draft-roster"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-900">Create Draft Roster</p>
            <p className="text-sm text-gray-500 mt-1">Upload CSV or generate new</p>
          </a>

          <a
            href="/holidays"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-900">Manage Holidays</p>
            <p className="text-sm text-gray-500 mt-1">Add government holidays</p>
          </a>

          <a
            href="/ado-tracker"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-900">Track ADOs</p>
            <p className="text-sm text-gray-500 mt-1">Manage adjusted day offs</p>
          </a>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Setup Required</h3>
        <p className="text-sm text-yellow-800 mb-4">
          To use this application with real data, you need to:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
          <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
          <li>Run the SQL schema from <code className="bg-yellow-100 px-1 rounded">SUPABASE_SCHEMA.sql</code></li>
          <li>Copy your project URL and anon key</li>
          <li>Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file with your credentials</li>
          <li>Restart the development server</li>
        </ol>
      </div>
    </div>
  );
}
