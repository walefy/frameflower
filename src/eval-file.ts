import fs from 'node:fs';
import { SchemaType, type SchemaTypeValue } from './types/schema-type';
import { EntryProcessor } from './processors/entry-processor';
import { ModelProcessor } from './processors/model-processor';

export class EvalFile {
  private readonly path: string;
  private content: any;
  private _type: SchemaTypeValue;

  constructor(path: string) {
    this.path = path;
    this.content = this.readFile();
    this._type = this.extractType();
  }

  public get type(): SchemaTypeValue {
    return this._type;
  }

  public eval(): Promise<void> {
    return this.callProcessor();
  }

  private readFile(): any {
    return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
  }

  private extractType(): SchemaTypeValue {
    if (!('type' in this.content)) {
      throw new Error('[ERROR] Missing type property in schema file: ' + this.path);
    }

    if (!Object.values(SchemaType).includes(this.content.type)) {
      throw new Error('[ERROR] Invalid type property in schema file: ' + this.path);
    }

    return this.content.type;
  }

  private async callProcessor(): Promise<void> {
    switch (this.type) {
      case SchemaType.ENTRY:
        const entryProcessor = new EntryProcessor(this.content);
        entryProcessor.process();
        break;
      case SchemaType.MODEL:
        const modelProcessor = new ModelProcessor(this.content);
        await modelProcessor.process();
        break;
    }
  }
}
