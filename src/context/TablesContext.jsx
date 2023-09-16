import { createContext, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TablesContext = createContext();

const TablesData = ({ children }) => {
  const [tablesOpen, setTablesOpen] = useLocalStorage("tablesOpen", []);
  const [sales, setSales] = useLocalStorage("sales", []);
  const [addProducts, setAddProducts] = useState(null);
  const [orderClient, setOrderClient] = useState([]);
  const [numberTable, setNumberTable] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [peopleQuantity, setPeopleQuantity] = useState(0);
  const formFinish = useRef();

  return (
    <TablesContext.Provider
      value={{
        tablesOpen,
        setTablesOpen,
        sales,
        setSales,
        addProducts,
        setAddProducts,
        orderClient,
        setOrderClient,
        numberTable,
        setNumberTable,
        totalAmount,
        setTotalAmount,
        peopleQuantity,
        setPeopleQuantity,
        formFinish
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};
export default TablesData;
