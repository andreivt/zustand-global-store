import { createContext, FunctionComponent } from "react";
import { IGlobalStore } from ".";

export const ZuStateContext = createContext<IGlobalStore>({
  getStore: () => undefined,
  serialize: () => undefined,
});

interface IZuStateContextProviderProps {
  globalStore: IGlobalStore;
}

export const ZuStateContextProvider: FunctionComponent<IZuStateContextProviderProps> =
  ({ globalStore, children }) => (
    <ZuStateContext.Provider value={globalStore}>
      {children}
    </ZuStateContext.Provider>
  );
