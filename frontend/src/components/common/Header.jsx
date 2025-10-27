import React from 'react';

const Header = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1.5rem 1rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dekorativa element */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%'
      }}></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            backdropFilter: 'blur(10px)'
          }}>
            💪
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '1.8rem',
              fontWeight: '700',
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Workout Tracker
            </h1>
            <p style={{
              margin: '0.25rem 0 0 0',
              fontSize: '0.9rem',
              opacity: 0.9,
              fontWeight: '300'
            }}>
              Träna smartare, inte hårdare
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255,255,255,0.1)',
          padding: '0.5rem 1rem',
          borderRadius: '25px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            background: '#4ade80',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Online</span>
        </div>
      </div>

    
    </header>
  );
};

export default Header;