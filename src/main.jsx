import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './web/pages/Home.jsx';
import './web/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
