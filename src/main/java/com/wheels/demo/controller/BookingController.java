package com.wheels.demo.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wheels.demo.model.Booking;
import com.wheels.demo.repository.BookingRepository;

@RestController
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    // ✅ POST: Save booking
    @PostMapping("/book")
    public ResponseEntity<Map<String, String>> book(@RequestBody Booking booking) {
        bookingRepo.save(booking);
        return ResponseEntity.ok(Collections.singletonMap("message", "Booking Confirmed"));
    }
}
