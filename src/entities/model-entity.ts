import type { CreateArgs, ListArgs, ModelContract } from '../types/model-entity-type';

export class ModelEntity implements ModelContract {
  private static db: any = {}; // This is a dummy database, keys are table names, values are arrays of objects
  private _name: string;
  private _table: any;

  constructor(name: string) {
    this._name = name;
    this._table = ModelEntity.db[this._name as keyof typeof ModelEntity.db];
  }

  public get modelName(): string {
    return this._name;
  }

  public async initialize(): Promise<void> {
    console.log(`[LOG] Initializing ${this._name} model...`);
    
    if (!this._table) {
      // TODO: call create table
      ModelEntity.db[this._name] = [];
    }
  }

  public async list(args: ListArgs): Promise<ArrayLike<unknown>> {
    // SELECT ...args.fields FROM this._name
    const table: Array<Record<string, unknown>> = ModelEntity.db[this._name as keyof typeof ModelEntity.db];
    const data = table.map((row) => {
      if (args.fields) {
        const filteredRow: Record<string, unknown> = {};
        args.fields.forEach((field) => {
          filteredRow[field] = row[field];
        });
        return filteredRow;
      }
      return row;
    });

    return data;
  }

  public async create(args: CreateArgs): Promise<void> {
    const keys = Object.keys(args.payload.body);
    const values: Record<string, any> = {};

    for (const key of keys) {
      const fieldValue = args.request.body[key];
      
      if(typeof fieldValue !== args.payload.body[key]) {
        throw new Error(`[ERROR] Field ${key} is not of type ${args.payload.body[key]}`);
      }

      values[key] = args.request.body[key];
    }

    ModelEntity.db[this._name].push(values);
  }

}
