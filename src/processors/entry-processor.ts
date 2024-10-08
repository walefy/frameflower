import { Router } from 'express';
import { EntryEntity } from '../entities/entry-entity';
import type { HttpMethodValue } from '../types/schema-type';

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
      this._router[method](action.endpoint, (_req, res) => {
        res.json({ action });
      });
    }
  }

  public process(): void {
    console.log('Processing entry...');
    this.defineRoutes();
    global.app.use(this._entry.baseUrl, this._router);
  }
}
