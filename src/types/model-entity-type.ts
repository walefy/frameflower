import type { Request } from 'express';

export type DefaultArgs = {
  request: Request;
};

export type ListArgs = DefaultArgs & {
  fields?: string[];
}

export type SupportedFieldTypes = "string" | "number" | "boolean" | "Date";

export type CreateArgs = DefaultArgs & {
  payload: { body: { [key: string]: SupportedFieldTypes } };
}

export interface ModelContract {
  initialize(): Promise<void>;
  list(args: ListArgs): Promise<any>;
  create(args: CreateArgs): Promise<void>;
}
