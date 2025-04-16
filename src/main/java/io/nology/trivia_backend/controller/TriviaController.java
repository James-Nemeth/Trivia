package io.nology.trivia_backend.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.nology.trivia_backend.dto.CreateUserDTO;
import io.nology.trivia_backend.dto.SaveGameDTO;
import io.nology.trivia_backend.dto.SaveScoreDTO;
import io.nology.trivia_backend.model.TriviaGame;
import io.nology.trivia_backend.model.TriviaQuestionResult;
import io.nology.trivia_backend.model.TriviaScore;
import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.service.TriviaGameService;
import io.nology.trivia_backend.service.TriviaScoreService;
import io.nology.trivia_backend.service.TriviaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/trivia")
public class TriviaController {
    private static final SecretKey SECRET_KEY = Keys
            .hmacShaKeyFor("JamesAndJackieAreGettingMarriedSoonIn2025".getBytes());

    @Autowired
    private TriviaUserService userService;

    @Autowired
    private TriviaScoreService scoreService;

    @Autowired
    private TriviaGameService gameService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody CreateUserDTO createUserDTO) {
        if (userService.findByUsername(createUserDTO.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        userService.registerUser(
                createUserDTO.getUsername(),
                createUserDTO.getPassword(),
                createUserDTO.getRole());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CreateUserDTO loginDTO) {
        TriviaUser user = userService.findByUsername(loginDTO.getUsername());
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/scores")
    public ResponseEntity<?> saveScore(@RequestBody SaveScoreDTO saveScoreDTO) {
        TriviaUser user = userService.findByUsername(saveScoreDTO.getUsername());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        TriviaScore savedScore = scoreService.saveScore(user, saveScoreDTO.getScore());
        return ResponseEntity.ok(savedScore);
    }

    @GetMapping("/scores/{username}")
    public ResponseEntity<?> getUserScores(@PathVariable String username) {
        TriviaUser user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        List<TriviaScore> scores = scoreService.getScoresByUser(user);
        return ResponseEntity.ok(scores);
    }

    @PostMapping("/games")
    public ResponseEntity<?> saveGame(@RequestBody SaveGameDTO saveGameDTO) {
        TriviaUser user = userService.findByUsername(saveGameDTO.getUsername());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<TriviaQuestionResult> questionResults = saveGameDTO.getQuestionResults()
                .stream()
                .map(resultDTO -> {
                    TriviaQuestionResult result = new TriviaQuestionResult();
                    result.setQuestion(resultDTO.getQuestion());
                    result.setCorrectAnswer(resultDTO.getCorrectAnswer());
                    result.setSubmittedAnswer(resultDTO.getSubmittedAnswer());
                    return result;
                })
                .toList();

        TriviaGame game = gameService.saveGame(user, saveGameDTO.getScore(), questionResults);
        return ResponseEntity.ok(game);
    }

    @GetMapping("/questions/failed")
    public ResponseEntity<?> getFailedQuestions() {
        List<TriviaQuestionResult> failedQuestions = gameService.getFailedQuestions();
        return ResponseEntity.ok(failedQuestions);
    }

    @PutMapping("/questions/{id}/archive")
    public ResponseEntity<?> archiveQuestion(@PathVariable Long id) {
        try {
            TriviaQuestionResult archivedQuestion = gameService.archiveQuestion(id);
            return ResponseEntity.ok(archivedQuestion);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}