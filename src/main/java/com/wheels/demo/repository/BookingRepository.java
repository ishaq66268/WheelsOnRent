package com.wheels.demo.repository;

import com.wheels.demo.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<Booking, String> {
    // You can also add custom query methods later if needed
    
}
