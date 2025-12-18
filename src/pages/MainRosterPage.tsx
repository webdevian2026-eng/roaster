import React from 'react';
import { Lock } from 'lucide-react';

export default function MainRosterPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Main Roster</h1>
          <p className="text-gray-600 mt-2">View published roster (read-only)</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Lock className="w-5 h-5" />
          <span className="text-sm font-medium">Read Only</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Lock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Published Roster</h2>
        <p className="text-gray-600 mb-6">
          There is no published roster for the current month. Create and publish a draft roster to view it here.
        </p>
        <a
          href="/draft-roster"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Draft Roster
        </a>
      </div>
    </div>
  );
}
