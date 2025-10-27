import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BottomNav from './components/common/BottomNav';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import WorkoutDetail from './pages/WorkoutDetail';
import Exercises from './pages/Exercises';
import Progress from './pages/Progress';
import AddWorkout from './pages/AddWorkout';
import DesktopNav from './components/common/DesktopNav'; // 👈 Ny import
import './App.css';

// Main App Component
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
      
      {/* Desktop Navigation */}
         <DesktopNav />

      <main style={{ paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/add-workout" element={<AddWorkout />} />
        </Routes>
      </main>

      <Footer />
      
      {/* Mobile Bottom Navigation */}
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
    </div>
  );
}

// Wrapper component with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;