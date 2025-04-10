package io.nology.trivia_backend.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class TriviaUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TriviaRole role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TriviaScore> scores;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public enum TriviaRole {
        PLAYER,
        ADMIN
    }

    public TriviaRole getRole() {
        return role;
    }

    public void setRole(TriviaRole role) {
        this.role = role;
    }

    public List<TriviaScore> getScores() {
        return scores;
    }

    public void setScores(List<TriviaScore> scores) {
        this.scores = scores;
    }

    @Override
    public String toString() {
        return "TriviaUser [username=" + username + ", password=" + password + ", scores=" + scores + "]";
    }

}