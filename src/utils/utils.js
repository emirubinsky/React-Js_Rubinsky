import MOCK_DATA from "../mock/data.json";

// Usamos la pagina: https://fakestoreapi.com/ para obtener un poco de datos dinámicos
const STORE_API = "https://fakestoreapi.com";

function pedirDatos(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1000);
  });
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
  pedirDatos,
  fetchDataWithPromise,
  fetchDataWithFetch,
  fetchDataWithAsyncAwait,
};
