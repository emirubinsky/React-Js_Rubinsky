// Aquí obtenemos los productos a incluir.
import products from "./data1.json" assert { type: "json" };

/* Como esta librería será independiente, tenemos que leer las credenciales
    y hacer todo el proceso para inicializar la firebase antes de operar */

import { initializeApp } from "firebase/app";
import { collection, getDocs, query, where, getFirestore, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_apiKey ,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain ,
  projectId: import.meta.env.VITE_REACT_APP_projectId ,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket ,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId ,
  appId: import.meta.env.VITE_REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadProducts() {
  const productsRef = collection(db, "products");

  for (const product of products) {
    // Check if the product already exists based on a unique identifier (e.g., productId)
    // Chequeamos si el producto no existe ya en la coleccion "products"
    // - y para ello utilizamos el "pseudo" id llamado "id"
    const existingProduct = await getDocs(
      query(productsRef, where("id", "==", product.id))
    );
    if (existingProduct.docs.length == 0) {
      // Product doesn't exist, add it to the batch
      // Si el producto no existe, entonces lo agregamos a la operación por lotes.
      console.log(
        `Product with ID ${product.id} does not exists yet. This will be added now...` );

      await addDoc(productsRef, product);
    } else {
      // Product already exists, you can handle this case (e.g., update or skip)
      // Si el producto NO existe, entonces no lo ingresamos a nada.
      console.log(
        `Product with ID ${product.id} already exists. Skipping.`
      );
    }
  }

  // await batch.commit();
  console.log("Products batch operation finished successfully!");
}

uploadProducts();