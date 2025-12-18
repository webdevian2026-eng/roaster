import React, { useState } from 'react';
import { Upload, Shuffle, Save, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { parseRosterFile } from '../utils/csvParser';

export default function DraftRosterPage() {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await parseRosterFile(file);
      console.log('Parsed data:', data);
      alert(`Successfully parsed ${data.agents.length} agents and ${data.entries.length} entries`);
    } catch (error: any) {
      alert('Error parsing file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Draft Roster</h1>
        <p className="text-gray-600 mt-2">Create, edit, and manage draft rosters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Upload CSV</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload an Excel/CSV file with roster data
          </p>
          <label className="block">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full"
              disabled={uploading}
              onClick={() => document.querySelector('input[type="file"]')?.click()}
            >
              {uploading ? 'Uploading...' : 'Choose File'}
            </Button>
          </label>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Shuffle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Generate Roster</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Auto-generate roster based on business rules
          </p>
          <Button variant="outline" className="w-full">
            Generate
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Send className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Publish Roster</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Publish draft to make it the main roster
          </p>
          <Button className="w-full" disabled>
            Publish
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No draft roster loaded. Upload a file or generate a new roster to get started.</p>
      </div>
    </div>
  );
}
