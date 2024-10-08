import type { EntrySchema, EntrySchemaAction } from '../types/schema-type';
import { SchemaType } from '../types/schema-type';

export class EntryEntity implements EntrySchema {
  private _type = SchemaType.ENTRY;
  private _actions: EntrySchemaAction[];
  private _baseUrl: string;

  constructor(baseUrl: string = '/',actions: EntrySchemaAction[]) {
    this._actions = actions;
    this._baseUrl = baseUrl;
  }

  static fromRawObject(rawObject: any): EntryEntity {
    return new EntryEntity(
      rawObject.baseUrl,
      rawObject.actions
    );
  }

  public get actions(): EntrySchemaAction[] {
    return this._actions;
  }

  public get type(): typeof SchemaType.ENTRY {
    return this._type;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }
}
