import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import useForm from "../hooks/useForm";
import CustomButton from "../components/CustomButton";

const Products = () => {
  const { products, setProducts } = useContext(ProductContext);
  const initialValue = {
    code: "",
    name: "",
    price: "",
    quantity: "",
  };
  const { form, setForm, handleChange, formulario } = useForm(initialValue);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateFields(form);
    if (err === null) {
      setProducts([...products, form]);
      formulario.current.reset();
      setForm(initialValue);
      setErrors({});
    } else {
      setErrors(err);
    }
  };

  const handleClickCancel = () => {
    formulario.current.reset();
    setErrors({});
  };

  const validateFields = (value) => {
    let errors = {};
    let isError = false;

    if (value.code.length <= 0) {
      errors.code = "Debe completar el campo";
      isError = true;
    }
    if (value.name.length <= 0) {
      errors.name = "Debe completar el campo";
      isError = true;
    }
    if (value.price.length <= 0) {
      errors.price = "Debe completar el campo";
      isError = true;
    }
    if (value.quantity.length <= 0) {
      errors.quantity = "Debe completar el campo";
      isError = true;
    }

    return isError ? errors : null;
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
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((e) => (
                <tr key={e.code}>
                  <td>{e.code}</td>
                  <td>{e.name.slice(0,1).toUpperCase()+e.name.substring(1).toLowerCase()}</td>
                  <td>{e.quantity}</td>
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
        <form
          ref={formulario}
          onSubmit={handleSubmit}
          className="form-container"
        >
          <div className="form-content">
            <label htmlFor="code">Código</label>
            <input
              onChange={handleChange}
              id="code"
              name="code"
              type="text"
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="error-message">
            {errors.code && <p>{errors.code}</p>}
          </div>
          <div className="form-content">
            <label htmlFor="name">Nombre</label>
            <input
              onChange={handleChange}
              id="name"
              name="name"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="error-message">
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="form-content">
            <label htmlFor="price">Precio</label>
            <input
              onChange={handleChange}
              id="price"
              name="price"
              type="number"
              autoComplete="off"
            />
          </div>
          <div className="error-message">
            {errors.price && <p>{errors.price}</p>}
          </div>
          <div className="form-content">
            <label htmlFor="quantity">Cantidad</label>
            <input
              onChange={handleChange}
              id="quantity"
              name="quantity"
              type="number"
              autoComplete="off"
            />
          </div>
          <div className="error-message">
            {errors.quantity && <p>{errors.quantity}</p>}
          </div>
          <div className="buttons-container">
            <CustomButton nameType={"button"} selector={"btn-gray"} click={handleClickCancel} text={"Cancelar"} />
            <CustomButton nameType={"submit"} selector={"btn-green"} text={"Añadir"} />
          </div>
        </form>
      </section>
    </main>
  );
};

export default Products;
