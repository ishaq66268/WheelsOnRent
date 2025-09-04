package com.wheels.demo.controller;

import com.wheels.demo.model.Contact;
import com.wheels.demo.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ContactController {

    @Autowired
    private ContactRepository contactRepo;

    @PostMapping("/contact")
    public ResponseEntity<String> submitContact(@RequestParam String name,
                                                @RequestParam String email,
                                                @RequestParam String message) {
        Contact contact = new Contact();
        contact.setName(name);
        contact.setEmail(email);
        contact.setMessage(message);
        contactRepo.save(contact);
        return ResponseEntity.ok("Message received. Thank you!");
    }
}
