// import './Navbar.scss'
import logo from "../../assets/organicaLogo32.png";
import { Link, NavLink } from "react-router-dom";
import useCategories from "./../../hooks/useCategories";
import CartCounter from '../CartCounter/CartWidget'

const Navbar = () => {
  const { categories } = useCategories();

  return (
    <header className="bg-organica">
      <div className="container m-auto py-6 flex justify-between items-center">
        <NavLink
            key={`/`}
            to={`/`}
            className={({ isActive }) =>
              `text-lg uppercase font-semibold ${
                isActive ? "text-black-1200" : "text-white"
              }`
            }
          > <img src={logo} alt="Logo" />
          </NavLink>

        {/* Este NavLink a HOME esta hecho a medida*/}
        <nav className="flex gap-4">
          

          {/* Lecturas de Categorias para generar dinamicamente el menu*/}
          {categories.map((category) => (
            <NavLink
              key={`/products/${category}`}
              to={`/products/${category}`}
              className={({ isActive }) =>
                `text-lg uppercase  ${
                  isActive ? "underline font-bold text-black-1200" : "font-semibold text-white"
                }`
              }
            >
              {category}
            </NavLink>
          ))}
        </nav>

        { <CartCounter /> }
      </div>
    </header>
  );
};

export default Navbar;
