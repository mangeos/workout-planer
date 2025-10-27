package org.acme.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import org.acme.dto.ExerciseCreateDto;
import org.acme.dto.ExerciseDto;
import org.acme.service.ExerciseService;

//import io.quarkus.logging.Log;

@Path("/api/exercises")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExerciseResource {
    
    ExerciseService exerciseService;
    
    @Inject
    public ExerciseResource(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

      @GET
    public Response getAllExercises() {
        List<ExerciseDto> dto = exerciseService.getAllExercises();
         if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @GET
    @Path("/{id}")
    public Response getExerciseById(@PathParam("id") Long id) {
        ExerciseDto dto = exerciseService.getExerciseById(id);
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @POST
    public Response createExercise(ExerciseCreateDto dtoCreate) {
        ExerciseDto created = exerciseService.createExercise(dtoCreate);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }
    // PUT för att uppdatera en befintlig övning
    @PUT
    @Path("/{id}")
    public Response updateExercise(@PathParam("id") Long id, ExerciseDto dto) {
        ExerciseDto updated = exerciseService.updateExercise(id, dto);
        if (updated == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteExercise(@PathParam("id") Long id) {
        boolean deleted = exerciseService.deleteExercise(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build(); // 204 No Content
    }

}
