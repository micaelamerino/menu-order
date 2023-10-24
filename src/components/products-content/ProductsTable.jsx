const ProductsTable = ({ products, handleClickEdit }) => {
  const PRODUCTS = products;
  return (
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
        {PRODUCTS?.map((prod, index) => (
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
  );
};

export default ProductsTable;
