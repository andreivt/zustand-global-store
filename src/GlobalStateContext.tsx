import React, { createContext, FunctionComponent } from "react";
import { IGlobalStore } from ".";

export const GlobalStateContext = createContext<IGlobalStore>({
  getStore: () => undefined,
  serialize: () => undefined,
});

interface IGlobalStateContextProviderProps {
  store: IGlobalStore;
}

export const GlobalStateContextProvider: FunctionComponent<
  IGlobalStateContextProviderProps
> = ({ store, children }) => (
  <GlobalStateContext.Provider value={store}>
    {children}
  </GlobalStateContext.Provider>
);
