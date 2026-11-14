import { useEffect, useState } from 'react';

function App() {
  const [estadoBackend, setEstadoBackend] = useState('Conectando con el servidor...');

  useEffect(() => {
    fetch('http://localhost:5000/api/ping')
      .then((res) => res.json())
      .then((data) => setEstadoBackend(data.mensaje))
      .catch(() => setEstadoBackend('Error: No se pudo conectar con el Backend'));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Proyecto Hackatón</h1>
      <p>Estado del sistema: <strong>{estadoBackend}</strong></p>
    </div>
  );
}

export default App;
