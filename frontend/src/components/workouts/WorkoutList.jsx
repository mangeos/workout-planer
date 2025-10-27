import React from 'react';
import WorkoutItem from './WorkoutItem';

const WorkoutList = ({ workouts, onDeleteWorkout }) => {
  // Kontrollera att workouts är en array
  if (!workouts || !Array.isArray(workouts)) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: '#e53e3e' }}>Fel: Kunde inte ladda workouts</p>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Inga workouts tillgängliga</p>
      </div>
    );
  }

  return (
    <div>
      {workouts.map((workout, index) => (
        <WorkoutItem 
          key={workout?.id || index} // Fallback till index om id saknas
          workout={workout} 
          onDelete={onDeleteWorkout}
        />
      ))}
    </div>
  );
};

export default WorkoutList;