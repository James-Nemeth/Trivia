package io.nology.trivia_backend.repository;

import io.nology.trivia_backend.model.TriviaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TriviaUserRepository extends JpaRepository<TriviaUser, Long> {
    Optional<TriviaUser> findByUsername(String username);
}