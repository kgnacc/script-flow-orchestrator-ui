
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Category, Script, ScriptAction } from '../types/catalog';

interface AppContextType {
  selectedCategory: Category | null;
  selectedScript: Script | null;
  selectedAction: ScriptAction | null;
  scriptOutput: string | null;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedScript: (script: Script | null) => void;
  setSelectedAction: (action: ScriptAction | null) => void;
  setScriptOutput: (output: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [selectedAction, setSelectedAction] = useState<ScriptAction | null>(null);
  const [scriptOutput, setScriptOutput] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        selectedScript,
        selectedAction,
        scriptOutput,
        setSelectedCategory,
        setSelectedScript,
        setSelectedAction,
        setScriptOutput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
