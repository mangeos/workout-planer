import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dekorativa element - göm på mobil */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        display: window.innerWidth < 768 ? 'none' : 'block'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        display: window.innerWidth < 768 ? 'none' : 'block'
      }}></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          flexShrink: 0
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            flexShrink: 0
          }} onClick={() => navigate('/')}>
            💪
          </div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{
              margin: 0,
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', // Responsiv fontstorlek
              fontWeight: '700',
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }} onClick={() => navigate('/')}>
              Workout Tracker
            </h1>
            <p style={{
              margin: '0.1rem 0 0 0',
              fontSize: '0.8rem',
              opacity: 0.9,
              fontWeight: '300',
              display: window.innerWidth < 480 ? 'none' : 'block' // Göm på mycket små skärmar
            }}>
              Träna smartare, inte hårdare
            </p>
          </div>
        </div>
        
        {/* Right Section - Status och Auth */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }}>
          {/* Status indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.1)',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            order: window.innerWidth < 640 ? 2 : 1, // Ändra ordning på små skärmar
            flexShrink: 0
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: isAuthenticated ? '#4ade80' : '#ef4444',
              borderRadius: '50%',
              animation: isAuthenticated ? 'pulse 2s infinite' : 'none'
            }}></div>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              {isAuthenticated ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Auth buttons */}
          {isAuthenticated && user ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              order: 1,
              flexWrap: 'wrap'
            }}>
              {/* User info - visa bara namn på mobil */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}>
                  {window.innerWidth < 640 ? '👋' : `👋 ${user.name || user.username}`}
                </span>
                {user.email && window.innerWidth >= 640 && (
                  <span style={{
                    fontSize: '0.7rem',
                    opacity: 0.8
                  }}>
                    {user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email}
                  </span>
                )}
              </div>
              
              {/* Logout button - kompakt på mobil */}
              <button 
                onClick={handleLogout}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: window.innerWidth < 480 ? '0.4rem 0.8rem' : '0.5rem 1rem',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  fontSize: window.innerWidth < 480 ? '0.75rem' : '0.8rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.3)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span>{window.innerWidth < 480 ? '🚪' : '🚪'}</span>
                {window.innerWidth < 480 ? 'Logga ut' : 'Logout'}
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: window.innerWidth < 480 ? '0.6rem 1rem' : '0.75rem 1.5rem',
                borderRadius: '22px',
                cursor: 'pointer',
                fontSize: window.innerWidth < 480 ? '0.8rem' : '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)',
                whiteSpace: 'nowrap',
                order: 1
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span>🔑</span>
              {window.innerWidth < 480 ? 'Logga in' : 'Login'}
            </button>
          )}
        </div>
      </div>

      {/* CSS animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </header>
  );
};

export default Header;