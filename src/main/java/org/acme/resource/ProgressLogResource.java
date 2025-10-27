package org.acme.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import org.acme.dto.ProgressLogDto;
import org.acme.service.ProgressLogService;

//import io.quarkus.logging.Log;

@Path("/api/progress-log")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProgressLogResource {
    
    ProgressLogService progressLogService;
    
    @Inject
    public ProgressLogResource(ProgressLogService progressLogService) {
        this.progressLogService = progressLogService;
    }

    @GET
    public Response getAllProgressLogs() {
        List<ProgressLogDto> dto = progressLogService.getAllProgressLogs();
         if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @GET
    @Path("/{id}")
    public Response getProgressLogById(@PathParam("id") Long id) {
        ProgressLogDto dto = progressLogService.getProgressLogById(id);
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @POST
    public Response createProgressLog(ProgressLogDto dtoCreate) {
        ProgressLogDto created = progressLogService.createProgressLog(dtoCreate);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }
    // PUT för att uppdatera en befintlig övning
    @PUT
    @Path("/{id}")
    public Response updateProgressLog(@PathParam("id") Long id, ProgressLogDto dto) {
        ProgressLogDto updated = progressLogService.updateProgressLog(id, dto);
        if (updated == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteProgressLog(@PathParam("id") Long id) {
        boolean deleted = progressLogService.deleteProgressLog(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build(); // 204 No Content
    }

}
