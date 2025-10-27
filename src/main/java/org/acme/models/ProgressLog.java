package org.acme.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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
@Table(name = "progress_logs")
public class ProgressLog extends PanacheEntity {

    private LocalDateTime date;

    private int sets;
    private int reps;
    private double weight;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    // Getters och setters
}
