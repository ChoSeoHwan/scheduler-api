import { AnySchema } from 'joi';

export type ValidateSchema<T> = Record<keyof T, AnySchema>;
