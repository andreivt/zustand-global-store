import { hashCode, StoreConstructorType } from ".";

export interface IGlobalStore {
  getStore: <T>(store: StoreConstructorType<T>) => T;
  serialize: () => Record<string, object>;
}

type CreateGlobalStoreArgs<Data, Services> = {
  data: Data;
  services: Services;
};

export function createGlobalStore<D, S>({
  data,
  services,
}: CreateGlobalStoreArgs<D, S>): IGlobalStore {
  const stores: Record<string, any> = {};

  const initStore = <T>(newStore: StoreConstructorType<T>) => {
    const hashedName = hashCode(newStore.storeName);

    return (stores[hashedName] = new newStore(data[hashedName], services));
  };

  return {
    getStore: <T>(store: StoreConstructorType<T>) =>
      stores[hashCode(store.storeName)] || initStore(store),
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
