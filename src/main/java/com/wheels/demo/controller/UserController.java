package com.wheels.demo.controller;

import com.wheels.demo.model.User;
import com.wheels.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository repo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        if (repo.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", "User already exists"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repo.save(user);
        return ResponseEntity.ok(Collections.singletonMap("message", "Registered Successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginData) {
        User user = repo.findByUsername(loginData.getUsername());
        if (user != null && passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Login Successful"));
        }
        return ResponseEntity.status(401)
                .body(Collections.singletonMap("message", "Invalid Credentials"));
    }
}
