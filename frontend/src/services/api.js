// Använd TOM bas-URL - proxy hanterar allt
const API_BASE = '';

export const workoutApi = {
  getWorkouts: async () => {
    try {
      const response = await fetch('/api/workout');
      if (!response.ok) throw new Error('Failed to fetch workouts');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  createWorkout: async (workoutData) => {
    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });
      if (!response.ok) throw new Error('Failed to create workout');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  getExercises: async () => {
    try {
      const response = await fetch('/api/exercises');
      if (!response.ok) throw new Error('Failed to fetch exercises');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  createExercise: async (exerciseData) => {
    try {
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseData),
      });
      if (!response.ok) throw new Error('Failed to create exercise');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  getProgressLogs: async () => {
    try {
      const response = await fetch('/api/progress-log');
      if (!response.ok) throw new Error('Failed to fetch progress logs');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  createProgressLog: async (logData) => {
    try {
      const response = await fetch('/api/progress-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });
      if (!response.ok) throw new Error('Failed to create progress log');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await fetch('/api/user');
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};