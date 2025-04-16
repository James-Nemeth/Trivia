package io.nology.trivia_backend.repository;

import io.nology.trivia_backend.model.TriviaQuestionResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TriviaQuestionResultRepository extends JpaRepository<TriviaQuestionResult, Long> {
    List<TriviaQuestionResult> findByIsCorrectFalse();
}