import { SchemaType, type ModelSchema, type ModelSchemaDefinition } from '../types/schema-type';

export class ModelEntity implements ModelSchema {
  private _type = SchemaType.MODEL;
  private _name: string;
  private _definition: ModelSchemaDefinition;

  constructor(name: string, definition: ModelSchemaDefinition) {
    this._name = name;
    this._definition = definition;
  }

  static fromRawObject(rawObject: any): ModelEntity {
    return new ModelEntity(
      rawObject.name,
      rawObject.definition
    );
  }

  public get name(): string {
    return this._name;
  }

  public get definition(): ModelSchemaDefinition {
    return this._definition;
  }

  public get type(): typeof SchemaType.MODEL {
    return this._type;
  }
}