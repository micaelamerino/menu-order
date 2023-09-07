import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TablesContext = createContext();

const TablesData = ({ children }) => {
  const [tablesOpen, setTablesOpen] = useLocalStorage("tablesOpen", []);
  return (
    <TablesContext.Provider value={{ tablesOpen, setTablesOpen }}>
      {children}
    </TablesContext.Provider>
  );
};
export default TablesData;
