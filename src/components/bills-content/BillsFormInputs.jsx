const BillsFormInputs = ({ form, errors, handleChange }) => {
  const FORM = form;
  const ERRORS = errors;
  return (
    <>
      <div className="form-content">
        <label htmlFor="date">Fecha</label>
        <input
          onChange={handleChange}
          id="date"
          name="date"
          type="date"
          value={FORM.date}
          autoComplete="off"
        />
      </div>
      <div className="error-message">{ERRORS.date && <p>{ERRORS.date}</p>}</div>
      <div className="form-content">
        <label htmlFor="distributor">Proveedor</label>
        <input
          onChange={handleChange}
          id="distributor"
          name="distributor"
          type="text"
          value={
            FORM.distributor.slice(0, 1).toUpperCase() +
            FORM.distributor.substring(1).toLowerCase()
          }
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.distributor && <p>{ERRORS.distributor}</p>}
      </div>
      <div className="form-content">
        <label htmlFor="amount">Monto</label>
        <input
          onChange={handleChange}
          id="amount"
          name="amount"
          type="number"
          value={FORM.amount}
          min={0}
          autoComplete="off"
        />
      </div>
      <div className="error-message">
        {ERRORS.amount && <p>{ERRORS.amount}</p>}
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
    </>
  );
};

export default BillsFormInputs;
