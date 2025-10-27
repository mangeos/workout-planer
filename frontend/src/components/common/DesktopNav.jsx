import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DesktopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { key: 'home', label: 'Hem', icon: '🏠', path: '/' },
    { key: 'workouts', label: 'Workouts', icon: '💪', path: '/workouts' },
    { key: 'exercises', label: 'Övningar', icon: '🏋️', path: '/exercises' },
    { key: 'progress', label: 'Progress', icon: '📊', path: '/progress' },
    { key: 'add', label: 'Skapa', icon: '➕', path: '/add-workout' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '0.75rem 1rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'none' // 👈 Dölj som default
    }} className="desktop-nav">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo/Brand */}
        <div 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            background: isActive('/') ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
            border: isActive('/') ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent',
            minWidth: 'fit-content'
          }}
          onMouseEnter={(e) => {
            if (!isActive('/')) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/')) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            flexShrink: 0
          }}>
            💪
          </div>
          <div style={{ flexShrink: 0 }}>
            <div style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', // 👈 Responsiv textstorlek
              fontWeight: '700',
              background: 'linear-gradient(45deg, #fff, #bdc3c7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2'
            }}>
              WorkoutPro
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: '#888',
              fontWeight: '500',
              display: 'block'
            }}>
              TRAIN SMARTER
            </div>
          </div>
        </div>

        {/* Navigation Items - Responsiv */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255,255,255,0.05)',
          padding: '0.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            const hovered = hoveredItem === item.key;
            
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.key)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', // 👈 Responsiv text
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                  minWidth: 'fit-content',
                  
                  // Conditional styles
                  background: active 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : hovered 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'transparent',
                  
                  color: active ? 'white' : hovered ? '#fff' : '#bdc3c7',
                  
                  transform: active 
                    ? 'translateY(0)' 
                    : hovered 
                    ? 'translateY(-1px)' 
                    : 'translateY(0)',
                  
                  boxShadow: active 
                    ? '0 8px 20px rgba(102, 126, 234, 0.4)' 
                    : hovered 
                    ? '0 4px 12px rgba(0,0,0,0.2)' 
                    : 'none'
                }}
              >
                {/* Animated background for hover effect */}
                {hovered && !active && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    borderRadius: '12px'
                  }}></div>
                )}
                
                <span style={{ 
                  fontSize: '1.1rem',
                  position: 'relative',
                  zIndex: 2,
                  flexShrink: 0
                }}>
                  {item.icon}
                </span>
                <span style={{ 
                  position: 'relative',
                  zIndex: 2,
                  whiteSpace: 'nowrap'
                }}>
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {active && (
                  <div style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    background: '#4ade80',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px #4ade80'
                  }}></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;