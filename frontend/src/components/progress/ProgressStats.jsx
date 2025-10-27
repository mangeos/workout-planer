import React from 'react';
import { formatWeight } from '../../utils/helpers';

const ProgressStats = ({ progressLogs }) => {
  if (progressLogs.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
      }}>
        <p>Ingen progress data tillgänglig</p>
      </div>
    );
  }

  // Gruppera per övning och beräkna statistik
  const exerciseStats = {};
  
  progressLogs.forEach(log => {
    if (!log.exercise) return;
    
    const exerciseName = log.exercise.name;
    if (!exerciseStats[exerciseName]) {
      exerciseStats[exerciseName] = {
        logs: [],
        maxWeight: 0,
        totalVolume: 0
      };
    }
    
    exerciseStats[exerciseName].logs.push(log);
    exerciseStats[exerciseName].maxWeight = Math.max(exerciseStats[exerciseName].maxWeight, log.weight);
    exerciseStats[exerciseName].totalVolume += log.sets * log.reps * log.weight;
  });

  return (
    <div>
      <h3>Progress Statistik</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {Object.keys(exerciseStats).map(exerciseName => (
          <div key={exerciseName} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#f8f9fa'
          }}>
            <h4>{exerciseName}</h4>
            <p><strong>Maxvikt:</strong> {formatWeight(exerciseStats[exerciseName].maxWeight)}</p>
            <p><strong>Antal pass:</strong> {exerciseStats[exerciseName].logs.length}</p>
            <p><strong>Total volym:</strong> {exerciseStats[exerciseName].totalVolume} kg</p>
            
            {/* Senaste 3 passen */}
            <div style={{ marginTop: '0.5rem' }}>
              <strong>Senaste pass:</strong>
              {exerciseStats[exerciseName].logs
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3)
                .map((log, index) => (
                  <div key={index} style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {formatWeight(log.weight)} × {log.sets} × {log.reps}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStats;