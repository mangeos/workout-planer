import React, { useState, useEffect } from 'react';
import ProgressLogForm from '../components/progress/ProgressLogForm';
import ProgressStats from '../components/progress/ProgressStats';
import ProgressChart from '../components/progress/ProgressChart';
import { workoutApi } from '../services/api';
import { formatDateTime, formatWeight } from '../utils/helpers';

const Progress = () => {
  const [progressLogs, setProgressLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState('stats'); // 'stats', 'chart', eller 'list'

  const loadProgressLogs = async () => {
    setLoading(true);
    try {
      const data = await workoutApi.getProgressLogs();
      setProgressLogs(data);
    } catch (error) {
      console.error('Error loading progress logs:', error);
    }
    setLoading(false);
  };

  const handleAddProgressLog = async (logData) => {
    try {
      await workoutApi.createProgressLog(logData);
      await loadProgressLogs();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding progress log:', error);
    }
  };

  useEffect(() => {
    loadProgressLogs();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2>Träningsframsteg</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select 
            value={view} 
            onChange={(e) => setView(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          >
            <option value="stats">📊 Statistik</option>
            <option value="chart">📈 Diagram</option>
            <option value="list">📝 Lista</option>
          </select>
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 20px',
              backgroundColor: showForm ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {showForm ? '✕ Avbryt' : '➕ Ny Progress'}
          </button>
        </div>
      </div>
      
      {showForm && (
        <ProgressLogForm onSubmit={handleAddProgressLog} />
      )}

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <p>Laddar progress loggar...</p>
        </div>
      ) : view === 'stats' ? (
        <ProgressStats progressLogs={progressLogs} />
      ) : view === 'chart' ? (
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <ProgressChart progressLogs={progressLogs} />
        </div>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <h3>Alla Progress Loggar</h3>
          {progressLogs.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}>
              <p>Inga progress loggar tillgängliga</p>
            </div>
          ) : (
            progressLogs.map(log => (
              <div key={log.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                margin: '0.5rem 0',
                backgroundColor: '#f8f9fa'
              }}>
                <h4>{log.exercise?.name || 'Övning saknas'}</h4>
                <p><strong>Användare:</strong> {log.user?.username}</p>
                <p><strong>Sets:</strong> {log.sets} | <strong>Reps:</strong> {log.reps} | <strong>Vikt:</strong> {formatWeight(log.weight)}</p>
                <p><strong>Datum:</strong> {formatDateTime(log.date)}</p>
                <p><strong>Total volym:</strong> {log.sets * log.reps * log.weight} kg</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Progress;