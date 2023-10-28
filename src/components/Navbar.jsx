import { NavLink, Outlet } from "react-router-dom";
import order from "../assets/icon/order-menu.png";
import sales from "../assets/icon/sales.png";
import bills from "../assets/icon/calculator.png";
import products from "../assets/icon/product-list.png";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="logo">
          <h1>A LA ORDEN</h1>
        </div>
        <NavLink to={"/pedidos"}>
          <abbr title="Órdenes">
            <img src={order} alt="" />
          </abbr>
        </NavLink>
        <NavLink to={"/ventas"}>
          <abbr title="Ventas">
            <img src={sales} alt="" />
          </abbr>
        </NavLink>
        <NavLink to={"/gastos"}>
          <abbr title="Gastos">
            <img src={bills} alt="" />
          </abbr>
        </NavLink>
        <NavLink to={"/productos"}>
          <abbr title="Productos">
            <img src={products} alt="" />
          </abbr>
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
