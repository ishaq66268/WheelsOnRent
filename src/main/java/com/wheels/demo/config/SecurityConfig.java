package com.wheels.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())                // disable CSRF
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/register", "/login").permitAll() // allow public endpoints
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());      // optional: enable basic auth for testing
        return http.build();
    }
}
