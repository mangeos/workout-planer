package org.acme.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.dto.GooglePayloadDto;
import org.acme.dto.UserDto;
import org.acme.service.GoogleAuthService;
import org.acme.service.UserService;
import org.jboss.logging.Logger;

import java.util.HashMap;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {
    private static final Logger LOG = Logger.getLogger(AuthResource.class);

    @Inject
    GoogleAuthService googleAuthService;

    @Inject
    UserService userService;

    @POST
    @Path("/google")
    public Response googleLogin(GoogleLoginRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            LOG.info("Google login attempt received");
            
            if (request.getIdToken() == null || request.getIdToken().trim().isEmpty()) {
                response.put("error", "ID token is required");
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(response)
                    .build();
            }
            
            if (!googleAuthService.isConfigured()) {
                response.put("error", "Google OAuth not configured");
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(response)
                    .build();
            }
            
            // Verifiera Google token
            GooglePayloadDto payload = googleAuthService.verifyIdToken(request.getIdToken());
            if (payload == null) {
                response.put("error", "Invalid Google token - verification failed");
                return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(response)
                    .build();
            }
            
            // Skapa eller hämta användare
            UserDto user = userService.createOrUpdateFromGoogle(payload);
            
            // Skapa ett enkelt token
            String token = "google-auth-" + System.currentTimeMillis();
            
            // Skapa användarinfo
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", user.getId());
            userInfo.put("username", user.getUsername());
            userInfo.put("email", user.getEmail() != null ? user.getEmail() : "");
            userInfo.put("name", user.getName() != null ? user.getName() : "");
            userInfo.put("googleSub", user.getGoogleSub() != null ? user.getGoogleSub() : "");
            
            response.put("token", token);
            response.put("user", userInfo);
            response.put("success", true);
            
            LOG.info("Google login successful for user: " + user.getUsername());
            
            return Response.ok(response).build();
            
        } catch (Exception e) {
            LOG.error("Google login failed", e);
            response.put("error", "Login failed: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(response)
                .build();
        }
    }

    // Test endpoint för att verifiera backend fungerar
    @GET
    @Path("/test-json")
    public Map<String, Object> testJson() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Backend is returning proper JSON");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }

    @POST
    @Path("/google-test")
    public Map<String, Object> googleTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "This is a test response");
        response.put("token", "test-token-123");
        
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", 1L);
        userInfo.put("username", "test@example.com");
        userInfo.put("name", "Test User");
        userInfo.put("email", "test@example.com");
        userInfo.put("googleSub", "test-google-sub-123");
        
        response.put("user", userInfo);
        return response;
    }

    public static class GoogleLoginRequest {
        private String idToken;
        
        public String getIdToken() { return idToken; }
        public void setIdToken(String idToken) { this.idToken = idToken; }
    }
}