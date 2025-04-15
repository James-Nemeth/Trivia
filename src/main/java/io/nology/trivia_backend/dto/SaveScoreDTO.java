package io.nology.trivia_backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class SaveScoreDTO {
    @NotBlank(message = "Username is required")
    private String username;

    @Min(value = 0, message = "Score must be a non-negative integer")
    private int score;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}