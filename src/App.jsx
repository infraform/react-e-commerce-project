import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductProvider } from './contexts/ProductContext';
import Router from './routes/Router';

function App() {
  return (
    <ProductProvider>
      <Router />
      <ToastContainer />
    </ProductProvider>

  );
}

export default App;
