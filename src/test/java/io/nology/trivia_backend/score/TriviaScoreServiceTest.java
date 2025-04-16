package io.nology.trivia_backend.score;

import io.nology.trivia_backend.model.TriviaScore;
import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.repository.TriviaScoreRepository;
import io.nology.trivia_backend.service.TriviaScoreService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class TriviaScoreServiceTest {

    private TriviaScoreService triviaScoreService;

    @Mock
    private TriviaScoreRepository scoreRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        triviaScoreService = new TriviaScoreService();
        triviaScoreService.scoreRepository = scoreRepository;
    }

    @Test
    void shouldSaveScoreSuccessfully() {
        TriviaUser user = new TriviaUser();
        user.setUsername("testuser");

        TriviaScore score = new TriviaScore();
        score.setUser(user);
        score.setScore(50);

        when(scoreRepository.save(any(TriviaScore.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TriviaScore result = triviaScoreService.saveScore(user, 50);

        assertThat(result.getUser()).isEqualTo(user);
        assertThat(result.getScore()).isEqualTo(50);

        verify(scoreRepository, times(1)).save(any(TriviaScore.class));
    }

    @Test
    void shouldGetScoresByUser() {
        TriviaUser user = new TriviaUser();
        user.setUsername("testuser");

        TriviaScore score = new TriviaScore();
        score.setUser(user);
        score.setScore(50);

        when(scoreRepository.findByUser(user)).thenReturn(Collections.singletonList(score));

        List<TriviaScore> result = triviaScoreService.getScoresByUser(user);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getUser()).isEqualTo(user);
        assertThat(result.get(0).getScore()).isEqualTo(50);

        verify(scoreRepository, times(1)).findByUser(user);
    }
}