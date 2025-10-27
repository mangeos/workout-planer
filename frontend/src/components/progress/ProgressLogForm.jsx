import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { workoutApi } from '../../services/api';

const ProgressLogForm = ({ onSubmit }) => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    userId: 1,
    exerciseId: '',
    reps: 8,
    sets: 3,
    weight: 50,
    date: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await workoutApi.getExercises();
        setExercises(data);
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    };
    loadExercises();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const logData = {
      user: { id: formData.userId },
      exercise: { id: parseInt(formData.exerciseId) },
      reps: formData.reps,
      sets: formData.sets,
      weight: formData.weight,
      date: formData.date
    };

    onSubmit(logData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      <h3>Lägg till Progress Logg</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Övning: </label>
        <select
          name="exerciseId"
          value={formData.exerciseId}
          onChange={handleChange}
          required
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        >
          <option value="">Välj övning</option>
          {exercises.map(exercise => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Sets: </label>
        <input
          type="number"
          name="sets"
          value={formData.sets}
          onChange={handleChange}
          min="1"
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Reps: </label>
        <input
          type="number"
          name="reps"
          value={formData.reps}
          onChange={handleChange}
          min="1"
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Vikt (kg): </label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          min="1"
          step="0.5"
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Datum: </label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        />
      </div>

      <Button type="submit">Lägg till Progress</Button>
    </form>
  );
};

export default ProgressLogForm;