import React from 'react';
import { Users, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function AgentsPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
          <p className="text-gray-600 mt-2">Manage your workforce</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Agents Found</h2>
        <p className="text-gray-600 mb-6">
          Add agents manually or import them from a roster CSV
        </p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Your First Agent
        </Button>
      </div>
    </div>
  );
}
