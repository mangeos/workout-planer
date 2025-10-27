package org.acme.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import org.acme.dto.WorkoutCreateDto;
import org.acme.dto.WorkoutDto;

import org.acme.service.WorkoutService;

//import io.quarkus.logging.Log;

@Path("/api/workout")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WorkoutResource {
    
    WorkoutService workoutService;
    
    @Inject
    public WorkoutResource(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GET
    public Response getAllWorkouts() {
        List<WorkoutDto> dto = workoutService.getAllWorkouts();
         if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @GET
    @Path("/{id}")
    public Response getWorkoutById(@PathParam("id") Long id) {
        WorkoutDto dto = workoutService.getWorkoutById(id);
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @POST
    public Response createWorkout(WorkoutCreateDto dtoCreate) {
        WorkoutDto created = workoutService.createWorkout(dtoCreate);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }
    // PUT för att uppdatera en befintlig övning
    /* 
    @PUT
    @Path("/{id}")
    public Response updateWorkout(@PathParam("id") Long id, WorkoutDto dto) {
        WorkoutDto updated = workoutService.updateWorkout(id, dto);
        if (updated == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteWorkout(@PathParam("id") Long id) {
        boolean deleted = workoutService.deleteWorkout(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build(); // 204 No Content
    }
*/
}
