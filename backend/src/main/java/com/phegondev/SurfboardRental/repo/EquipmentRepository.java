package com.phegondev.SurfboardRental.repo;

import com.phegondev.SurfboardRental.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    @Query("SELECT DISTINCT r.category FROM Equipment r")
    List<String> findDistinctCategories();


    @Query("SELECT r FROM Equipment r WHERE r.category LIKE %:category% AND r.id NOT IN (SELECT bk.equipment.id FROM Rental bk WHERE" +
            "(bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
    List<Equipment> findAvailableEquipmentsByDatesAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String category);


    @Query("SELECT r FROM Equipment r WHERE r.id NOT IN (SELECT b.equipment.id FROM Rental b)")
    List<Equipment> getAllAvailableEquipments();
}
