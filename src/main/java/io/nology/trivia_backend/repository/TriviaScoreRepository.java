package io.nology.trivia_backend.repository;

import io.nology.trivia_backend.model.TriviaScore;
import io.nology.trivia_backend.model.TriviaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TriviaScoreRepository extends JpaRepository<TriviaScore, Long> {
    List<TriviaScore> findByUser(TriviaUser user);
}