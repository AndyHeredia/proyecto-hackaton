
import { useEffect, useState } from 'react';
import Principal from "./page/principal";

function App() {
  return (
    <>
      <Principal onSelect={handleExperience} />
    </>
  );
}

export default App;

