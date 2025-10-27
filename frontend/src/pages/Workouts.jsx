import React, { useState, useEffect } from 'react';
import WorkoutList from '../components/workouts/WorkoutList';
import WorkoutForm from '../components/workouts/WorkoutForm';
import { workoutApi } from '../services/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const loadWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await workoutApi.getWorkouts();
      // Säkerställ att vi fick en array
      setWorkouts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading workouts:', error);
      setError('Kunde inte ladda workouts');
      setWorkouts([]);
    }
    setLoading(false);
  };

  const handleAddWorkout = async (workoutData) => {
    try {
      await workoutApi.createWorkout(workoutData);
      await loadWorkouts();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding workout:', error);
      setError('Kunde inte skapa workout');
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (window.confirm('Är du säker på att du vill ta bort detta workout?')) {
      try {
        await workoutApi.deleteWorkout(workoutId);
        await loadWorkouts();
      } catch (error) {
        console.error('Error deleting workout:', error);
        setError('Kunde inte ta bort workout');
      }
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h2>Mina Workouts</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: showForm ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Avbryt' : '+ Nytt Workout'}
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fed7d7',
          border: '1px solid #feb2b2',
          borderRadius: '4px',
          padding: '1rem',
          marginBottom: '1rem',
          color: '#c53030'
        }}>
          {error}
        </div>
      )}
      
      {showForm && (
        <WorkoutForm onSubmit={handleAddWorkout} />
      )}
      
      {loading ? (
        <p>Laddar workouts...</p>
      ) : (
        <WorkoutList 
          workouts={workouts} 
          onDeleteWorkout={handleDeleteWorkout} 
        />
      )}
    </div>
  );
};

export default Workouts;