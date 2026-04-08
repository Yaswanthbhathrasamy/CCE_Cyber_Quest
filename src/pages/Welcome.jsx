import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, ChevronRight } from 'lucide-react';
import { GameContext } from '../App';

function Welcome() {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const { loginUser, userName } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      navigate('/dashboard');
    }
  }, [userName, navigate]);

  const handlePlayClick = () => {
    setShowInput(true);
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (name.trim()) {
      loginUser(name.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="card fade-in" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '3rem 2rem', border: '2px solid var(--primary-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--success-green), var(--primary-blue))',
            padding: '1.5rem',
            borderRadius: '50%',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Sword size={48} color="white" />
          </div>
        </div>

        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', color: 'var(--dark-blue)', fontFamily: '"Nunito", "Poppins", sans-serif', fontWeight: 900 }}>
          CCE Cyber Quest
        </h1>
        <p style={{ color: 'var(--primary-blue)', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
          Only the strongest minds can break the code… are you one of them?
        </p>

        {!showInput ? (
          <button className="btn btn-primary anime-btn" onClick={handlePlayClick} style={{ width: '100%', padding: '1rem', fontSize: '1.25rem', animation: 'pulse-glow 2s infinite' }}>
            START ADVENTURE
          </button>
        ) : (
          <form className="fade-in" onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="input-group" style={{ textAlign: 'left' }}>
              <label htmlFor="name" className="input-label" style={{ color: 'var(--primary-blue)' }}>Enter your Hero Name</label>
              <input
                type="text"
                id="name"
                className="input-field anime-input"
                placeholder="e.g., Kirito"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <button type="submit" className="btn btn-primary anime-btn" style={{ width: '100%' }} disabled={!name.trim()}>
              Enter The Arena <ChevronRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Welcome;
