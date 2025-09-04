package com.wheels.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wheels.demo.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
