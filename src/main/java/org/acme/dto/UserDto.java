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
    }
    private Long id;
    private String username;
}