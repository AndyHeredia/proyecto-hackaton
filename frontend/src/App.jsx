
import { useEffect, useState } from 'react';
import Principal from "./page/principal";
import ConExperiencia from "./page/ConExperiencia";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Principal />} />

        {/* Usuario con experiencia */}
        <Route path="/con-experiencia" element={<ConExperiencia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

