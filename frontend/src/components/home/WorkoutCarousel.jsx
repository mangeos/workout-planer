import React from 'react';
import Slider from 'react-slick';
import { formatDateTime } from '../../utils/helpers';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const WorkoutCarousel = ({ workouts }) => {
  // Carousel inställningar
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (!workouts || workouts.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        margin: '2rem 0'
      }}>
        <p>Inga workouts tillgängliga</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2c3e50' }}>
        Dina Senaste Workouts
      </h3>
      
      <Slider {...settings}>
        {workouts.map(workout => (
          <div key={workout.id} style={{ padding: '0 10px' }}>
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '1.5rem',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#2c3e50',
                  fontSize: '1.2rem'
                }}>
                  {workout.name}
                </h4>
                <p style={{ 
                  margin: '0.25rem 0', 
                  color: '#7f8c8d',
                  fontSize: '0.9rem'
                }}>
                  🗓️ {formatDateTime(workout.scheduledAt)}
                </p>
                <p style={{ 
                  margin: '0.25rem 0', 
                  color: '#7f8c8d',
                  fontSize: '0.9rem'
                }}>
                  👤 {workout.user?.username || 'Användare saknas'}
                </p>
              </div>
              
              <div>
                {workout.exercises && workout.exercises.length > 0 ? (
                  <div>
                    <p style={{ 
                      margin: '0.5rem 0 0.25rem 0', 
                      fontWeight: 'bold',
                      color: '#34495e',
                      fontSize: '0.9rem'
                    }}>
                      Övningar ({workout.exercises.length}):
                    </p>
                    <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>
                      {workout.exercises.slice(0, 3).map(exercise => (
                        <div key={exercise.id}>• {exercise.name}</div>
                      ))}
                      {workout.exercises.length > 3 && (
                        <div>+ {workout.exercises.length - 3} fler</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p style={{ 
                    color: '#bdc3c7', 
                    fontStyle: 'italic',
                    fontSize: '0.9rem'
                  }}>
                    Inga övningar
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WorkoutCarousel;