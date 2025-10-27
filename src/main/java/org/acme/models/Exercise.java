package org.acme.models;
import jakarta.persistence.*;
import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)  // Inkludera PanacheEntity:s id
public class Exercise extends PanacheEntity {

    private String name;
    private String category;
    private String description;
    private String muscleGroup;

    @ManyToMany(mappedBy = "exercises") // pekar tillbaka till Workout
    private List<Workout> workouts;

  
}
