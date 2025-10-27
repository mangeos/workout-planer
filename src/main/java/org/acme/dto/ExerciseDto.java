package org.acme.dto;
import org.acme.models.Exercise;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDto {

    public ExerciseDto(Exercise e) {
        this.id = e.id;
        this.name = e.getName();
        this.description = e.getDescription();
        this.category = e.getCategory();
        this.muscleGroup = e.getMuscleGroup();
}

    private Long id;
    private String name;
    private String description;
    private String category;
    private String muscleGroup;
}
