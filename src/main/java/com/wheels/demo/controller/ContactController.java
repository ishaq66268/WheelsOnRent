package com.wheels.demo.controller;

import com.wheels.demo.model.Contact;
import com.wheels.demo.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepo;

    // Save contact message
    @PostMapping("/contact")
    public ResponseEntity<String> submitContact(@RequestBody Contact contact) {
        contactRepo.save(contact);
        return ResponseEntity.ok("Message received. Thank you!");
    }
}
