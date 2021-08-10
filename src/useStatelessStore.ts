import { useContext } from "react";
import { BaseStoreConstructorType, GlobalStateContext } from ".";

export function useStatelessStore<S, T>(store: BaseStoreConstructorType<S, T>) {
  return useContext(GlobalStateContext).getStore(store);
}
