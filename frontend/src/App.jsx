
import { useEffect, useState } from 'react';
import Principal from "./page/principal";

function App() {
  const [estadoBackend, setEstadoBackend] = useState(
    'Conectando con el servidor...'
  );

  const handleExperience = (experience) => {
    console.log("Tipo de usuario:", experience);

    // Aquí conectaremos las rutas de cada tipo de usuario.
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/ping')
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en el servidor");
        }
        return res.json();
      })
      .then((data) => setEstadoBackend(data.mensaje))
      .catch(() => {
        setEstadoBackend('Error: No se pudo conectar con el Backend');
      });
  }, []);

  return (
    <>
      <Principal onSelect={handleExperience} />
    </>
  );
}

export default App;

