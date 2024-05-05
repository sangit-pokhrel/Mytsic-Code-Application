import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import GamePage from './components/GamePage';
import AutoGame from './components/AutoGame';
import { GameProvider } from './components/GameProvider';

const App = () => {
  return (
    <Router>
      <GameProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/autoplay" element={<AutoGame />} />
          </Routes>
        </div>
      </GameProvider>
    </Router>
  );
};

export default App;
