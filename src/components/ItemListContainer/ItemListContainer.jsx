import { useEffect, useState } from "react"
import ItemList from "../ItemList/ItemList";
import { fetchDataWithFetch } from "../../utils/utils";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  const { categoryId } = useParams()

  useEffect(() => {
      setLoading(true)

      fetchDataWithFetch() // <= Promise
          .then((data) => {
            console.log("Data fetched using Fetch:", data);
              const items = categoryId 
                              ? data.filter(prod => prod.category === categoryId)
                              : data

              setProductos(items)
          })
          .finally(() => setLoading( false ))
  }, [categoryId])

  return (
        <>

          {loading ? (
            <Loader />
          ) : (
            <ItemList productos={productos} categoryId={categoryId} />
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
