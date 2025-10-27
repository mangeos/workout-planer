package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import org.jboss.logging.Logger;
import java.util.List;
import java.util.stream.Collectors;

import org.acme.dto.WorkoutCreateDto;
import org.acme.dto.WorkoutDto;
import org.acme.models.Exercise;
import org.acme.models.UserEntity;
import org.acme.models.Workout;


@ApplicationScoped
public class WorkoutService {
 private static final Logger LOG = Logger.getLogger(WorkoutService.class);

    public List<WorkoutDto> getAllWorkouts() {
        List<Workout> Workouts = Workout.listAll();
        return Workouts
                .stream()
                .map(WorkoutDto::new)
                .collect(Collectors.toList());
    }

public WorkoutDto getWorkoutById(Long id) {
    Workout workoutEntity = Workout.findById(id); // variabelnamnet ändrat
    if (workoutEntity == null) {
        return null;
    }
    return new WorkoutDto(workoutEntity);
}

    @Transactional
    public WorkoutDto createWorkout(WorkoutCreateDto dtoCreate) {
        LOG.info("==> POST mottagen: " + dtoCreate);
        Workout WorkoutEntity = new Workout();
        WorkoutEntity.setName(dtoCreate.getName());
        WorkoutEntity.setScheduledAt(dtoCreate.getScheduledAt());
       // hämta exercises med id från dto som användaren har skickat med
        List<Exercise> exerciseEntity = dtoCreate.getExercises().stream().map(d -> {
                  Exercise e = Exercise.findById(d.getId()); // hämta från DB
                  return e;
              })
              .collect(Collectors.toList());

        WorkoutEntity.setExercises(exerciseEntity);
        //Hämta user med id
        if (dtoCreate.getUser() != null) {
            UserEntity user = UserEntity.findById(dtoCreate.getUser().getId());
            WorkoutEntity.setUser(user);
        }


        WorkoutEntity.persist();
        WorkoutDto dto = new WorkoutDto(WorkoutEntity);
        return dto;
    }
/* 
 * 

@Transactional
public WorkoutDto updateWorkout(Long id, WorkoutDto dto) {
    Workout w = w.findById(id);
    if (w == null) {
        return null;
    }
    w.setName(dto.getName());
    w.setDescription(dto.getDescription());
    w.setCategory(dto.getCategory());
    w.setMuscleGroup(dto.getMuscleGroup());
    // persist() behövs inte, PanacheEntity hanterar det
    return new WorkoutDto(Workout);
}
 @Transactional
    public boolean deleteWorkout(Long id) {
        Workout w = w.findById(id);
        if (w == null) {
            return false; // finns inte
        }
        w.delete(); // tar bort posten från databasen
        return true;
    }
*/    
}
