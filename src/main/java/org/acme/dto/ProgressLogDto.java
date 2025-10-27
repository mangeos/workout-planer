package org.acme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

import org.acme.models.ProgressLog;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgressLogDto {
    private Long id;
    private UserDto user;
    private ExerciseDto exercise;
    private int reps;
    private int sets;
    private double weight;
    private LocalDateTime date;

     // Ny konstruktor som konverterar entity → DTO
    public ProgressLogDto(ProgressLog log) {
        this.id = log.id;
        this.date = log.getDate();
        this.sets = log.getSets();
        this.reps = log.getReps();
        this.weight = log.getWeight();

        // Skydda mot null
        if (log.getUser() != null) {
            this.user = new UserDto(log.getUser());
        }

        if (log.getExercise() != null) {
            this.exercise = new ExerciseDto(log.getExercise());
        }
    }
}
