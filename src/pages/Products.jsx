import { useContext, useRef } from "react";
import { ProductContext } from "../context/ProductContext";

const Products = () => {
  const { products, setProducts } = useContext(ProductContext);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldsData = Object.fromEntries(new FormData(e.target));
    setProducts([...products, fieldsData]);
    form.current.reset();
  };

  const handleClick = () => {
    form.current.reset();
  };

  return (
    <main className="products-section">
      <section className="list-section">
        <h2>PRODUCTOS</h2>
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((e) => (
                <tr key={e.code}>
                  <td>{e.code}</td>
                  <td>{e.name}</td>
                  <td>$ {e.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aún no hay productos registrados</p>
        )}
      </section>
      <section className="form-section">
        <h2 className="header-form">Ingresar producto</h2>
        <form ref={form} onSubmit={handleSubmit} className="form-container">
          <div className="form-content">
            <label htmlFor="code">Código</label>
            <input id="code" name="code" type="text" autoComplete="off" />
          </div>
          <div className="form-content">
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" autoComplete="off" />
          </div>
          <div className="form-content">
            <label htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" autoComplete="off" />
          </div>
          <div className="form-content">
            <label htmlFor="quantity">Cantidad</label>
            <input id="quantity" name="quantity" type="number" autoComplete="off" />
          </div>

          <div className="buttons-container">
            <button type="button" onClick={handleClick}>
              Cancelar
            </button>
            <button type="submit" className="btn-add">
              Añadir
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Products;
