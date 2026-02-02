export type InferQueryFn<T extends (...params: any[]) => any> =
  () => ReturnType<T>;
