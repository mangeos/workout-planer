package org.acme.dto;

public class GooglePayloadDto {
    private String sub;
    private String email;
    private boolean emailVerified;
    private String name;

    // getters & setters
    public String getSub() { return sub; }
    public void setSub(String sub) { this.sub = sub; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}