import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const Order = () => {
  const { products } = useContext(ProductContext);
  let tables = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [orderClient, setOrderClient] = useState([]);
  const form = useRef();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search != "") {
      const searchProduct = products.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      );
      if (searchProduct.length > 0) {
        setFilterProducts(searchProduct);
      }
    } else {
      setFilterProducts([]);
    }
  }, [search, products]);

  const handleClick = (e) => {
    setOrderClient([...orderClient, e]);
    setSearch("");
    form.current.reset();
  };

  return (
    <main className="order-section">
      <section className="tables-section">
        {tables.map((e) => (
          <div key={e} className="table">
            <span>{e}</span>
          </div>
        ))}
      </section>
      <section className="dataTables-section">
        <h2 className="header-form">Mesa</h2>
        <form ref={form} className="form-search">
          <label>Nombre del producto</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Buscar producto..."
            autoComplete="off"
          />
          <div className="products-list">
            {filterProducts.length > 0 &&
              filterProducts?.map((e) => (
                <p onClick={() => handleClick(e)} key={e.codigo}>
                  {e.nombre}
                </p>
              ))}
          </div>
        </form>

        <section className="order-client">
          <h3>Orden del cliente</h3>
          {orderClient.length > 0 ? (
            orderClient?.map((e) => (
              <article key={e.codigo}>
                <p>
                  <b>{e.nombre}</b>
                </p>
                <p>$ {e.precio}</p>
                <button>X</button>
              </article>
            ))
          ) : (
            <p>Aún no hay productos ingresados</p>
          )}
        </section>
      </section>
    </main>
  );
};

export default Order;
