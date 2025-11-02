package org.acme.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

import org.acme.service.UserService;
import org.acme.service.GoogleAuthService;

import io.quarkus.logging.Log;

import org.acme.dto.UserDto;

@Path("/api/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    
    UserService userService;
    GoogleAuthService googleAuthService;
    
    @Inject
    public UserResource(UserService userService, GoogleAuthService googleAuthService) {
        this.userService = userService;
        this.googleAuthService = googleAuthService;
    }

    @GET
    public Response getAllUsers() {
        Log.info("111111111111111111111111");
        List<UserDto> dto = userService.getAllUsers();
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @POST
    public Response createUser(UserDto dtoCreate) {
        UserDto created = userService.createUser(dtoCreate);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @POST
    @Path("/login/google")
    public Response loginWithGoogle(Map<String, String> body) {
        String idToken = body == null ? null : body.get("idToken");
        if (idToken == null || idToken.isBlank()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("idToken missing").build();
        }
        try {
            var payload = googleAuthService.verifyIdToken(idToken);
            if (payload == null) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token").build();
            }
            // create or update user based on payload (implement in UserService)
            UserDto user = userService.createOrUpdateFromGoogle(payload);
            return Response.ok(user).build();
        } catch (Exception e) {
            Log.error("Google login failed", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}