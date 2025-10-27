package org.acme.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseCreateDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String muscleGroup;
}
