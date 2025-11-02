package org.acme.dto;

import org.acme.models.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    public UserDto(UserEntity e){
        this.id = e.id;
        this.username = e.getUsername();
        this.email = e.getEmail(); // 👈 LÄGG TILL
        this.name = e.getName();   // 👈 LÄGG TILL
        this.googleSub = e.getGoogleSub(); // 👈 LÄGG TILL
    }
    
    private Long id;
    private String username;
    private String email;      // 👈 LÄGG TILL
    private String name;       // 👈 LÄGG TILL  
    private String googleSub;  // 👈 LÄGG TILL
}