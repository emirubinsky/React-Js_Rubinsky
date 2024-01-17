import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader";

// DB implementation
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";


const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    // TODO - Mucho acoplamiento
    // Estamos mezclando mucho la presentación, con la lógica de obtención
    // de productos x ID
    // En una siguiente iteración estaría bueno abstraer esto en un
    // getCategories y que el "cómo obtener productos x categorias" no le interese a esta capa
    // 1.- Armar una referencia (sync)

     // 1.- armar la referencia
     const docRef = doc(db, 'products', itemId)
     // 2.- llamar a la ref
     getDoc( docRef )
       .then((docSnapshot) => {
         console.log(docSnapshot)
         const doc = {
           ...docSnapshot.data(),
           id: docSnapshot.id
         }
 
         setItem(doc)
       })
       .finally(() => setLoading(false))

       
  }, [itemId]); // Added this: itemId

  return <>{loading ? <Loader /> : <ItemDetail item={item} />}</>;
};

export default ItemDetailContainer;
