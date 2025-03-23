import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
