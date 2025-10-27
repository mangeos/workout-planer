import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { workoutApi } from '../services/api';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    muscleGroup: ''
  });

  const loadExercises = async () => {
    setLoading(true);
    try {
      const data = await workoutApi.getExercises();
      setExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
    setLoading(false);
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      await workoutApi.createExercise(formData);
      await loadExercises();
      setShowForm(false);
      setFormData({ name: '', description: '', category: '', muscleGroup: '' });
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h2>Övningar</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: showForm ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Avbryt' : '+ Ny Övning'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleAddExercise} style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1rem',
          margin: '1rem 0'
        }}>
          <h3>Lägg till Ny Övning</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label>Namn: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Beskrivning: </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ marginLeft: '0.5rem', padding: '0.5rem', width: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Kategori: </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Muskelgrupp: </label>
            <input
              type="text"
              name="muscleGroup"
              value={formData.muscleGroup}
              onChange={handleChange}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </div>

          <Button type="submit">Lägg till Övning</Button>
        </form>
      )}
      
      {loading ? (
        <p>Laddar övningar...</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1rem' 
        }}>
          {exercises.map(exercise => (
            <div key={exercise.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#f8f9fa'
            }}>
              <h3>{exercise.name}</h3>
              <p><strong>Beskrivning:</strong> {exercise.description}</p>
              <p><strong>Kategori:</strong> {exercise.category}</p>
              <p><strong>Muskelgrupp:</strong> {exercise.muscleGroup}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;