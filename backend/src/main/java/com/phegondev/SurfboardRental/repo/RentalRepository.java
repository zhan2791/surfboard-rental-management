package com.phegondev.SurfboardRental.repo;

import com.phegondev.SurfboardRental.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    Optional<Rental> findByRentalConfirmationCode(String confirmationCode);
}
