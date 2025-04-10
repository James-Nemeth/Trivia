package io.nology.trivia_backend.service;

import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.model.TriviaUser.TriviaRole;
import io.nology.trivia_backend.repository.TriviaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TriviaUserService {
    @Autowired
    private TriviaUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public TriviaUser registerUser(String username, String password, TriviaRole role) {
        TriviaUser user = new TriviaUser();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }

    public TriviaUser findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}