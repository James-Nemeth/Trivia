package io.nology.trivia_backend.controller;

import io.nology.trivia_backend.dto.CreateUserDTO;
import io.nology.trivia_backend.dto.SaveScoreDTO;
import io.nology.trivia_backend.model.TriviaScore;
import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.service.TriviaScoreService;
import io.nology.trivia_backend.service.TriviaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trivia")
public class TriviaController {
    @Autowired
    private TriviaUserService userService;

    @Autowired
    private TriviaScoreService scoreService;

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
}