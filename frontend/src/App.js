import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext'; // 👈 Importera Auth
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BottomNav from './components/common/BottomNav';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import WorkoutDetail from './pages/WorkoutDetail';
import Exercises from './pages/Exercises';
import Progress from './pages/Progress';
import AddWorkout from './pages/AddWorkout';
import Login from './pages/Login';
import DesktopNav from './components/common/DesktopNav';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main App Component
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Header />
      
      {/* Desktop Navigation - visa bara om inloggad */}
      {isAuthenticated && <DesktopNav />}

      <main style={{ paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Skyddade routes */}
          <Route path="/workouts" element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          } />
          <Route path="/workout/:id" element={
            <ProtectedRoute>
              <WorkoutDetail />
            </ProtectedRoute>
          } />
          <Route path="/exercises" element={
            <ProtectedRoute>
              <Exercises />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          } />
          <Route path="/add-workout" element={
            <ProtectedRoute>
              <AddWorkout />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <Footer />
      
      {/* Mobile Bottom Navigation - visa bara om inloggad */}
      {isAuthenticated && (
        <div className="mobile-bottom-nav">
          <BottomNav 
            currentPage={currentPage} 
            onNavigate={(page) => {
              setCurrentPage(page);
              const routes = {
                home: '/',
                workouts: '/workouts',
                exercises: '/exercises', 
                progress: '/progress',
                add: '/add-workout'
              };
              navigate(routes[page]);
            }} 
          />
        </div>
      )}
    </div>
  );
}

// Wrapper component with Router and Auth
function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '235164918010-2j43c7ge7l1r5fki4s1uasa80693s2r8.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;