import fs from 'node:fs';
import { SchemaType, type SchemaTypeValue } from './types/schema-type';
import { EntryProcessor } from './processors/entry-processor';

export class EvalFile {
  private readonly path: string;
  private content: any;
  public readonly type: SchemaTypeValue;

  constructor(path: string) {
    this.path = path;
    this.content = this.readFile();
    this.type = this.extractType();
    this.callProcessor();
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

  private callProcessor(): void {
    switch (this.type) {
      case SchemaType.ENTRY:
        const processor = new EntryProcessor(this.content);
        processor.process();
        break;
      case SchemaType.MODEL:
        console.log('Processing model...');
        break;
    }
  }
}
