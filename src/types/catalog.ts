
export interface ScriptParameter {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'multiselect' | 'textarea';
  required: boolean;
  default?: string | number | boolean | string[];
  options?: { label: string; value: string }[];
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    errorMessage?: string;
  };
}

export interface ScriptAction {
  id: string;
  name: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  parameters: ScriptParameter[];
}

export interface Script {
  id: string;
  name: string;
  description: string;
  category: string;
  actions: ScriptAction[];
}

export interface Category {
  id: string;
  name: string;
  children?: Category[];
  scripts?: Script[];
}

export interface Catalog {
  categories: Category[];
}
