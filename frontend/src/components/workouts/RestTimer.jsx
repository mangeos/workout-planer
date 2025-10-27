import React, { useState, useEffect } from 'react';

const RestTimer = ({ onTimerComplete, onTimerCancel, initialTime = 60, autoStart = false }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart); // Starta automatiskt om autoStart är true
  const [customTime, setCustomTime] = useState(initialTime);

  useEffect(() => {
    let interval;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsRunning(false);
            onTimerComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimerComplete]);

  // Auto-start effekt
  useEffect(() => {
    if (autoStart && !isRunning) {
      setIsRunning(true);
    }
  }, [autoStart, isRunning]);

  const startTimer = (time = customTime) => {
    setTimeLeft(time);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(customTime);
  };

  const cancelTimer = () => {
    setIsRunning(false);
    setTimeLeft(customTime);
    onTimerCancel();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      border: '2px solid #3498db',
      borderRadius: '12px',
      padding: '1.5rem',
      backgroundColor: isRunning ? '#e8f4fd' : '#f8f9fa',
      textAlign: 'center',
      margin: '1rem 0',
      position: 'relative'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>⏱️ Vila</h3>
      
      {/* Timer Display */}
      <div style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: isRunning ? '#e74c3c' : '#2c3e50',
        marginBottom: '1rem',
        fontFamily: 'monospace'
      }}>
        {formatTime(timeLeft)}
      </div>

      {/* Quick Time Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {[30, 60, 90, 120].map(seconds => (
          <button
            key={seconds}
            onClick={() => startTimer(seconds)}
            disabled={isRunning}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isRunning ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {seconds}s
          </button>
        ))}
      </div>

      {/* Custom Time Input */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          type="number"
          value={customTime}
          onChange={(e) => setCustomTime(parseInt(e.target.value) || 60)}
          disabled={isRunning}
          style={{
            width: '80px',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textAlign: 'center'
          }}
          min="10"
          max="300"
        />
        <span>sekunder</span>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {!isRunning ? (
          <button
            onClick={() => startTimer()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Starta Vila
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Pausa
          </button>
        )}
        
        <button
          onClick={resetTimer}
          disabled={isRunning}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isRunning ? '#bdc3c7' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          Återställ
        </button>

        {/* Avbryt knapp - visas bara när timern körs */}
        {isRunning && (
          <button
            onClick={cancelTimer}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Avbryt
          </button>
        )}

        {/* Stäng knapp - visas alltid */}
        <button
          onClick={cancelTimer}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Stäng
        </button>
      </div>

      {/* Status */}
      {isRunning && (
        <p style={{ margin: '1rem 0 0 0', color: '#e74c3c', fontWeight: 'bold' }}>
          ⏰ Vilan pågår automatiskt... 
          <button 
            onClick={cancelTimer}
            style={{
              marginLeft: '1rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: 'transparent',
              color: '#e74c3c',
              border: '1px solid #e74c3c',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Avbryt
          </button>
        </p>
      )}
      
      {timeLeft === 0 && !isRunning && (
        <p style={{ margin: '1rem 0 0 0', color: '#27ae60', fontWeight: 'bold' }}>
          ✅ Vilan är klar! Fortsätt med nästa övning.
        </p>
      )}

      {/* Auto-start meddelande */}
      {autoStart && isRunning && (
        <p style={{ 
          margin: '0.5rem 0 0 0', 
          color: '#3498db', 
          fontSize: '0.9rem',
          fontStyle: 'italic'
        }}>
          ⚡ Startade automatiskt efter sparad övning
        </p>
      )}
    </div>
  );
};

export default RestTimer;