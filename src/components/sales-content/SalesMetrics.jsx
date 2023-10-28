const SalesMetrics = ({totalPeople, totalAmount, averagePerson,averageSale}) => {
  return (
      <div className="container-data-sales">
        <p>
          Personas: <b>{totalPeople}</b>
        </p>
        <p>
          Promedio por persona: <b>$ {averagePerson}</b>
        </p>
        <p>
          Promedio por venta: <b>$ {averageSale}</b>
        </p>
        <p>
          Total: <b>$ {totalAmount}</b>{" "}
        </p>
      </div>
  );
};

export default SalesMetrics;
