import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { formatDateTime } from '../../utils/helpers';

const WorkoutItem = ({ workout, onDelete }) => {
  const navigate = useNavigate();

  if (!workout) {
    return (
      <div style={{
        border: '1px solid #ffcccc',
        borderRadius: '8px',
        padding: '1rem',
        margin: '0.5rem 0',
        backgroundColor: '#fff5f5'
      }}>
        <p style={{ color: '#e53e3e' }}>Fel: Workout data saknas</p>
      </div>
    );
  }

  const workoutName = workout.name || 'Namn saknas';
  const scheduledAt = workout.scheduledAt ? formatDateTime(workout.scheduledAt) : 'Datum saknas';
  const username = workout.user?.username || 'Användare saknas';
  const exercises = workout.exercises || [];

  return (
    <div 
      onClick={() => navigate(`/workout/${workout.id}`)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        margin: '0.5rem 0',
        backgroundColor: '#f8f9fa',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transform: 'translateY(-1px)'
        }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <h3>{workoutName}</h3>
      <p><strong>Schemalagd:</strong> {scheduledAt}</p>
      <p><strong>Användare:</strong> {username}</p>
      
      {exercises.length > 0 ? (
        <div>
          <strong>Övningar:</strong>
          <ul>
            {exercises.map(exercise => (
              <li key={exercise.id}>
                {exercise.name || 'Namn saknas'} - {exercise.muscleGroup || 'Muskelgrupp saknas'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p><em>Inga övningar tillagda</em></p>
      )}
      
      {/* Ta bort delete-knappen eller lägg till e.stopPropagation() om du vill behålla den */}
      {/* <Button variant="danger" onClick={(e) => { e.stopPropagation(); onDelete(workout.id); }}>
        Ta bort
      </Button> */}
    </div>
  );
};

export default WorkoutItem;