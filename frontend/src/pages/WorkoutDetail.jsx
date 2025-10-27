import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workoutApi } from '../services/api';
import { formatDateTime } from '../utils/helpers';
import RestTimer from '../components/workouts/RestTimer';

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressData, setProgressData] = useState({});
  const [latestWeights, setLatestWeights] = useState({});
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [restModeEnabled, setRestModeEnabled] = useState(true); // Toggle för vila-läge

  const loadWorkout = async () => {
    setLoading(true);
    try {
      // Hämta workout detaljer
      const workouts = await workoutApi.getWorkouts();
      const foundWorkout = workouts.find(w => w.id === parseInt(id));
      setWorkout(foundWorkout);

      // Hämta progress logs för att få senaste vikterna
      const progressLogs = await workoutApi.getProgressLogs();
      const weights = {};
      
      progressLogs.forEach(log => {
        if (log.exercise && (!weights[log.exercise.id] || new Date(log.date) > new Date(weights[log.exercise.id].date))) {
          weights[log.exercise.id] = {
            weight: log.weight,
            date: log.date
          };
        }
      });
      
      setLatestWeights(weights);
      
      // Sätt förvalda värden från senaste vikter
      const initialProgress = {};
      if (foundWorkout && foundWorkout.exercises) {
        foundWorkout.exercises.forEach(exercise => {
          initialProgress[exercise.id] = {
            weight: weights[exercise.id]?.weight || 50,
            sets: 3,
            reps: 10
          };
        });
      }
      setProgressData(initialProgress);
      
    } catch (error) {
      console.error('Error loading workout:', error);
    }
    setLoading(false);
  };

  const handleWeightChange = (exerciseId, field, value) => {
    setProgressData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: parseInt(value) || 0
      }
    }));
  };

// I logProgress funktionen - sätt showRestTimer till true OCH använd autoStart
const logProgress = async (exerciseId) => {
  const data = progressData[exerciseId];
  if (!data) return;

  try {
    await workoutApi.createProgressLog({
      user: { id: 1 },
      exercise: { id: exerciseId },
      sets: data.sets,
      reps: data.reps,
      weight: data.weight,
      date: new Date().toISOString()
    });

    // Markera övningen som klar
    setCompletedExercises(prev => new Set(prev).add(exerciseId));

    // Starta vilanedräkning OM vila-läge är aktiverat
    if (restModeEnabled) {
      setShowRestTimer(true);
    }
    
  } catch (error) {
    console.error('Error logging progress:', error);
    alert('Kunde inte spara progress');
  }
};

  const logAllProgress = async () => {
    try {
      const promises = Object.keys(progressData).map(exerciseId => 
        workoutApi.createProgressLog({
          user: { id: 1 },
          exercise: { id: parseInt(exerciseId) },
          sets: progressData[exerciseId].sets,
          reps: progressData[exerciseId].reps,
          weight: progressData[exerciseId].weight,
          date: new Date().toISOString()
        })
      );

      await Promise.all(promises);
      alert('All progress sparad!');
      await loadWorkout();
    } catch (error) {
      console.error('Error logging all progress:', error);
      alert('Kunde inte spara all progress');
    }
  };

  const handleTimerComplete = () => {
    // Timer klar - stäng automatiskt
    setShowRestTimer(false);
    console.log('Vilan är klar och försvinner automatiskt!');
  };

  const handleTimerCancel = () => {
    // Användaren avbröt vilotiden
    setShowRestTimer(false);
    console.log('Vilan avbröts manuellt');
  };

  useEffect(() => {
    if (id) {
      loadWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <p>Laddar workout...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div style={{ padding: '1rem' }}>
        <button 
          onClick={() => navigate('/workouts')}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#6c757d',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          ← Tillbaka till Workouts
        </button>
        <p>Workout hittades inte</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <button 
        onClick={() => navigate('/workouts')}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#6c757d',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        ← Tillbaka
      </button>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>{workout.name}</h1>
            <p style={{ margin: '0.5rem 0' }}><strong>🗓️ Schemalagd:</strong> {formatDateTime(workout.scheduledAt)}</p>
            <p style={{ margin: '0.5rem 0' }}><strong>👤 Användare:</strong> {workout.user?.username}</p>
          </div>
          
          {/* Vila-läge Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: restModeEnabled ? '#e8f4fd' : '#f8f9fa',
            border: `2px solid ${restModeEnabled ? '#3498db' : '#bdc3c7'}`,
            borderRadius: '8px'
          }}>
            <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>⏱️ Vila-läge:</span>
            <button
              onClick={() => setRestModeEnabled(!restModeEnabled)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: restModeEnabled ? '#3498db' : '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            >
              {restModeEnabled ? 'PÅ' : 'AV'}
            </button>
          </div>
        </div>
      </div>

      {/* Rest Timer - visas bara när vila-läge är aktiverat och en övning sparats */}
      {showRestTimer && restModeEnabled && (
        <RestTimer 
          onTimerComplete={handleTimerComplete}
          onTimerCancel={handleTimerCancel}
          initialTime={60}
          autoStart={true} // ⭐ NYTT: Starta automatiskt!
        />
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Övningar</h2>
        <button 
          onClick={logAllProgress}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Spara All Progress
        </button>
      </div>

      {workout.exercises && workout.exercises.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {workout.exercises.map(exercise => (
            <div key={exercise.id} style={{
              border: completedExercises.has(exercise.id) ? '2px solid #27ae60' : '1px solid #ddd',
              borderRadius: '8px',
              padding: '1.5rem',
              backgroundColor: completedExercises.has(exercise.id) ? '#f0fff4' : 'white',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                    {exercise.name}
                    {completedExercises.has(exercise.id) && <span style={{ color: '#27ae60', marginLeft: '0.5rem' }}>✅</span>}
                  </h3>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>
                    {exercise.muscleGroup} • {exercise.category}
                  </p>
                  {latestWeights[exercise.id] && (
                    <p style={{ margin: '0.25rem 0', color: '#28a745', fontSize: '0.9rem' }}>
                      💪 Senaste: {latestWeights[exercise.id].weight} kg
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => logProgress(exercise.id)}
                  disabled={completedExercises.has(exercise.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: completedExercises.has(exercise.id) ? '#bdc3c7' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: completedExercises.has(exercise.id) ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    minWidth: '100px'
                  }}
                >
                  {completedExercises.has(exercise.id) ? 'Sparad' : 'Spara'}
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
                    Vikt (kg)
                  </label>
                  <input
                    type="number"
                    value={progressData[exercise.id]?.weight || ''}
                    onChange={(e) => handleWeightChange(exercise.id, 'weight', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                    min="1"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
                    Sets
                  </label>
                  <input
                    type="number"
                    value={progressData[exercise.id]?.sets || ''}
                    onChange={(e) => handleWeightChange(exercise.id, 'sets', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                    min="1"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
                    Reps
                  </label>
                  <input
                    type="number"
                    value={progressData[exercise.id]?.reps || ''}
                    onChange={(e) => handleWeightChange(exercise.id, 'reps', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                    min="1"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
                    Total volym
                  </label>
                  <div style={{
                    padding: '0.5rem',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#2c3e50'
                  }}>
                    {((progressData[exercise.id]?.weight || 0) * 
                      (progressData[exercise.id]?.sets || 0) * 
                      (progressData[exercise.id]?.reps || 0))} kg
                  </div>
                </div>
              </div>

              {/* Progress info */}
              {completedExercises.has(exercise.id) && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  ✅ Övning slutförd - {progressData[exercise.id]?.weight} kg × {progressData[exercise.id]?.sets} × {progressData[exercise.id]?.reps}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <p style={{ margin: 0, color: '#666' }}>Inga övningar i detta workout</p>
        </div>
      )}

      {/* Sammanfattning */}
      {completedExercises.size > 0 && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          border: '2px solid #27ae60',
          borderRadius: '8px',
          backgroundColor: '#f0fff4'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#27ae60' }}>📊 Sammanfattning</h3>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Slutförda övningar:</strong> {completedExercises.size} av {workout.exercises?.length || 0}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Framsteg:</strong> {Math.round((completedExercises.size / (workout.exercises?.length || 1)) * 100)}% klar
          </p>
          {restModeEnabled && (
            <p style={{ margin: '0.5rem 0', color: '#3498db' }}>
              ⏱️ Vila-läge: <strong>AKTIVERAT</strong> - vilanedräkning visas efter varje sparad övning
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutDetail;