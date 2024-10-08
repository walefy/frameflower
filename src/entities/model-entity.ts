import type { ModelContract } from '../types/model-entity-type';

export class ModelEntity implements ModelContract {
  private static db: any = {
    user: [],
    post: [],
  }; // This is a dummy database, keys are table names, values are arrays of objects
  private _name: string;

  constructor(name: string) {
    this._name = name;
    const table = ModelEntity.db[this._name as typeof ModelEntity.db[keyof typeof ModelEntity.db]];
    table.push({ name: 'test user', email: 'test@test.com'});
  }

  public get modelName(): string {
    return this._name;
  }

  list(): Promise<any> {
    return ModelEntity.db[this._name as typeof ModelEntity.db[keyof typeof ModelEntity.db]];
  }
}
