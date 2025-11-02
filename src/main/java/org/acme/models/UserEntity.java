package org.acme.models;

import jakarta.persistence.*;
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
@Table(name = "users")
public class UserEntity extends PanacheEntity {

   // använd e-post som användarnamn (unik)
    @Column(unique = true, nullable = false)
    private String username;

    // Googles "sub" för att länka kontot (unik)
    @Column(unique = true, nullable = false)
    private String googleSub;

    // måste vara nullable — Google-only konton har inget lokalt lösenord
    @Column(nullable = true)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Workout> workouts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ProgressLog> progressLogs;

     // 👇 LÄGG TILL: Ytterligare fält från Google
    private String name;
    private String email;
    
    // 👇 LÄGG TILL: Statisk metod för att hitta användare via googleSub
    public static UserEntity findByGoogleSub(String googleSub) {
        return find("googleSub", googleSub).firstResult();
    }
    
    // 👇 LÄGG TILL: Statisk metod för att hitta användare via email
    public static UserEntity findByEmail(String email) {
        return find("email", email).firstResult();
    }
}
