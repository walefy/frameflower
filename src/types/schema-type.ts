export const SchemaType = {
  ENTRY: 'entry',
  MODEL: 'model',
} as const;

export type SchemaTypeValue = typeof SchemaType[keyof typeof SchemaType];

export const HttpMethods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
} as const;

export type HttpMethodValue = typeof HttpMethods[keyof typeof HttpMethods];

export const EntrySchemaActionType = {
  LIST: 'list',
} as const;

export type EntrySchemaAction = {
  endpoint: string;
  method: typeof HttpMethods[keyof typeof HttpMethods];
  action: typeof EntrySchemaActionType[keyof typeof EntrySchemaActionType];
  fields: string[];
  model: string;
};

export interface EntrySchema {
  type: typeof SchemaType.ENTRY;
  baseUrl?: string;
  actions: EntrySchemaAction[];
}

export type ModelSchemaDefinitionItem = {
  type: string;
  required: boolean;
  default?: unknown;
};

export type ModelSchemaDefinition = {
  [key: string]: ModelSchemaDefinitionItem;
};

export interface ModelSchema {
  type: typeof SchemaType.MODEL;
  name: string;
  definition: ModelSchemaDefinition;
}
