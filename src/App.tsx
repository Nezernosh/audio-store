import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog/Catalog';
import Cart from './pages/Cart/Cart';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import './App.css';


const App: React.FC = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Header />
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
