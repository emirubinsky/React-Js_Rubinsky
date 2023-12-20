import { useState } from "react";
import Boton from "../../ejemplos/Boton";
import QuantitySelector from "./QuantitySelector";
// import ColorSelector from "./ColorSelector";
import { useNavigate } from "react-router-dom";


const ItemDetail = ({ item }) => {
  const [cantidad, setCantidad] = useState(1)
  // const [color, setColor] = useState("")
  const navigate = useNavigate()

  const handleAgregar = () => {
    const itemToCart = {
      ...item,
      cantidad, // => cantidad: cantidad
      color // => color: color
    }

    console.log(itemToCart)
  }

  const handleVolver = () => {
    navigate(-1)
  }

  return (
    <div className="container m-auto mt-8">
      
      <h3 className="mt-4 text-2xl font-semibold">{`Product: ${item.category} - Name: ${item.title}` }</h3>
      <hr />

      <div className="flex gap-8 pt-4">
        <img className="relative h-50 w-50" src={item.image} alt={item.title} />

        <div>
          <p>{item.description}</p>
          <p className="text-xl font-bold">Price: ${item.price}</p>

          <p className="text-xl font-bold">Stock: {Math.floor(item.rating.count / 10)}</p>
          <QuantitySelector 
            cantidad={cantidad}
            stock={Math.floor(item.rating.count / 10)} // TODO Aquí la FAKE-API-STORE no tiene manejo de stock, usaremos el rating.count, que es un numero entero.
            setCantidad={ setCantidad }
          />          

          
          <Boton onClick={handleAgregar}>Add to the basket</Boton>
          <Boton onClick={handleVolver}>Return</Boton>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
