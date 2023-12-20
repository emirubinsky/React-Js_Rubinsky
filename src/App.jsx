import "./App.css";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        
        {/* Ruteo que intercepta la forma mas general, devolver de TODOS los productos */}
        <Route path="/" element={ <ItemListContainer /> } />

        {/* Ruteo que intercepta productos x categoria */}
        <Route path="/products/:categoryId" element={ <ItemListContainer /> } />

        {/* Ruteo que intercepta UN producto especifico */}
        <Route path="/item/:itemId" element={ <ItemDetailContainer /> } />

        {/* Ruteadores por defecto */}
        <Route path="/not-found" element={ <h2>Not found</h2> }/>
        <Route path="*" element={ <Navigate to={"/not-found"}/> }/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
