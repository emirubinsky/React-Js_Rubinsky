import { Link } from "react-router-dom";
import Boton from "../../ejemplos/Boton";

const ItemCard = ({item}) => {

  return (
    <article className="w-80 mt-5 ">
      <img className="relative h-60" src={item.image} alt={item.name} />
      <h3 className="text-2xl font-semibold">{item.name}</h3>
      <hr />
      <p>{item.description}</p>
      <p className="text-xl font-bold">Price: ${item.price}</p>

      <Boton>
        <Link to={`/item/${item.id}`}>See More</Link>
      </Boton>
    </article>
  );
};

export default ItemCard;
