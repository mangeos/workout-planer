import React from 'react';

const BottomNav = ({ currentPage, onNavigate }) => {
  const navItems = [
    { key: 'home', label: 'Hem', icon: '🏠' },
    { key: 'workouts', label: 'Workouts', icon: '💪' },
    { key: 'exercises', label: 'Övningar', icon: '🏋️' },
    { key: 'progress', label: 'Progress', icon: '📊' },
    { key: 'add', label: 'Lägg till', icon: '➕' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid #e0e0e0',
      padding: '0.5rem 0',
      zIndex: 1000,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              minWidth: '60px',
              backgroundColor: currentPage === item.key ? '#f8f9fa' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ 
              fontSize: '1.5rem',
              marginBottom: '0.25rem'
            }}>
              {item.icon}
            </span>
            <span style={{ 
              fontSize: '0.7rem',
              fontWeight: currentPage === item.key ? 'bold' : 'normal',
              color: currentPage === item.key ? '#3498db' : '#7f8c8d'
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;