import { useEffect, useState } from "react";
import { fetchDataWithFetch } from "../utils/utils";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchDataWithFetch("products/categories")
      .then((data) => {
        console.log("Data fetched using Fetch:", data);
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });

      
  }, []);

  return {
    categories,
    loading,
  };
};

export default useCategories;
