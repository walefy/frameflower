import { ModelEntity } from '../entities/model-entity';
import { ModelEntitySchema } from '../entities/model-entity-schema';
import type { ModelContract } from '../types/model-entity-type';

export type modelInstancesType = {name: string, model: ModelContract}[];

export class ModelProcessor {
  static modelInstances: modelInstancesType = [];
  private _model: ModelEntitySchema;

  constructor(rawObject: any) {
    this._model = ModelEntitySchema.fromRawObject(rawObject);
  }

  public get model(): ModelEntitySchema {
    return this._model;
  }

  private createModelInstance(): ModelContract {
    return new ModelEntity(this._model.name);
  }

  public process(): void {
    console.log('[LOG] Processing model...');
    const modelInstance = this.createModelInstance();
    ModelProcessor.modelInstances.push({
      name: this._model.name,
      model: modelInstance,
    });
  }
}
