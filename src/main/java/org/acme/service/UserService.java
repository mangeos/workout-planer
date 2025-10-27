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
        LOG.info("1");
        List<UserEntity> users = UserEntity.listAll();
        LOG.info("2");
        return users
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }


    @Transactional
    public UserDto createUser(UserDto dtoCreate) {
        LOG.info("==> POST mottagen: " + dtoCreate);
        UserEntity user = new UserEntity();
        user.setPassword(dtoCreate.getUsername());
        user.setUsername(dtoCreate.getUsername());
        user.persist();
        UserDto dto = new UserDto(user);
        return dto;
    }
}