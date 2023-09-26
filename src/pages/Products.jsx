import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import useForm from "../hooks/useForm";
import CustomButton from "../components/CustomButton";
import CustomSelectionSection from "../components/CustomSelectionSection";

const Products = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [firstInstance, setFirstInstance] = useState(false);
  const initialValue = {
    code: 0,
    name: "",
    price: 0,
    quantity: 0,
  };
  const { form, setForm, handleChange } = useForm(initialValue);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setFirstInstance(true);
  }, []);

  const handleClickAddProduct = () => {
    setFirstInstance(false);
    setEdit(false);
    setForm(initialValue);
  };

  const handleClickReset = () => {
    setProducts([]);
    setEdit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchProduct = products.find(
      (prod) => prod.code === form.code
    );
    const err = validateFields(form);
    if (err === null && !searchProduct) {
      setProducts([...products, form]);
      setForm(initialValue);
      setErrors({});
    } else if (err === null && searchProduct){
      products.map((prod) => {
        if (prod.code === form.code) {
          (prod.code = form.code),
          (prod.name = form.name),
          (prod.price = form.price),
          (prod.quantity = form.quantity);
        }
      });
      setForm(initialValue);
      setErrors({});
    } else {
      setErrors(err);
    }
  };

  const handleClickCancel = () => {
    setForm(initialValue);
    setErrors({});
    setEdit(false);
  };

  const validateFields = (value) => {
    let errors = {};
    let isError = false;

    if (value.code === 0) {
      errors.code = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.name.length <= 0) {
      errors.name = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.price.length<=0) {
      errors.price = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.quantity === 0) {
      errors.quantity = "✍🏼 Complete el campo";
      isError = true;
    }

    return isError ? errors : null;
  };

  const handleClickEdit = (prod) => {
    setEdit(true);
    setFirstInstance(false);
    setForm({
      code: prod.code,
      name: prod.name,
      price: prod.price,
      quantity: prod.quantity,
    });
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    const err = validateFields(form);
    if (err === null) {
      const edit = products.map((item) =>
        item.code === form.code
          ? {
              code: form.code,
              name: form.name,
              price: form.price,
              quantity: form.quantity,
            }
          : item
      );
      setProducts(edit);
      setEdit(false);
      setFirstInstance(true);
    } else {
      setErrors(err);
    }
  };
  return (
    <main className="products-section">
      <section className="list-section">
        <div className="bills-header">
          <h2>PRODUCTOS</h2>
          <div className="buttons-container">
            {products.length > 0 && (
              <CustomButton
                nameType={"button"}
                selector={"btn-gray"}
                click={handleClickReset}
                text={"Reiniciar"}
              />
            )}
            <CustomButton
              nameType={"button"}
              selector={"btn-green"}
              click={handleClickAddProduct}
              text={"Añadir producto"}
            />
          </div>
        </div>
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
              {products?.map((prod, index) => (
                <tr key={index} onClick={() => handleClickEdit(prod)}>
                  <td>{prod.code}</td>
                  <td>{prod.name}</td>
                  <td>{prod.quantity}</td>
                  <td>
                    <b>$ {prod.price}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aún no hay productos registrados</p>
        )}
      </section>
      {!firstInstance ? (
        <section className="section-form">
          <h2 className="header-form">Ingresar producto</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-content">
              <label htmlFor="code">Código</label>
              <input
                onChange={handleChange}
                id="code"
                name="code"
                type="number"
                value={form.code}
                min={0}
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
                value={
                  form.name.slice(0, 1).toUpperCase() +
                  form.name.substring(1).toLowerCase()
                }
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
                value={form.price}
                min={0}
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
                value={form.quantity}
                min={0}
                autoComplete="off"
              />
            </div>
            <div className="error-message">
              {errors.quantity && <p>{errors.quantity}</p>}
            </div>
            <div className="buttons-container">
              <CustomButton
                nameType={"button"}
                selector={"btn-gray"}
                click={handleClickCancel}
                text={"Cancelar"}
              />
              {edit ? (
                <CustomButton
                  nameType={"submit"}
                  selector={"btn-green"}
                  click={handleClickUpdate}
                  text={"Actualizar"}
                />
              ) : (
                <CustomButton
                  nameType={"submit"}
                  selector={"btn-green"}
                  text={"Añadir"}
                />
              )}
            </div>
          </form>
        </section>
      ) : (
        <CustomSelectionSection text={"⬅ Seleccione un ítem"} />
      )}
    </main>
  );
};

export default Products;
