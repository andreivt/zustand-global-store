import hash from "object-hash";
import {} from ".";
import { BaseStoreConstructorType } from "./BaseStore";

export interface IGlobalStore {
  getStore: <S, T>(store: BaseStoreConstructorType<S, T>) => T;
  serialize: () => Record<string, object>;
}

type CreateGlobalStoreArgs<D, S> = { data: D; services: S };

export function createGlobalStore<D, S>({
  data,
  services,
}: CreateGlobalStoreArgs<D, S>): IGlobalStore {
  const stores: Record<string, any> = {};

  const initStore = <S, T>(newStore: BaseStoreConstructorType<S, T>) => {
    const hashedName = hash(newStore.storeName);

    return (stores[hashedName] = new newStore(data[hashedName], services));
  };

  return {
    getStore: <S, T>(store: BaseStoreConstructorType<S, T>) =>
      stores[hash(store.storeName)] || initStore(store),
    serialize: () =>
      Object.keys(stores).reduce(
        (acc, storeName) => ({
          ...acc,
          [storeName]: stores[storeName].storeState,
        }),
        {}
      ),
  };
}
