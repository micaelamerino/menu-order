import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TablesContext = createContext();

const TablesData = ({ children }) => {
  const [tablesOpen, setTablesOpen] = useLocalStorage("tablesOpen", []);
  const [sales, setSales] = useLocalStorage("sales", []);
  
  return (
    <TablesContext.Provider
      value={{ tablesOpen, setTablesOpen, sales, setSales }}
    >
      {children}
    </TablesContext.Provider>
  );
};
export default TablesData;
