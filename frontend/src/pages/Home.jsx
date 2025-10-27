import React, { useState, useEffect } from 'react';
import WorkoutCarousel from '../components/home/WorkoutCarousel';
import { workoutApi } from '../services/api';

const Home = () => {
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecentWorkouts = async () => {
    setLoading(true);
    try {
      const workouts = await workoutApi.getWorkouts();
      // Sortera efter datum och ta de 6 senaste
      const sortedWorkouts = workouts
        .sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt))
        .slice(0, 6);
      setRecentWorkouts(sortedWorkouts);
    } catch (error) {
      console.error('Error loading recent workouts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRecentWorkouts();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
          Välkommen till Workout Tracker
        </h2>
        <p style={{ 
          color: '#7f8c8d', 
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Hantera dina workouts, övningar och följ dina träningsframsteg på ett enkelt sätt!
        </p>
      </div>
      
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '3rem' 
      }}>
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '12px', 
          padding: '1.5rem',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💪</div>
          <h3 style={{ margin: '0.5rem 0', color: '#2c3e50' }}>Workouts</h3>
          <p style={{ color: '#7f8c8d', margin: 0 }}>Skapa och hantera dina träningspass</p>
        </div>
        
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '12px', 
          padding: '1.5rem',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏋️</div>
          <h3 style={{ margin: '0.5rem 0', color: '#2c3e50' }}>Övningar</h3>
          <p style={{ color: '#7f8c8d', margin: 0 }}>Lägg till och redigera övningar</p>
        </div>
        
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '12px', 
          padding: '1.5rem',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ margin: '0.5rem 0', color: '#2c3e50' }}>Progress</h3>
          <p style={{ color: '#7f8c8d', margin: 0 }}>Följ dina framsteg över tid</p>
        </div>
      </div>

      {/* Workout Carousel */}
      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <p>Laddar senaste workouts...</p>
        </div>
      ) : (
        <WorkoutCarousel workouts={recentWorkouts} />
      )}
    </div>
  );
};

export default Home;