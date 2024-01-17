import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

// DB implementation
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";



const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryLabel } = useParams();

  useEffect(() => {
    setLoading(true);

    // TODO - Mucho acoplamiento
    // Estamos mezclando mucho la presentación, con la lógica de obtención
    // de productos x categoría
    // En una siguiente iteración estaría bueno abstraer esto en un
    // getCategories y que el "cómo obtener productos x categorias" no le interese a esta capa
    // 1.- Armar una referencia (sync)
    const productosRef = collection(db, 'products')
    const docsRef = categoryLabel
                      ? query( productosRef, where('category', '==', categoryLabel))
                      : productosRef
    // 2.- LLamar a esa referencia (async)
    getDocs(docsRef)
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
        
        console.log( docs )
        setProductos( docs )
      })
      .finally(() => setLoading(false))

  }, [categoryLabel]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ItemList productos={productos} categoryLabel={categoryLabel} />
      )}
    </>
  );
};

export default ItemListContainer;

// * HOC
// const ItemListContainer = ({productos, loading}) => {

//     return (
//        <>
//             {
//                 loading
//                     ? <h2 className="text-center text-4xl mt-8">Cargando...</h2>
//                     : <ItemList productos={productos}/>
//             }
//        </>
//     )
// }
// export default withProductsData( ItemListContainer )

// * Render Props
// const ItemListContainer = () => {

//       return (
//         <ProductsData>
//           {(productos, loading) => (
//             <>
//               {loading ? (
//                 <h2 className="text-center text-4xl mt-8">Cargando...</h2>
//               ) : (
//                 <ItemList productos={productos} />
//               )}
//             </>
//           )}
//         </ProductsData>
//       );
//     };
