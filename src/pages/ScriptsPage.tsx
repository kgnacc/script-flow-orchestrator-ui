
import React, { useState, useEffect } from 'react';
import TreeView from '@/components/TreeView';
import ScriptForm from '@/components/ScriptForm/ScriptForm';
import { Terminal, Server, List } from 'lucide-react';
import { Catalog } from '@/types/catalog';
import { fetchCatalogData, transformCatalogData } from '@/services/catalogService';

const ScriptsPage: React.FC = () => {
  const [catalog, setCatalog] = useState<Catalog>({ categories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCatalogData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCatalogData();
        const transformedData = transformCatalogData(data);
        setCatalog(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error loading catalog data:', err);
        setError('Failed to load catalog data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCatalogData();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-base font-medium flex items-center">
            <List className="mr-2 h-4 w-4" />
            Script Catalog
          </h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-2.75rem)]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading catalog...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <TreeView catalog={catalog} />
          )}
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <ScriptForm />
      </main>
    </div>
  );
};

export default ScriptsPage;
