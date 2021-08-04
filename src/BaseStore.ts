import { merge as _merge } from "lodash";
import { SetState, State, StoreApi, Subscribe } from "zustand";
import create from "zustand/vanilla";

export abstract class BaseStore<S extends State> {
  protected _store: StoreApi<S>;

  public setState: SetState<S>;
  public subscribe: Subscribe<S>;

  constructor(initialState: S | undefined, defaultState: Partial<S>) {
    this._store = create(() => _merge({}, defaultState, initialState));

    this.setState = this._store.setState;
    this.subscribe = this._store.subscribe;
  }

  createdStore = () => {
    return this._store;
  };

  get storeState() {
    return this._store.getState();
  }
}
