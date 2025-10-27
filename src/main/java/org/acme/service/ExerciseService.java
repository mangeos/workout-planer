package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import org.jboss.logging.Logger;
import java.util.List;
import java.util.stream.Collectors;

import org.acme.dto.ExerciseCreateDto;
import org.acme.dto.ExerciseDto;
import org.acme.models.Exercise;


@ApplicationScoped
public class ExerciseService {
 private static final Logger LOG = Logger.getLogger(ExerciseService.class);

    public List<ExerciseDto> getAllExercises() {
        List<Exercise> exercises = Exercise.listAll();
        return exercises
                .stream()
                .map(ExerciseDto::new)
                .collect(Collectors.toList());
    }

    public ExerciseDto getExerciseById(Long id) {
        Exercise exercise = Exercise.findById(id);
        if (exercise == null) {
            return null;
        }
        return new ExerciseDto(exercise); // ✅ skapar ett nytt DTO-objekt
    }

    @Transactional
    public ExerciseDto createExercise(ExerciseCreateDto dtoCreate) {
        LOG.info("==> POST mottagen: " + dtoCreate);
        Exercise exercise = new Exercise();
        exercise.setName(dtoCreate.getName());
        exercise.setDescription(dtoCreate.getDescription());
        exercise.setCategory(dtoCreate.getCategory());
        exercise.setMuscleGroup(dtoCreate.getMuscleGroup());
        System.out.println(dtoCreate.getMuscleGroup());
        exercise.persist();
        ExerciseDto dto = new ExerciseDto(exercise);
        return dto;
    }

    @Transactional
    public ExerciseDto updateExercise(Long id, ExerciseDto dto) {
        Exercise exercise = Exercise.findById(id);
        if (exercise == null) {
            return null;
        }
        exercise.setName(dto.getName());
        exercise.setDescription(dto.getDescription());
        exercise.setCategory(dto.getCategory());
        exercise.setMuscleGroup(dto.getMuscleGroup());
        // persist() behövs inte, PanacheEntity hanterar det
        return new ExerciseDto(exercise);
    }
 @  Transactional
    public boolean deleteExercise(Long id) {
        Exercise exercise = Exercise.findById(id);
        if (exercise == null) {
            return false; // finns inte
        }
        exercise.delete(); // tar bort posten från databasen
        return true;
    }
    
}
