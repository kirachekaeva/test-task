import TableStore from "@/modules/Table/store/TableStore";
import { createContext, ReactNode } from "react";

export const tableStore = new TableStore();

interface StoreContextProps{
    tableStore: TableStore;
}

export const StoreContext = createContext<StoreContextProps>({
    tableStore
});

interface StoreProviderProps{
    children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{ tableStore }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;