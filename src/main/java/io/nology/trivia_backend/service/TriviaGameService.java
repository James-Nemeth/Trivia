package io.nology.trivia_backend.service;

import io.nology.trivia_backend.model.TriviaGame;
import io.nology.trivia_backend.model.TriviaQuestionResult;
import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.repository.TriviaGameRepository;
import io.nology.trivia_backend.repository.TriviaQuestionResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TriviaGameService {
    @Autowired
    private TriviaGameRepository gameRepository;

    @Autowired
    private TriviaQuestionResultRepository questionResultRepository;

    public TriviaGame saveGame(TriviaUser user, int score, List<TriviaQuestionResult> questionResults) {
        TriviaGame game = new TriviaGame();
        game.setUser(user);
        game.setScore(score);
        game.setDatePlayed(LocalDateTime.now());
        game.setQuestionResults(questionResults);

        for (TriviaQuestionResult questionResult : questionResults) {
            boolean isCorrect = questionResult.getCorrectAnswer().trim()
                    .equalsIgnoreCase(questionResult.getSubmittedAnswer().trim());
            questionResult.setCorrect(isCorrect);

            questionResult.setArchived(false);

            questionResult.setGame(game);
        }

        return gameRepository.save(game);
    }

    public List<TriviaQuestionResult> getFailedQuestions() {
        return questionResultRepository.findByIsCorrectFalse();
    }

    public TriviaQuestionResult archiveQuestion(Long questionId) {
        TriviaQuestionResult questionResult = questionResultRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        questionResult.setArchived(true);
        return questionResultRepository.save(questionResult);
    }
}