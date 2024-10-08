import { Router } from 'express';
import { EntryEntity } from '../entities/entry-entity';
import type { HttpMethodValue } from '../types/schema-type';
import { ModelProcessor } from './model-processor';

export class EntryProcessor {
  private _entry: EntryEntity;
  private _router = Router();

  constructor(rawObject: any) {
    this._entry = EntryEntity.fromRawObject(rawObject);
  }

  public get entry(): EntryEntity {
    return this._entry;
  }

  public get router(): Router {
    return this._router;
  }

  private async defineRoutes(): Promise<void> {
    for (const action of this._entry.actions) {
      const method = action.method.toLowerCase() as HttpMethodValue;

      const modelInstance = ModelProcessor.modelInstances.find(model => model.name === action.model);

      if (!modelInstance) {
        throw new Error('[ERROR] Model not defined: ' + action.model);
      }

      const data = await modelInstance.model[action.action]();

      this._router[method](action.endpoint, (_req, res) => {
        res.json({ data });
      });
    }
  }

  public process(): void {
    console.log('[LOG] Processing entry...');
    this.defineRoutes();
    global.app.use(this._entry.baseUrl, this._router);
  }
}
