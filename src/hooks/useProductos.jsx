import { useEffect, useState } from "react";
import { fetchDataWithFetch, fetchDataFromFirebase } from "../utils/utils";

// TODO - Esto debería estar en un config centralizado
// así puedo poner distintos "data sources"
const MODO = env.REACT_APP_fetch_mode;

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    switch (MODO) {
      case "fetchDataFromFirebase":{
        const retorno = fetchDataFromFirebase({collectionName: 'products'});

        console.log(retorno)

        break;
      }
      
      case "fetchDataWithFetch":
        fetchDataWithFetch()
          .then((data) => {
            console.log("Data fetched using Fetch:", data);
            setProductos(data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching data:", error);
          });
        break;
    }
  }, []);

  return {
    productos,
    loading,
  };
};

export default useProductos;
