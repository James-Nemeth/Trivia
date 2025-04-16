package io.nology.trivia_backend.user;

import io.nology.trivia_backend.model.TriviaUser;
import io.nology.trivia_backend.model.TriviaUser.TriviaRole;
import io.nology.trivia_backend.repository.TriviaUserRepository;
import io.nology.trivia_backend.service.TriviaUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class TriviaUserServiceTest {

    private TriviaUserService triviaUserService;

    @Mock
    private TriviaUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        triviaUserService = new TriviaUserService();
        triviaUserService.userRepository = userRepository;
        triviaUserService.passwordEncoder = passwordEncoder;
    }

    @Test
    void shouldRegisterUserSuccessfully() {
        TriviaUser user = new TriviaUser();
        user.setUsername("testuser");
        user.setRole(TriviaRole.PLAYER);

        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(TriviaUser.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TriviaUser result = triviaUserService.registerUser("testuser", "password123", TriviaRole.PLAYER);

        assertThat(result.getUsername()).isEqualTo("testuser");
        assertThat(result.getPassword()).isEqualTo("encodedPassword");
        assertThat(result.getRole()).isEqualTo(TriviaRole.PLAYER);

        verify(passwordEncoder, times(1)).encode("password123");
        verify(userRepository, times(1)).save(any(TriviaUser.class));
    }

    @Test
    void shouldFindUserByUsername() {
        TriviaUser user = new TriviaUser();
        user.setUsername("testuser");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        TriviaUser result = triviaUserService.findByUsername("testuser");

        assertThat(result).isEqualTo(user);

        verify(userRepository, times(1)).findByUsername("testuser");
    }

    @Test
    void shouldReturnNullIfUserNotFound() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        TriviaUser result = triviaUserService.findByUsername("testuser");

        assertThat(result).isNull();

        verify(userRepository, times(1)).findByUsername("testuser");
    }
}