package io.nology.trivia_backend.repository;

import io.nology.trivia_backend.model.TriviaGame;
import io.nology.trivia_backend.model.TriviaUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TriviaGameRepository extends JpaRepository<TriviaGame, Long> {
    List<TriviaGame> findByUser(TriviaUser user);
}