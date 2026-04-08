import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Challenge from './pages/Challenge';
import Success from './pages/Success';
import { challenges } from './data/challenges';

export const GameContext = createContext();

function App() {
  const [userName, setUserName] = useState('');
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('cce_userName');
    const storedCompleted = localStorage.getItem('cce_completedChallenges');
    
    if (storedName) setUserName(storedName);
    if (storedCompleted) {
      try {
        setCompletedChallenges(JSON.parse(storedCompleted));
      } catch (e) {
        console.error("Failed to parse stored challenges");
      }
    }
  }, []);

  const loginUser = (name) => {
    setUserName(name);
    localStorage.setItem('cce_userName', name);
  };

  const completeChallenge = (id) => {
    if (!completedChallenges.includes(id)) {
      const updated = [...completedChallenges, id];
      setCompletedChallenges(updated);
      localStorage.setItem('cce_completedChallenges', JSON.stringify(updated));
    }
  };

  const resetGame = () => {
    setUserName('');
    setCompletedChallenges([]);
    localStorage.removeItem('cce_userName');
    localStorage.removeItem('cce_completedChallenges');
  };

  const unlockedChallengeIds = [1, 3];
  if (completedChallenges.includes(1)) unlockedChallengeIds.push(2);
  if (completedChallenges.includes(3)) unlockedChallengeIds.push(4);
  if ([1, 2, 3, 4].every(id => completedChallenges.includes(id))) unlockedChallengeIds.push(5);

  return (
    <GameContext.Provider value={{
      userName, loginUser, completedChallenges, completeChallenge, resetGame, unlockedChallengeIds
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={
            userName ? <Dashboard /> : <Navigate to="/" replace />
          } />
          <Route path="/challenge/:id" element={
            userName ? <Challenge /> : <Navigate to="/" replace />
          } />
          <Route path="/success" element={
            userName && completedChallenges.length === challenges.length 
              ? <Success /> 
              : <Navigate to="/dashboard" replace />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GameContext.Provider>
  );
}

export default App;
