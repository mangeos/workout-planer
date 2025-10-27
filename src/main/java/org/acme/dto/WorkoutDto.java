package org.acme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


import org.acme.models.Workout;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDto {

      public WorkoutDto(Workout e) {
        this.id = e.id;
        this.name = e.getName();
        this.scheduledAt = e.getScheduledAt();
        this.user = new UserDto(e.getUser());
        if (e.getExercises() != null) {
                this.exercises = e.getExercises()
                                    .stream()
                                    .map(ExerciseDto::new)
                                    .collect(Collectors.toList());
            }
      
}

    private Long id;
    private String name;
    private LocalDateTime scheduledAt;
    private UserDto user; // vem som äger passet
    private List<ExerciseDto> exercises;
}
