
import { useEffect, useState } from 'react';
import Principal from "./page/principal";
import ConExperiencia from "./page/ConExperiencia";
import SinExperiencia  from "./page/SinExperiencia";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Principal />} />

        {/* Usuario con experiencia */}
        <Route path="/con-experiencia" element={<ConExperiencia />} />
        {/* Usuario sin experiencia */}
        <Route path="/sin-experiencia" element={<SinExperiencia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

