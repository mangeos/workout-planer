import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { workoutApi } from '../../services/api';

const WorkoutForm = ({ onSubmit }) => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    scheduledAt: new Date().toISOString().slice(0, 16), // För datetime-local
    userId: 1, // Temporärt - du kan lägga till user selection senare
    exerciseIds: [] // Lista med valda exercise IDs
  });

  // Ladda exercises när komponenten mountas
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
    
    // Konvertera till rätt format för WorkoutCreateDto
    const workoutData = {
      name: formData.name,
      scheduledAt: formData.scheduledAt,
      user: { id: formData.userId }, // UserDto format
      exercises: formData.exerciseIds.map(id => ({ id })) // ExerciseDto format
    };

    onSubmit(workoutData);
    
    // Återställ formuläret
    setFormData({
      name: '',
      scheduledAt: new Date().toISOString().slice(0, 16),
      userId: 1,
      exerciseIds: []
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Hantera exercise val
      const exerciseId = parseInt(value);
      setFormData(prev => ({
        ...prev,
        exerciseIds: checked 
          ? [...prev.exerciseIds, exerciseId]
          : prev.exerciseIds.filter(id => id !== exerciseId)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      <h3>Skapa Nytt Workout</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Workout Namn: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginLeft: '0.5rem', padding: '0.5rem', width: '200px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Schemalagd: </label>
        <input
          type="datetime-local"
          name="scheduledAt"
          value={formData.scheduledAt}
          onChange={handleChange}
          required
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>User ID: </label>
        <input
          type="number"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
          style={{ marginLeft: '0.5rem', padding: '0.5rem', width: '80px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Välj Övningar: </label>
        <div style={{ marginTop: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
          {exercises.map(exercise => (
            <div key={exercise.id} style={{ marginBottom: '0.5rem' }}>
              <label>
                <input
                  type="checkbox"
                  value={exercise.id}
                  checked={formData.exerciseIds.includes(exercise.id)}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                {exercise.name} ({exercise.muscleGroup})
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit">Skapa Workout</Button>
    </form>
  );
};

export default WorkoutForm;