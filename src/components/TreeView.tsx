
import React, { useState } from 'react';
import { Catalog, Category, Script } from '@/types/catalog';
import { ChevronDown, ChevronRight, FolderOpen, Folder, FileText } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface TreeNodeProps {
  category: Category;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ category, level }) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const { setSelectedCategory, setSelectedScript, selectedCategory, selectedScript } = useAppContext();
  
  const hasChildren = category.children?.length || category.scripts?.length;

  const handleCategoryClick = () => {
    setIsOpen(!isOpen);
    setSelectedCategory(category);
    setSelectedScript(null);
  };

  const handleScriptClick = (script: Script, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedScript(script);
  };

  const isCategorySelected = selectedCategory?.id === category.id;

  return (
    <div className="pl-2">
      <div 
        className={cn(
          "flex items-center py-1.5 px-2 cursor-pointer rounded-md hover:bg-gray-100",
          isCategorySelected && "bg-blue-50 text-blue-700 font-medium"
        )}
        onClick={handleCategoryClick}
      >
        <div className="w-5 h-5 flex items-center justify-center mr-1">
          {hasChildren && (
            isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </div>
        <div className="w-5 h-5 flex items-center justify-center mr-2">
          {isOpen ? <FolderOpen size={16} className="text-amber-500" /> : <Folder size={16} className="text-amber-500" />}
        </div>
        <span className="text-sm">{category.name}</span>
      </div>
      
      {isOpen && (
        <div className={`ml-4 pl-2 border-l border-gray-200`}>
          {category.scripts?.map((script) => (
            <div 
              key={script.id}
              className={cn(
                "flex items-center py-1.5 px-2 cursor-pointer rounded-md hover:bg-gray-100",
                selectedScript?.id === script.id && "bg-blue-100 text-blue-800 font-medium"
              )}
              onClick={(event) => handleScriptClick(script, event)}
            >
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <FileText size={16} className="text-blue-500" />
              </div>
              <span className="text-sm">{script.name}</span>
            </div>
          ))}
          
          {category.children?.map((child) => (
            <TreeNode key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  catalog: Catalog;
}

const TreeView: React.FC<TreeViewProps> = ({ catalog }) => {
  return (
    <div className="h-full border-r bg-white p-2">
      <h3 className="font-medium text-lg text-gray-700 p-2 mb-2">Script Catalog</h3>
      <div className="tree-view-container">
        {catalog.categories.map((category) => (
          <TreeNode key={category.id} category={category} level={0} />
        ))}
      </div>
    </div>
  );
};

export default TreeView;
