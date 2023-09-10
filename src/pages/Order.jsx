import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { TablesContext } from "../context/TablesContext";
import CustomButton from "../components/CustomButton";

const Order = () => {
  const { products } = useContext(ProductContext);
  const {tablesOpen, setTablesOpen} = useContext(TablesContext);
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [orderClient, setOrderClient] = useState([]);
  const [numberTable, setNumberTable] = useState("");
  const form = useRef();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search != "") {
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
  }, [search, products]);

  const handleClickAddProduct = (e) => {
    setOrderClient([...orderClient, e]);
    setSearch("");
    form.current.reset();
  };

  const handleClickDelete = (e) => {
    const searchID = orderClient.find((p) => p.code == e.code);
    const newOrder = orderClient.filter((p) => p != searchID);
    setOrderClient(newOrder);
  };

  const handleClickTable = (e) => {
    const searchID = tablesOpen.find((table) => table.code === e);

    if (!searchID) {
      setNumberTable(e);
      setOrderClient([]);
    } else {
      setNumberTable(searchID.code);
      setOrderClient(searchID.order);
      
    }
  };

  const handleClickSave = () => {
    setTablesOpen([...tablesOpen, { code: numberTable, order: orderClient }]);
  };

  return (
    <main className="order-section">
      <section className="tables-section">
        {
        tables.map((table) => (
          (tablesOpen.find((e)=> e.code === table)) 
          ?
        <button onClick={() => handleClickTable(table)} key={table} className="table" style={{backgroundColor:"#fd9800"}}>{table}</button>
         : 
         <button onClick={() => handleClickTable(table)} key={table} className="table" style={{backgroundColor:"#24b624"}}>{table}</button>))}
      </section>

      <section className="form-section">
        <h2 className="header-form">Mesa {numberTable}</h2>
        <form ref={form} className="form-search">
          <label htmlFor="search">Nombre o código del producto</label>
          <input
            id="search"
            onChange={handleChange}
            type="text"
            placeholder="Buscar..."
            autoComplete="off"
          />
          <section className="products-list">
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
          </section>
        </form>

        <section className="client-order-section">
          <h3>Orden del cliente</h3>

          {orderClient.length > 0 ? (
            <div className="order-container">
              <div>
                {orderClient?.map((e, i) => (
                  <article key={i} className="order-article">
                    <p>{e.quantity}</p>
                    <p>
                      <b>{e.name}</b>
                    </p>
                    <p>$ {e.price}</p>
                    <button
                      onClick={() => handleClickDelete(e)}
                      className="btn-delete"
                    >
                      X
                    </button>
                  </article>
                ))}
              </div>
              <div>
                <CustomButton selector={"btn-add"} click={handleClickSave} text={"Guardar"}/>
              </div>
            </div>
          ) : (
            <p>Aún no hay productos ingresados</p>
          )}
        </section>
      </section>
    </main>
  );
};

export default Order;
