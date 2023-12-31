import { useContext, useEffect, useRef } from "react";
import { TablesContext } from "../../context/TablesContext";
import { ProductContext } from "../../context/ProductContext";
import { v4 as uuidv4 } from "uuid";

const SearchForm = () => {
  const form = useRef();
  const { setAddProducts, orderClient, setOrderClient } =
    useContext(TablesContext);
  const { products } = useContext(ProductContext);

  const { filterProducts, setFilterProducts, search, setSearch } =
    useContext(ProductContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setAddProducts(true);
  };

  useEffect(() => {
    if (search !== "") {
      const searchCode = products.filter((p) => p.code == search);
      const searchName = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      if (searchName.length > 0) {
        setFilterProducts(searchName);
      } else if (searchCode.length > 0) {
        setFilterProducts(searchCode);
      }
    } else {
      setFilterProducts([]);
    }
  }, [search, products, setFilterProducts]);

  const handleClickAddProduct = (e) => {
    const product = { ...e };
    const newID = { id: uuidv4() };
    const newProduct = Object.assign(product, newID);
    setOrderClient([...orderClient, newProduct]);
    setSearch("");
    form.current.reset();
  };

  return (
    <form ref={form} className="form-search">
      <h2>Nombre o código del producto</h2>
      <input
        id="search"
        onChange={handleChange}
        type="text"
        placeholder="Buscar..."
        autoComplete="off"
        value={search}
      />
      <div className="products-list">
        {filterProducts.length > 0 &&
          filterProducts?.map((e) => (
            <div
              onClick={() => handleClickAddProduct(e)}
              key={e.code}
              className="container-products-list"
            >
              <p>
                <b>{e.code}</b>
              </p>
              <p>{e.name}</p>
            </div>
          ))}
      </div>
    </form>
  );
};

export default SearchForm;
