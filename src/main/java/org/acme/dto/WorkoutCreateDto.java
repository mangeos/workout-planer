package org.acme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutCreateDto {
    private String name;
    private LocalDateTime scheduledAt;
    private UserDto user; // vem som äger passet
    private List<ExerciseDto> exercises;

}
