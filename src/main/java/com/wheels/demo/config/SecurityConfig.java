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
                // Allow frontend HTML pages
                .requestMatchers(
                    "/", 
                    "/index.html", 
                    "/signin.html", 
                    "/booking.html", 
                    "/contact.html", 
                    "/aboutus.html"
                ).permitAll()

                // Allow static resources (CSS, JS, images, etc.)
                .requestMatchers(
                    "/static/**", 
                    "/images/**", 
                    "/css/**", 
                    "/js/**"
                ).permitAll()

                // Allow backend APIs
                .requestMatchers(
                    "/register", 
                    "/login", 
                    "/book", 
                    "/bookings", 
                    "/contact"
                ).permitAll()

                // Everything else
                .anyRequest().permitAll()
            );

        return http.build();
    }
}
