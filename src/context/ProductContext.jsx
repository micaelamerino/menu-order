import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ProductContext = createContext();

const DataProducts = ({ children }) => {

  const [products, setProducts] = useLocalStorage("products", [])

  return (
    <ProductContext.Provider
      value={{
        products, setProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default DataProducts;
