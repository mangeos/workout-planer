// Formatera datum och tid
export const formatDateTime = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleString('sv-SE');
};

// Formatera bara datum
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('sv-SE');
};

// Formatera vikt
export const formatWeight = (weight) => {
  return `${weight} kg`;
};

// Beräkna total volym
export const calculateVolume = (sets, reps, weight) => {
  return sets * reps * weight;
};