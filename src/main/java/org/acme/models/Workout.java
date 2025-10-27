package org.acme.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)  // Inkludera PanacheEntity:s id
@Table(name = "workouts")
public class Workout extends PanacheEntity {

    private String name;

    private LocalDateTime scheduledAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToMany
    @JoinTable(
        name = "workout_exercise", // namnet på join-tabellen
        joinColumns = @JoinColumn(name = "workout_id"), // kolumn som refererar till Workout
        inverseJoinColumns = @JoinColumn(name = "exercise_id") // kolumn som refererar till Exercise
    )
    private List<Exercise> exercises;

    // Getters och setters
}
