import { AnySchema } from 'joi';

export type Nullable<T> = T | null;

export type ValidateSchema<T> = Record<keyof T, AnySchema>;
