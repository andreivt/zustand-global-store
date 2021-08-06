import { pick as _pick } from "lodash";
import create, { State } from "zustand";
import shallow from "zustand/shallow";
import { BaseStore, BaseStoreConstructorType, useStatelessStore } from "./";

export function useStatefullStore<S extends State, T extends BaseStore<S>>(
  store: BaseStoreConstructorType<S, T>,
  selectors?: (keyof S)[]
): [Pick<S, keyof S>, T] {
  const _store = useStatelessStore(store);

  const useCurrentStore = create(_store.createdStore());

  const state = useCurrentStore(
    (state) => (selectors ? _pick(state, selectors) : state),
    shallow
  );

  return [state, _store];
}
