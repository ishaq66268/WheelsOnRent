package com.wheels.demo.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wheels.demo.model.Booking;
import com.wheels.demo.repository.BookingRepository;

@RestController
public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    @PostMapping("/book")
    public ResponseEntity<String> book(@RequestParam String username,
                                       @RequestParam String vehicleType,
                                       @RequestParam String vehicleName,
                                       @RequestParam String startDate,
                                       @RequestParam String endDate) {
        Booking booking = new Booking();
        booking.setUsername(username);
        booking.setVehicleType(vehicleType);
        booking.setVehicleName(vehicleName);   // ✅ fixed
        booking.setStartDate(LocalDate.parse(startDate));
        booking.setEndDate(LocalDate.parse(endDate));
        bookingRepo.save(booking);
        return ResponseEntity.ok("Booking Confirmed");
    }
}
