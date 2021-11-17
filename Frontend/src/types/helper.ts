export type ValueOf<T> = T[keyof T];
export type ArgsType<T> = T extends (...args: infer U) => any ? U : never;
