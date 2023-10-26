const ProductsFormInputs = ({ form, errors, handleChange }) => {
  const FORM = form;
  const ERRORS = errors;

  return (
    <>
      <div className="form-content">
        <label htmlFor="code">Código</label>
        <input
          onChange={handleChange}
          id="code"
          name="code"
          type="number"
          value={FORM.code}
          min={0}
          autoComplete="off"
          autoFocus
        />
      </div>
      <div className="error-message">{ERRORS.code && <p>{ERRORS.code}</p>}</div>
      <div className="form-content">
        <label htmlFor="name">Nombre</label>
        <input
          onChange={handleChange}
          id="name"
          name="name"
          type="text"
          value={
            FORM.name.slice(0, 1).toUpperCase() +
            FORM.name.substring(1).toLowerCase()
          }
          autoComplete="off"
        />
      </div>
      <div className="error-message">{ERRORS.name && <p>{ERRORS.name}</p>}</div>
      <div className="form-content">
        <label htmlFor="price">Precio</label>
        <input
          onChange={handleChange}
          id="price"
          name="price"
          type="number"
          value={FORM.price}
          min={0}
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.price && <p>{ERRORS.price}</p>}
      </div>
      <div className="form-content">
        <label htmlFor="quantity">Cantidad</label>
        <input
          onChange={handleChange}
          id="quantity"
          name="quantity"
          type="number"
          value={FORM.quantity}
          min={0}
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.quantity && <p>{ERRORS.quantity}</p>}
      </div>
    </>
  );
};

export default ProductsFormInputs;
