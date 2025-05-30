package io.nology.trivia_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/trivia/signup", "/trivia/login").permitAll()
                        .requestMatchers("/trivia/scores").permitAll()
                        .requestMatchers("/trivia/scores/**").permitAll()
                        .requestMatchers("/trivia/games").permitAll()
                        .requestMatchers("/trivia/questions/failed").permitAll()
                        .requestMatchers("/trivia/questions/{id}/archive").permitAll()
                        .anyRequest().authenticated())
                .httpBasic(withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}