const SalesFormInputs = ({ form, errors, handleChange }) => {
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
          autoComplete="off"
        />
      </div>
      <div className="error-message">{ERRORS.code && <p>{ERRORS.code}</p>}</div>
      <div className="form-content">
        <label htmlFor="people">Personas</label>
        <input
          onChange={handleChange}
          id="people"
          name="people"
          type="number"
          value={FORM.people}
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.people && <p>{ERRORS.people}</p>}
      </div>
      <div className="form-content">
        <label htmlFor="start">Inicio</label>
        <input
          onChange={handleChange}
          id="start"
          name="start"
          type="text"
          value={FORM.startDate}
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.startDate && <p>{ERRORS.startDate}</p>}
      </div>
      <div className="form-content">
        <label htmlFor="finish">Cierre</label>
        <input
          onChange={handleChange}
          id="finish"
          name="finish"
          type="text"
          value={FORM.finishDate}
          min={0}
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.finishDate && <p>{ERRORS.finishDate}</p>}
      </div>
      <div className="form-content">
        <label htmlFor="paid">Forma de pago:</label>
        <input
          onChange={handleChange}
          type="text"
          id="paid"
          name="paid"
          value={
            FORM.paid.slice(0, 1).toUpperCase() +
            FORM.paid.substring(1).toLowerCase()
          }
          autoComplete="on"
        />
      </div>
      <div className="error-message">{ERRORS.paid && <p>{ERRORS.paid}</p>}</div>
      <div className="form-content">
        <label htmlFor="total">Total:</label>
        <input
          onChange={handleChange}
          type="number"
          id="total"
          name="total"
          value={FORM.total}
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.total && <p>{ERRORS.total}</p>}
      </div>
    </>
  );
};

export default SalesFormInputs;
