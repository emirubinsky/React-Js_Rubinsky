import { useEffect, useState } from "react";
import { fetchDataFromFirebase } from "../utils/utils";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // No debería ser una colección?
    fetchDataFromFirebase({collectionName: 'categories'})
      .then((data) => {
        console.log("useCategories > Data fetched using Fetch:", data);
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
