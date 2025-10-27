import React from 'react';
import WorkoutForm from '../components/workouts/WorkoutForm';
import { workoutApi } from '../services/api';

const AddWorkout = () => {
  const handleSubmit = async (workoutData) => {
    try {
      await workoutApi.createWorkout(workoutData);
      alert('Workout sparad!');
      // Du kan lägga till redirect eller formuläråterställning här
    } catch (error) {
      console.error('Error saving workout:', error);
      alert('Kunde inte spara workout');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Skapa Nytt Workout</h2>
      <WorkoutForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddWorkout;