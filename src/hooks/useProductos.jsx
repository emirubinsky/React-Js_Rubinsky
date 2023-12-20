import { useEffect, useState } from "react";
import { fetchDataWithFetch } from "../utils/utils";

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

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

      
  }, []);

  return {
    productos,
    loading,
  };
};

export default useProductos;
