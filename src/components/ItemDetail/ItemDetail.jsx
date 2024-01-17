/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Boton from "../Button/Boton";
import QuantitySelector from "./QuantitySelector";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({ item }) => {
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const { addToCart, isInCart } = useContext(CartContext);

  const handleAgregar = () => {
    const itemToCart = {
      ...item,
      cantidad, // => cantidad: cantidad
      //color, // => color: color
    };

    addToCart(itemToCart);
  };

  const handleVolver = () => {
    navigate(-1);
  };

  return (
    <div className="container m-auto mt-8">
      <Boton onClick={handleVolver}>Volver</Boton>
      <h3 className="mt-4 text-2xl font-semibold">{`Product: ${item.category} - Name: ${item.title}`}</h3>
      <hr />

      <div className="flex gap-8 pt-4">
        <img className="relative h-50 w-50" src={item.image} alt={item.title} />

        <div>
          <p>{item.description}</p>
          <p className="text-xl font-bold">Price: ${item.price}</p>

          <p className="text-xl font-bold">Stock: {item.stock}</p>
          {isInCart(item.id) ? (
            <Boton>
              <Link to="/cart">Terminar mi compra</Link>
            </Boton>
          ) : (
            <>
              <QuantitySelector
                cantidad={cantidad}
                stock={item.stock}
                setCantidad={setCantidad}
              />
              <Boton onClick={handleAgregar} disabled={item.stock === 0}>
                Agregar al carrito
              </Boton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
