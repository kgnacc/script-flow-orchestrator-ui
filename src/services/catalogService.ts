
import { CatalogData, CatalogItem } from '@/types/catalogJson';
import { Catalog, Category, Script, ScriptAction, ScriptParameter } from '@/types/catalog';

// Function to fetch catalog data from the JSON file
export const fetchCatalogData = async (): Promise<CatalogData> => {
  try {
    const response = await fetch('/catalog.json');
    if (!response.ok) {
      throw new Error('Failed to fetch catalog data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    return [];
  }
};

// Function to transform catalog JSON data to our app's data structure
export const transformCatalogData = (catalogData: CatalogData): Catalog => {
  // Map to store categories by path for easy lookup
  const categoryMap = new Map<string, Category>();
  
  // First pass: create all categories from paths
  catalogData.forEach((item) => {
    const pathParts = item.meta.path.split('/');
    let currentPath = '';
    
    pathParts.forEach((part, index) => {
      const isLeaf = index === pathParts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      
      if (!categoryMap.has(currentPath)) {
        categoryMap.set(currentPath, {
          id: currentPath,
          name: part,
          children: [],
          scripts: [],
        });
      }
      
      // If not leaf node and the path exists, make sure it has a children array
      if (!isLeaf && categoryMap.has(currentPath) && !categoryMap.get(currentPath)!.children) {
        const category = categoryMap.get(currentPath)!;
        category.children = [];
      }
    });
  });
  
  // Second pass: establish parent-child relationships
  categoryMap.forEach((category, path) => {
    const lastSlashIndex = path.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      const parentPath = path.substring(0, lastSlashIndex);
      const parentCategory = categoryMap.get(parentPath);
      if (parentCategory && parentCategory.children) {
        parentCategory.children.push(category);
      }
    }
  });
  
  // Third pass: add scripts to their respective categories
  catalogData.forEach((item) => {
    const script = transformToScript(item);
    const category = categoryMap.get(item.meta.path);
    if (category) {
      if (!category.scripts) {
        category.scripts = [];
      }
      category.scripts.push(script);
    }
  });
  
  // Filter to get only top-level categories
  const topLevelCategories = Array.from(categoryMap.values())
    .filter(category => !category.id.includes('/'));
  
  return {
    categories: topLevelCategories
  };
};

// Transform a catalog item to a Script object
const transformToScript = (item: CatalogItem): Script => {
  // Find the action options from the options array
  const actionOption = item.options.find(opt => 'action' in opt)?.action;
  const choices = actionOption?.choices || [];
  
  // Create action objects
  const actions: ScriptAction[] = choices.map(choice => {
    const command = item.commands.find(cmd => cmd.name === choice);
    
    // Get parameters that should be shown for this action
    const parameters: ScriptParameter[] = [];
    
    item.options.forEach(opt => {
      // Skip the action option itself
      if ('action' in opt) return;
      
      const fieldName = Object.keys(opt)[0];
      const field = opt[fieldName] as any;
      
      // Check if this field should be shown for the current action choice
      if (field.define_action_arg && field.define_action_arg.includes(choice)) {
        parameters.push({
          id: fieldName,
          name: fieldName,
          label: fieldName, // You might want a better label
          type: mapFieldType(field.type),
          required: field.required === 'yes',
        });
      }
    });
    
    return {
      id: choice,
      name: choice,
      endpoint: command?.command || '/api/default',
      method: 'POST',
      description: `Execute ${choice} command`,
      parameters,
    };
  });
  
  return {
    id: item.meta.name,
    name: item.meta.name,
    description: item.meta.description,
    category: item.meta.category,
    actions,
  };
};

// Map field types from catalog to our app's types
const mapFieldType = (type: string): "text" | "number" | "boolean" | "select" | "multiselect" | "textarea" => {
  switch (type.toLowerCase()) {
    case 'num':
    case 'number':
      return 'number';
    case 'bool':
    case 'boolean':
      return 'boolean';
    case 'select':
      return 'select';
    case 'multiselect':
      return 'multiselect';
    case 'textarea':
      return 'textarea';
    case 'str':
    default:
      return 'text';
  }
};
