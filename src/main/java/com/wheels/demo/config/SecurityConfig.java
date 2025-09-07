package com.wheels.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Allow frontend static resources
                .requestMatchers(
                    "/", 
                    "/index.html", 
                    "/signin.html", 
                    "/booking.html", 
                    "/contact.html", 
                    "/aboutus.html", 
                    "/**/*.css", 
                    "/**/*.js", 
                    "/**/*.png", 
                    "/**/*.jpg", 
                    "/**/*.jpeg", 
                    "/**/*.gif"
                ).permitAll()

                // Allow backend endpoints
                .requestMatchers("/register", "/login", "/book", "/bookings", "/contact").permitAll()

                // Everything else will still require auth (if you add later)
                .anyRequest().permitAll()
            );

        return http.build();
    }
}
