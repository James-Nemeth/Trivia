package io.nology.trivia_backend.dto;

import io.nology.trivia_backend.model.TriviaUser.TriviaRole;

public class CreateUserDTO {
    private String username;
    private String password;
    private TriviaRole role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TriviaRole getRole() {
        return role;
    }

    public void setRole(TriviaRole role) {
        this.role = role;
    }
}