/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types */
type ClassConstructor<T = any> = { new (...args: any[]): T };
type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;

export type Constructor<T = any> = ClassConstructor<T> | AbstractConstructor<T>;
