
export interface CatalogOwner {
  email: string;
  project: string;
  team: string[];
  teamID: number;
  defineDgroupname: string;
  defineDgroupname2?: string;
}

export interface CatalogMeta {
  type: string;
  name: string;
  category: string;
  platforms: string[];
  description: string;
  Owner: CatalogOwner;
  path: string;
}

export interface ActionOption {
  type: string;
  required: "yes" | "no";
  choices: string[];
}

export interface FieldOption {
  type: string;
  required: "yes" | "no";
  define_action_arg: string[];
}

export interface Command {
  name: string;
  command: string;
  actionT: "r" | "d";
}

export interface CatalogItem {
  meta: CatalogMeta;
  options: Array<{
    action?: ActionOption;
    [key: string]: FieldOption | ActionOption | undefined;
  }>;
  commands: Command[];
}

export type CatalogData = CatalogItem[];
