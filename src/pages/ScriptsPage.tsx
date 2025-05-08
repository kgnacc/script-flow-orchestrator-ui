
import React from 'react';
import { catalogData } from '@/data/catalogData';
import TreeView from '@/components/TreeView';
import ScriptForm from '@/components/ScriptForm/ScriptForm';
import { Terminal, Server, List } from 'lucide-react';

const ScriptsPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-72 flex-shrink-0 border-r border-gray-200 bg-gray-50">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium flex items-center">
            <List className="mr-2 h-5 w-5" />
            Script Catalog
          </h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
          <TreeView catalog={catalogData} />
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <ScriptForm />
      </main>
    </div>
  );
};

export default ScriptsPage;
