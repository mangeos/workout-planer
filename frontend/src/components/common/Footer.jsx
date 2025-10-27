import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      padding: '3rem 1rem 2rem',
      marginTop: 'auto',
      position: 'relative'
    }}>
      {/* Dekorativ top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)'
      }}></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Brand Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              💪
            </div>
            <h3 style={{ 
              margin: 0, 
              fontSize: '1.3rem',
              fontWeight: '700',
              background: 'linear-gradient(45deg, #fff, #bdc3c7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Workout Tracker
            </h3>
          </div>
          <p style={{
            margin: '0.5rem 0',
            color: '#bdc3c7',
            lineHeight: '1.6',
            fontSize: '0.95rem'
          }}>
            Din ultimata träningskompanjon. Spåra dina framsteg, 
            uppnå dina mål och transformera din träning.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {['💪', '🏋️', '📊', '🔥'].map((emoji, index) => (
              <div
                key={index}
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    background: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)'
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#ecf0f1'
          }}>
            Snabblänkar
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {[
              { name: 'Workouts', emoji: '💪' },
              { name: 'Övningar', emoji: '🏋️' },
              { name: 'Progress', emoji: '📊' },
              { name: 'Statistik', emoji: '📈' }
            ].map((item, index) => (
              <li key={index}>
                <a href="#" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  ':hover': {
                    color: '#3498db',
                    transform: 'translateX(5px)'
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3498db';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#bdc3c7';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}>
                  <span>{item.emoji}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats Section */}
        <div>
          <h4 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#ecf0f1'
          }}>
            Träningsstatistik
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {[
              { label: 'Aktiva användare', value: '1.2k+', emoji: '👥' },
              { label: 'Workouts skapade', value: '15k+', emoji: '💪' },
              { label: 'Timmar tränade', value: '50k+', emoji: '⏱️' },
              { label: 'Mål uppnådda', value: '8k+', emoji: '🎯' }
            ].map((stat, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '35px',
                  height: '35px',
                  background: 'linear-gradient(135deg, #3498db, #2980b9)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  {stat.emoji}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#bdc3c7',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontSize: '1.1rem', 
                    color: '#ecf0f1',
                    fontWeight: '700'
                  }}>
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto 0',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ color: '#bdc3c7', fontSize: '0.9rem' }}>
          © {currentYear} Workout Tracker. Alla rättigheter förbehållna.
        </div>
        <div style={{ display: 'flex', gap: '1rem', color: '#bdc3c7', fontSize: '0.9rem' }}>
          <span>Byggd med ❤️ och 💪</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;