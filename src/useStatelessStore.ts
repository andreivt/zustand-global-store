import { useContext } from "react";
import { ZuStateContext } from ".";

export type StoreConstructorType<T> = (new (
  initialState: any,
  _services: any
) => T) & { storeName: string };

export function useStatelessStore<T>(store: StoreConstructorType<T>): T {
  return useContext(ZuStateContext).getStore(store);
}
