import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, BookmarkCheck, Unlock, LogOut, Flame } from 'lucide-react';
import { GameContext } from '../App';
import { challenges } from '../data/challenges';

function Dashboard() {
  const { userName, completedChallenges, unlockedChallengeIds, resetGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetGame();
    navigate('/');
  };

  const handleChallengeClick = (challenge) => {
    if (unlockedChallengeIds.includes(challenge.id)) {
      navigate(`/challenge/${challenge.id}`);
    }
  };

  const calculateProgress = () => {
    return Math.round((completedChallenges.length / challenges.length) * 100);
  };

  const totalScore = completedChallenges.reduce((acc, id) => {
    const ch = challenges.find(c => c.id === id);
    return acc + (ch ? ch.points : 0);
  }, 0);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return { bg: '#D1FAE5', color: '#065F46' };
      case 'Medium': return { bg: '#FEF3C7', color: '#92400E' };
      case 'Hard': return { bg: '#FEE2E2', color: '#991B1B' };
      default: return { bg: '#F1F5F9', color: '#475569' };
    }
  };

  return (
    <div className="app-container fade-in">
      <div className="header">
        <div className="header-title" style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 900 }}>
          <Flame color="var(--success-green)" size={32} /> Quest Map
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="header-user anime-badge">
            Hero: {userName}
          </div>
          <div style={{ fontWeight: 900, color: 'var(--primary-blue)', fontSize: '1.25rem' }}>
            SCORE: {totalScore}
          </div>
          <button className="btn" onClick={handleLogout} style={{ padding: '0.5rem', background: '#F1F5F9', color: 'var(--text-secondary)' }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>EXP Progress</span>
          <span style={{ color: 'var(--success-green)', fontWeight: 900, fontSize: '1.2rem' }}>LVL {completedChallenges.length} / {challenges.length}</span>
        </div>
        <div style={{ height: '12px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div style={{ 
            height: '100%', 
            width: `${calculateProgress()}%`, 
            background: 'linear-gradient(90deg, var(--primary-blue), var(--success-green))',
            transition: 'width 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}></div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id);
          const isUnlocked = unlockedChallengeIds.includes(challenge.id);
          const isActive = isUnlocked && !isCompleted;
          const isLocked = !isUnlocked;

          return (
            <div 
              key={challenge.id}
              className="card anime-card"
              onClick={() => handleChallengeClick(challenge)}
              style={{
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.7 : 1,
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                boxShadow: isActive ? 'var(--shadow-glow-strong)' : (isCompleted ? 'var(--shadow-md)' : 'none'),
                border: isActive ? '2px solid var(--success-green)' : (isCompleted ? '2px solid var(--primary-blue)' : '1px solid var(--border-color)'),
                filter: isLocked ? 'grayscale(80%) blur(1px)' : 'none',
                position: 'relative'
              }}
            >
              {isLocked && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                  <Lock size={48} color="var(--dark-blue)" opacity={0.5} />
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontWeight: 800, color: isCompleted ? 'var(--primary-blue)' : (isActive ? 'var(--success-green)' : 'var(--text-primary)') }}>
                  Episode {challenge.id}
                </h3>
                {isCompleted && <BookmarkCheck size={28} color="var(--primary-blue)" />}
                {isActive && <Unlock size={28} color="var(--success-green)" />}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ 
                  backgroundColor: getDifficultyColor(challenge.difficulty).bg, 
                  color: getDifficultyColor(challenge.difficulty).color, 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '6px', 
                  fontSize: '0.75rem', 
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  {challenge.difficulty}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                  ({challenge.points} pts)
                </span>
              </div>

              <h4 style={{ marginBottom: '0.5rem', color: 'var(--dark-blue)' }}>{challenge.name}</h4>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', visibility: isLocked ? 'hidden' : 'visible', fontWeight: 600 }}>
                {isCompleted ? "Memory Unlocked." : (isActive ? "A new challenger approaches... Step in!" : "Sealed by ancient magic.")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
