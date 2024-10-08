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

  private async createModelInstance(): Promise<ModelContract> {
    const modelInstance = new ModelEntity(this._model.name);
    await modelInstance.initialize();
    return modelInstance;
  }

  public async process(): Promise<void> {
    console.log(`[LOG] Processing ${this._model.name} model...`);
    const modelInstance = await this.createModelInstance();
    ModelProcessor.modelInstances.push({
      name: this._model.name,
      model: modelInstance,
    });
  }
}
