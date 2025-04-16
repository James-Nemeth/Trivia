package io.nology.trivia_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class TriviaGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private TriviaUser user;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TriviaQuestionResult> questionResults;

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    private LocalDateTime datePlayed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TriviaUser getUser() {
        return user;
    }

    public void setUser(TriviaUser user) {
        this.user = user;
    }

    public List<TriviaQuestionResult> getQuestionResults() {
        return questionResults;
    }

    public void setQuestionResults(List<TriviaQuestionResult> questionResults) {
        this.questionResults = questionResults;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDateTime getDatePlayed() {
        return datePlayed;
    }

    public void setDatePlayed(LocalDateTime datePlayed) {
        this.datePlayed = datePlayed;
    }
}