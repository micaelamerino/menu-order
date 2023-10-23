import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ProductContext = createContext();

const DataProducts = ({ children }) => {
  const [products, setProducts] = useLocalStorage("products", []);
  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        filterProducts,
        setFilterProducts,
        search,
        setSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default DataProducts;
