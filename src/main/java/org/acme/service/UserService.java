package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.acme.dto.UserDto;
import org.acme.models.UserEntity;
import org.jboss.logging.Logger;

@ApplicationScoped
public class UserService {
    private static final Logger LOG = Logger.getLogger(UserService.class);

    public List<UserDto> getAllUsers() {
        List<UserEntity> users = UserEntity.listAll();
        return users.stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDto createUser(UserDto dtoCreate) {
        LOG.info("==> POST mottagen: " + dtoCreate);
        UserEntity user = new UserEntity();
        // Password is not available on UserDto (for security); set password via the proper registration flow instead
        user.setUsername(dtoCreate.getUsername());
        user.persist();
        return new UserDto(user);
    }

    @Transactional
    public UserDto createOrUpdateFromGoogle(org.acme.dto.GooglePayloadDto payload) {
        // 👇 FÖRBÄTTRAD: Försök hitta via googleSub FÖRST, sedan email
        UserEntity user = UserEntity.findByGoogleSub(payload.getSub());
        
        if (user == null) {
            // Kolla om det finns en användare med samma email (för backwards compatibility)
            user = UserEntity.findByEmail(payload.getEmail());
            
            if (user != null) {
                // Uppdatera befintlig användare med googleSub
                user.setGoogleSub(payload.getSub());
                user.setName(payload.getName());
                LOG.info("Updated existing user with Google Sub: " + user.getUsername());
            } else {
                // Skapa helt ny användare
                user = new UserEntity();
                user.setGoogleSub(payload.getSub());
                user.setUsername(payload.getEmail()); // Använd email som username
                user.setEmail(payload.getEmail());
                user.setName(payload.getName());
                user.persist();
                LOG.info("Created new user from Google: " + user.getUsername());
            }
        } else {
            // Uppdatera användarinformation om något ändrats
            user.setEmail(payload.getEmail());
            user.setName(payload.getName());
            LOG.info("Found existing Google user: " + user.getUsername());
        }
        
        return new UserDto(user);
    }
    
    // 👇 LÄGG TILL: Hämta användare via googleSub
    public UserDto getUserByGoogleSub(String googleSub) {
        UserEntity user = UserEntity.findByGoogleSub(googleSub);
        if (user == null) {
            return null;
        }
        return new UserDto(user);
    }
    
    // 👇 LÄGG TILL: Hämta användare via ID
    public UserDto getUserById(Long id) {
        UserEntity user = UserEntity.findById(id);
        if (user == null) {
            return null;
        }
        return new UserDto(user);
    }
}