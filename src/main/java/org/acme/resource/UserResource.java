package org.acme.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import org.acme.service.UserService;

import io.quarkus.logging.Log;

import org.acme.dto.UserDto;

//import io.quarkus.logging.Log;

@Path("/api/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    
    UserService userService;
    
    @Inject
    public UserResource(UserService userService) {
        this.userService = userService;
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
/* 
    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id) {
        UserDto dto = userService.getUserById(id);
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }
*/
    @POST
    public Response createUser(UserDto dtoCreate) {
        UserDto created = userService.createUser(dtoCreate);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }
}