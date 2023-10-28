import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import useForm from "../hooks/useForm";
import CustomButton from "../components/CustomButton";
import CustomSelectionSection from "../components/CustomSelectionSection";
import ProductsTable from "../components/products-content/ProductsTable";
import ProductsFormInputs from "../components/products-content/ProductsFormInputs";

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
    const searchProduct = products.find((prod) => prod.code === form.code);
    const err = validateFields(form);
    if (err === null && !searchProduct) {
      setProducts([...products, form]);
      setForm(initialValue);
      setErrors({});
    } else if (err === null && searchProduct) {
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
    setFirstInstance(true);
  };

  const validateFields = (value) => {
    let errors = {};
    let isError = false;

    if (value.code === 0 || value.code === "") {
      errors.code = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.name.length <= 0) {
      errors.name = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.price === 0) {
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
    setErrors({});
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
  const handleDeleteProduct = () => {
    const searchItem = products.find((item) => item.code === form.code);
    const newArray = products.filter((item) => item !== searchItem);

    setProducts(newArray);
    setFirstInstance(true);
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
          <ProductsTable
            products={products}
            handleClickEdit={handleClickEdit}
          />
        ) : (
          <p>Aún no hay productos registrados</p>
        )}
      </section>
      {!firstInstance ? (
        <section className="section-form">
          <h2 className="header-form">Ingresar producto</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <ProductsFormInputs
              form={form}
              errors={errors}
              handleChange={handleChange}
            />
            <div className="buttons-container">
              {edit ? (
                <CustomButton
                  nameType={"button"}
                  selector={"btn-red"}
                  click={handleDeleteProduct}
                  text={"Eliminar registro"}
                />
              ) : null}
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
