import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
const LazyProducts = React.lazy(() => import('./Products'));
const LazyCartPage = React.lazy(() => import('./Pages/CartPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<React.Suspense fallback={<div className='absolute left-0 top-0 z-50 w-full'><div className="loader-line"></div></div>}><LazyProducts /></React.Suspense>}></Route>
      <Route path="/cart" element={<React.Suspense fallback={<div className='absolute left-0 top-0 z-50 w-full'><div className="loader-line"></div></div>}><LazyCartPage /></React.Suspense>}></Route>
    </Routes>
  );
}

export default App;
