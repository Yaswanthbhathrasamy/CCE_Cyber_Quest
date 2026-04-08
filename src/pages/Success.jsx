import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, RefreshCw } from 'lucide-react';
import { GameContext } from '../App';
import confetti from 'canvas-confetti';

function Success() {
  const { userName, resetGame } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Grand finale confetti shower
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#10B981', '#3B82F6'] }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#34D399', '#2563EB'] }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="card fade-in" style={{ 
        maxWidth: '600px', 
        width: '100%', 
        textAlign: 'center', 
        padding: '4rem 2rem',
        boxShadow: 'var(--shadow-glow-strong)',
        border: '3px solid var(--success-green)',
        animation: 'pulse-glow 3s infinite',
        background: 'linear-gradient(to bottom, #ffffff, #f0fdfa)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--success-green), var(--primary-blue))', 
            padding: '1.5rem', 
            borderRadius: '50%',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.8)'
          }}>
            <Crown size={64} color="white" />
          </div>
        </div>
        
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--dark-blue)', fontFamily: '"Nunito", "Poppins", sans-serif', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
          Victory!
        </h1>
        
        <p style={{ color: 'var(--primary-blue)', marginBottom: '2.5rem', fontSize: '1.25rem', lineHeight: '1.6', fontWeight: 700 }}>
          Legendary Hero <strong>{userName}</strong>, you have conquered the digital realm and sealed the ancient breach. Your power is unrivaled!
        </p>

        <div style={{ 
          backgroundColor: '#F1F5F9',
          padding: '2rem', 
          borderRadius: '16px',
          marginBottom: '3rem',
          border: '2px dashed var(--success-green)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <p style={{ color: 'var(--primary-blue)', fontSize: '1rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>
            Master Key Unlocked
          </p>
          <div style={{ 
            fontFamily: '"Courier New", monospace', 
            fontSize: '3rem', 
            fontWeight: 900, 
            color: 'var(--success-green)',
            letterSpacing: '4px',
            textShadow: '0 0 15px rgba(16, 185, 129, 0.5)'
          }}>
            CCE_WE_ARE_ONE
          </div>
        </div>

        <button className="btn anime-btn" onClick={handleRestart} style={{ 
          background: 'transparent',
          color: 'var(--primary-blue)',
          border: '2px solid var(--primary-blue)',
          padding: '1rem 3rem',
          fontSize: '1.1rem'
        }}>
          <RefreshCw size={20} /> Play New Game+
        </button>
      </div>
    </div>
  );
}

export default Success;
