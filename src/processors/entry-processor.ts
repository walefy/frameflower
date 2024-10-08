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

  private defineRoutes(): void {
    for (const action of this._entry.actions) {
      const method = action.method.toLowerCase() as HttpMethodValue;

      const modelInstance = ModelProcessor.modelInstances.find(model => model.name === action.model);

      if (!modelInstance) {
        throw new Error('[ERROR] Model not defined: ' + action.model);
      }

      this._router[method](action.endpoint, async (req, res) => {
        const data = await modelInstance.model[action.action]({ request: req, ...action.params });
        res.json({ data });
      });
    }
  }

  public process(): void {
    const name = this._entry.baseUrl.split('/')[1] || 'unknown';
    console.log(`[LOG] Processing ${name} entry...`);
    this.defineRoutes();
    global.app.use(this._entry.baseUrl, this._router);
  }
}
