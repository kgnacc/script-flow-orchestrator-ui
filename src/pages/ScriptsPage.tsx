
import React from 'react';
import { catalogData } from '@/data/catalogData';
import TreeView from '@/components/TreeView';
import ScriptForm from '@/components/ScriptForm/ScriptForm';

const ScriptsPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-72 flex-shrink-0">
        <TreeView catalog={catalogData} />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <ScriptForm />
      </main>
    </div>
  );
};

export default ScriptsPage;
