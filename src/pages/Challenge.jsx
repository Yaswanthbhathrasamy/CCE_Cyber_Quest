import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flag, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameContext } from '../App';
import { challenges } from '../data/challenges';

function generatePlaceholder(answer) {
  const match = answer.match(/^CCE\{(.)(.*)\}$/);
  if (match) {
    const firstChar = match[1];
    const rest = match[2];
    const stars = rest.replace(/[^_]/g, '*');
    return `CCE{${firstChar}${stars}}`;
  }
  return "CCE{...}";
}

function Challenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userName, completedChallenges, completeChallenge, activeChallengeId } = useContext(GameContext);
  
  const [flagInput, setFlagInput] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSuccessing, setIsSuccessing] = useState(false);
  
  const challengeId = parseInt(id);
  const challenge = challenges.find(c => c.id === challengeId);
  
  const isCompleted = completedChallenges.includes(challengeId);
  const isActive = activeChallengeId === challengeId;

  useEffect(() => {
    if (!challenge) {
      navigate('/dashboard');
      return;
    }
    if (!isCompleted && !isActive && !isSuccessing) {
      navigate('/dashboard');
    }
  }, [challenge, isCompleted, isActive, isSuccessing, navigate]);

  if (!challenge) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flagInput.trim() === challenge.answer) {
      setError(false);
      setIsSuccessing(true);
      
      // Congratulatory shower (Confetti)
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#EC4899', '#3B82F6', '#8B5CF6'] // Anime-ish vibrant colors
      });

      setTimeout(() => {
        completeChallenge(challengeId);
        setIsSuccessing(false);
        if (completedChallenges.length + 1 === challenges.length) {
          navigate('/success');
        } else {
          navigate('/dashboard');
        }
      }, 3000); // 3 seconds delay shows the shower
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const placeholderText = generatePlaceholder(challenge.answer);

  return (
    <div className="app-container fade-in">
      <div className="header" style={{ marginBottom: '1rem', borderBottom: 'none' }}>
        <button className="btn" onClick={() => navigate('/dashboard')} style={{ padding: '0.5rem', background: '#F1F5F9', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={18} /> Fallback
        </button>
        <div className="header-user anime-badge">
          Hero: {userName}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '2px dashed var(--accent-pink)', paddingBottom: '1rem' }}>
            <Sparkles size={28} color="var(--accent-pink)" />
            <h2 style={{ margin: 0, color: 'var(--dark-blue)', fontSize: '1.75rem', fontFamily: '"Nunito", "Poppins", sans-serif', fontWeight: 800 }}>Episode {challenge.id}: {challenge.name}</h2>
            {isCompleted && !isSuccessing && (
              <span style={{ 
                marginLeft: 'auto', 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                color: 'var(--success-green)', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '16px',
                fontSize: '0.875rem',
                fontWeight: 800
              }}>
                ✓ CLEARED
              </span>
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--accent-purple)', marginBottom: '0.5rem', fontWeight: 800 }}>QUEST OBJECTIVE:</h3>
            <div className="terminal-text" style={{ borderColor: 'var(--accent-purple)' }}>
              {challenge.question.split('\\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(236, 72, 153, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-pink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--accent-pink)' }}>Secret Intel:</strong>
                <button 
                  onClick={() => setShowHint(!showHint)} 
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}
                >
                  {showHint ? <EyeOff size={16} /> : <Eye size={16} />} {showHint ? "Hide Intel" : "Reveal Intel"}
                </button>
              </div>
              {showHint && (
                <div className="fade-in" style={{ marginTop: '0.5rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                  {challenge.hint}
                </div>
              )}
            </div>
          </div>

          {!isCompleted && !isSuccessing ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <input 
                  type="text" 
                  className="input-field anime-input" 
                  placeholder={placeholderText} 
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  style={{ borderColor: error ? 'var(--error-red)' : '' }}
                  required
                />
                {error && (
                  <span className="fade-in" style={{ color: 'var(--error-red)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', fontWeight: 700 }}>
                    <AlertCircle size={14} /> Power Level too low! Incorrect flag.
                  </span>
                )}
              </div>
              <button type="submit" className="btn btn-primary anime-btn" style={{ padding: '0.75rem 2rem' }}>
                Unleash Flag!
              </button>
            </form>
          ) : (
            <div className="fade-in" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', border: '2px dashed rgba(236, 72, 153, 0.5)' }}>
              <p style={{ color: 'var(--accent-pink)', fontWeight: 800, fontSize: '1.25rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                🎉 Quest Cleared! Level Up!
              </p>
              {isSuccessing && <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Moving to next stage...</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Challenge;
