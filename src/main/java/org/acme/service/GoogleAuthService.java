package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.http.*;
import java.net.URI;
import java.time.Instant;
import java.util.Map;

import org.acme.dto.GooglePayloadDto;
import org.jboss.logging.Logger;

@ApplicationScoped
public class GoogleAuthService {
    private static final Logger LOG = Logger.getLogger(GoogleAuthService.class);

    private final HttpClient http = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    @Inject
    @ConfigProperty(name = "google.client-id")
    String googleClientId;

    // 👇 LÄGG TILL: En metod för att kontrollera konfiguration
    public String getGoogleClientId() {
        return googleClientId;
    }
    
    public boolean isConfigured() {
        return googleClientId != null && !googleClientId.isEmpty();
    }

    public GooglePayloadDto verifyIdToken(String idToken) throws Exception {
        LOG.info("Verifying Google ID token, client ID: " + 
                (googleClientId != null ? googleClientId.substring(0, 10) + "..." : "NULL"));
        
        HttpRequest req = HttpRequest.newBuilder()
            .uri(URI.create("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken))
            .GET()
            .build();

        HttpResponse<String> resp = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (resp.statusCode() != 200) {
            LOG.warn("Google token verification failed with status: " + resp.statusCode());
            return null;
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> data = mapper.readValue(resp.body(), Map.class);

        // Kontrollera audience
        Object aud = data.get("aud");
        if (aud == null || !googleClientId.equals(String.valueOf(aud))) {
            LOG.warn("Audience mismatch. Expected: " + googleClientId + ", Got: " + aud);
            return null;
        }

        // Kontrollera expiration
        Object expObj = data.get("exp");
        long exp = expObj == null ? 0L : Long.parseLong(String.valueOf(expObj));
        if (Instant.now().getEpochSecond() > exp) {
            LOG.warn("Token has expired");
            return null;
        }

        GooglePayloadDto p = new GooglePayloadDto();
        p.setSub(String.valueOf(data.get("sub")));
        p.setEmail(String.valueOf(data.get("email")));
        p.setEmailVerified(Boolean.parseBoolean(String.valueOf(data.getOrDefault("email_verified", "false"))));
        p.setName(String.valueOf(data.getOrDefault("name", "")));
        
        LOG.info("Successfully verified Google token for: " + p.getEmail());
        return p;
    }
}