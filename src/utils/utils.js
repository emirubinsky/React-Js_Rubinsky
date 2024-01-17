/* Imports necesarios para hacer una obtención de datos de un JSON plano */
import MOCK_DATA from "../mock/data.json";

/* Imports necesarios para hacer una obtención de datos desde firebase */
import { db } from "../firebase/config";
import { collection, writeBatch, addDoc, setDoc, doc, updateDoc, getDoc, query, where, documentId, getDocs } from "firebase/firestore";


// Usamos la pagina: https://fakestoreapi.com/ para obtener un poco de datos dinámicos
const STORE_API = "https://fakestoreapi.com";

// Ex: "pedirDatos"
function fetchDataFromMock(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1000);
  });
}

async function fetchDataFromFirebase({collectionName}){
  const collectionReference = collection(db, collectionName)

  const snapshot = await getDocs(collectionReference)

  const itemsData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return itemsData
}

/**
 * Esta es una llamada a la API solo usando Promesas
 * // Usage
  fetchDataWithPromise()
    .then((data) => {
      console.log('Data fetched using Promise:', data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
 * 
 * @returns 
 */
function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${STORE_API}/products`, true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        reject(new Error(`Request failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Request failed"));
    };

    xhr.send();
  });
}

/**
// Usage
fetchDataWithFetch()
  .then((data) => {
    console.log('Data fetched using Fetch:', data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
 * @returns 
 */
function fetchDataWithFetch(action = "products") {
  return fetch(`${STORE_API}/${action}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error("Request failed", error);
    });
}

/***
 *  
 // Usage
  (async () => {
    try {
      const data = await fetchDataWithAsyncAwait();
      console.log('Data fetched using async-await:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })();
 */
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Request failed", error);
  }
}

export {
  fetchDataFromMock,
  fetchDataFromFirebase,
  fetchDataWithPromise,
  fetchDataWithFetch,
  fetchDataWithAsyncAwait,
};
