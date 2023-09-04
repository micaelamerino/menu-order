const Order = () => {
  let tables = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <main className="order-section">
      <section className="tables-section">
        {tables.map((e) => (
          <div key={e} className="table"><span>{e}</span></div>
        ))}
      </section>
      <section className="dataTables-section">
      <h2 className="header-form">Mesa</h2>
      </section>
    </main>
  )
}

export default Order