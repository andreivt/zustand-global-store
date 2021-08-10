export type BaseStoreConstructorType<S, T> = (new (
  initialState: S | undefined,
  services: any
) => T) & {
  storeName: string;
};

export interface IGlobalStore {
  getStore: <S, T>(store: BaseStoreConstructorType<S, T>) => T;
  serialize: () => Record<string, object>;
}
