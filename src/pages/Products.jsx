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
                <tr key={e.codigo}>
                  <td>{e.codigo}</td>
                  <td>{e.nombre}</td>
                  <td>$ {e.precio}</td>
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
            <label htmlFor="codigo">Código</label>
            <input id="codigo" name="codigo" type="text" autoComplete="off" />
          </div>
          <div className="form-content">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" autoComplete="off" />
          </div>
          <div className="form-content">
            <label htmlFor="precio">Precio</label>
            <input id="precio" name="precio" type="number" autoComplete="off" />
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
