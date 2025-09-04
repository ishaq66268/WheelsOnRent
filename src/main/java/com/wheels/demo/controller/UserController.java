package com.wheels.demo.controller;

import com.wheels.demo.model.User;
import com.wheels.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class UserController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        repo.save(user);
        return ResponseEntity.ok("Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginData) {
        User user = repo.findByUsername(loginData.getUsername());
        if (user != null && user.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok("Login Successful");
        }
        return ResponseEntity.status(401).body("Invalid Credentials");
    }
}
