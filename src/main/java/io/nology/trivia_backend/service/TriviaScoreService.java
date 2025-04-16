package io.nology.trivia_backend.service;

import io.nology.trivia_backend.model.TriviaScore;
import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.repository.TriviaScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TriviaScoreService {
    @Autowired
    public TriviaScoreRepository scoreRepository;

    public TriviaScore saveScore(TriviaUser user, int scoreValue) {
        TriviaScore score = new TriviaScore();
        score.setUser(user);
        score.setScore(scoreValue);
        score.setTimestamp(LocalDateTime.now());
        return scoreRepository.save(score);
    }

    public List<TriviaScore> getScoresByUser(TriviaUser user) {
        return scoreRepository.findByUser(user);
    }
}