import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Home from './pages/Home';
import Game from './pages/Game/Game';
import './index.css';

function App() {
  return (
      <Router>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </AppWrapper>
      </Router>
  );
}

export default App;
