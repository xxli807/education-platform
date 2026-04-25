import { useEffect } from 'react';
import { initializeStorageCleanup } from './utils/storageManager';

function App() {
  useEffect(() => {
    initializeStorageCleanup();
  }, []);

  return null;
}

export default App;
