import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
  const styles = {
    primary: {
      backgroundColor: '#3498db',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#95a5a6',
      color: 'white'
    },
    danger: {
      backgroundColor: '#e74c3c',
      color: 'white'
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        ...styles[variant]
      }}
    >
      {children}
    </button>
  );
};

export default Button;