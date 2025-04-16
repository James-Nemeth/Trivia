package io.nology.trivia_backend.game;

import io.nology.trivia_backend.model.TriviaGame;
import io.nology.trivia_backend.model.TriviaQuestionResult;
import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.repository.TriviaGameRepository;
import io.nology.trivia_backend.repository.TriviaQuestionResultRepository;
import io.nology.trivia_backend.service.TriviaGameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class TriviaGameServiceTest {

    private TriviaGameService triviaGameService;

    @Mock
    private TriviaGameRepository gameRepository;

    @Mock
    private TriviaQuestionResultRepository questionResultRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        triviaGameService = new TriviaGameService();
        triviaGameService.gameRepository = gameRepository;
        triviaGameService.questionResultRepository = questionResultRepository;
    }

    @Test
    void shouldSaveGameSuccessfully() {
        TriviaUser user = new TriviaUser();
        user.setUsername("testuser");

        TriviaQuestionResult question1 = new TriviaQuestionResult();
        question1.setCorrectAnswer("Answer1");
        question1.setSubmittedAnswer("Answer1");

        TriviaQuestionResult question2 = new TriviaQuestionResult();
        question2.setCorrectAnswer("Answer2");
        question2.setSubmittedAnswer("WrongAnswer");

        List<TriviaQuestionResult> questionResults = Arrays.asList(question1, question2);

        when(gameRepository.save(any(TriviaGame.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TriviaGame result = triviaGameService.saveGame(user, 10, questionResults);

        assertThat(result.getUser()).isEqualTo(user);
        assertThat(result.getScore()).isEqualTo(10);
        assertThat(result.getQuestionResults()).hasSize(2);
        assertThat(result.getQuestionResults().get(0).isCorrect()).isTrue();
        assertThat(result.getQuestionResults().get(1).isCorrect()).isFalse();

        verify(gameRepository, times(1)).save(any(TriviaGame.class));
    }

    @Test
    void shouldGetFailedQuestions() {
        TriviaQuestionResult question1 = new TriviaQuestionResult();
        question1.setCorrect(false);

        when(questionResultRepository.findByIsCorrectFalse()).thenReturn(Collections.singletonList(question1));

        List<TriviaQuestionResult> result = triviaGameService.getFailedQuestions();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).isCorrect()).isFalse();

        verify(questionResultRepository, times(1)).findByIsCorrectFalse();
    }

    @Test
    void shouldArchiveQuestionSuccessfully() {
        TriviaQuestionResult questionResult = new TriviaQuestionResult();
        questionResult.setId(1L);
        questionResult.setArchived(false);

        when(questionResultRepository.findById(1L)).thenReturn(Optional.of(questionResult));
        when(questionResultRepository.save(any(TriviaQuestionResult.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        TriviaQuestionResult result = triviaGameService.archiveQuestion(1L);

        assertThat(result.isArchived()).isTrue();

        verify(questionResultRepository, times(1)).findById(1L);
        verify(questionResultRepository, times(1)).save(questionResult);
    }

    @Test
    void shouldThrowExceptionWhenArchivingNonExistentQuestion() {
        when(questionResultRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> triviaGameService.archiveQuestion(1L));

        verify(questionResultRepository, times(1)).findById(1L);
        verify(questionResultRepository, never()).save(any(TriviaQuestionResult.class));
    }
}