import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLocalError('');
      console.log('Google ID Token received:', credentialResponse);
      
      // 👇 VIKTIGT: Använd credentialResponse.credential (id_token)
      await login(credentialResponse.credential);
      console.log('Backend login successful, redirecting...');
      
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setLocalError('Login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setLocalError('Google login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Workout Tracker</h1>
        <p>Sign in to track your workouts and progress</p>
        
        {(error || localError) && (
          <div className="error-message">{error || localError}</div>
        )}
        
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          theme="filled_blue"
          size="large"
          text="signin_with"
          shape="rectangular"
        />
        
        <div className="login-features">
          <h3>Track Your Fitness Journey:</h3>
          <ul>
            <li>💪 Create and manage workouts</li>
            <li>📊 Log your progress</li>
            <li>📈 View statistics and charts</li>
            <li>🎯 Set and achieve fitness goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;