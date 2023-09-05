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

  const handleClickAdd = (e) => {
    setOrderClient([...orderClient, e]);
    setSearch("");
    form.current.reset();
  };

  const handleClickDelete = (e) => {
    const searchID = orderClient.find((p) => p.code == e.code);
    const newOrder = orderClient.filter((p) => p != searchID);
    setOrderClient(newOrder);
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
          <label>Nombre o código del producto</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Buscar..."
            autoComplete="off"
          />
          <section className="products-list">
            {filterProducts.length > 0 &&
              filterProducts?.map((e) => (
                <div
                  onClick={() => handleClickAdd(e)}
                  key={e.code}
                  className="content-list"
                >
                  <p>
                    <b>{e.code}</b>
                  </p>
                  <p>{e.name}</p>
                </div>
              ))}
          </section>
        </form>

        <section className="order-client">
          <h3>Orden del cliente</h3>
          
          {orderClient.length > 0 ? (
            orderClient?.map((e) => (
              <article key={e.code} className="order-article">
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
