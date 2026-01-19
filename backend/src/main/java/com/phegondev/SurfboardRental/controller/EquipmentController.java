package com.phegondev.SurfboardRental.controller;


import com.phegondev.SurfboardRental.dto.Response;
import com.phegondev.SurfboardRental.service.interfac.IRentalService;
import com.phegondev.SurfboardRental.service.interfac.IEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/equipments")
public class EquipmentController {

    @Autowired
    private IEquipmentService equipmentService;
    @Autowired
    private IRentalService iRentalService;


    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewEquipment(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "dailyRate", required = false) BigDecimal dailyRate,
            @RequestParam(value = "description", required = false) String description
    ) {

        if (photo == null || photo.isEmpty() || category == null || category.isBlank() || dailyRate == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields(photo, category,dailyRate)");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = equipmentService.addNewEquipment(photo, category, dailyRate, description);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllEquipments() {
        Response response = equipmentService.getAllEquipments();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return equipmentService.getAllCategories();
    }

    @GetMapping("/equipment-by-id/{equipmentId}")
    public ResponseEntity<Response> getEquipmentById(@PathVariable Long equipmentId) {
        Response response = equipmentService.getEquipmentById(equipmentId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-available-equipments")
    public ResponseEntity<Response> getAvailableEquipments() {
        Response response = equipmentService.getAllAvailableEquipments();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available-equipments-by-date-and-type")
    public ResponseEntity<Response> getAvailableEquipmentsByDateAndType(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String category
    ) {
        if (checkInDate == null || category == null || category.isBlank() || checkOutDate == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields(checkInDate, category,checkOutDate)");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = equipmentService.getAvailableEquipmentsByDataAndType(checkInDate, checkOutDate, category);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{equipmentId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateEquipment(@PathVariable Long equipmentId,
                                               @RequestParam(value = "photo", required = false) MultipartFile photo,
                                               @RequestParam(value = "category", required = false) String category,
                                               @RequestParam(value = "dailyRate", required = false) BigDecimal dailyRate,
                                               @RequestParam(value = "description", required = false) String description

    ) {
        Response response = equipmentService.updateEquipment(equipmentId, description, category, dailyRate, photo);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{equipmentId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteEquipment(@PathVariable Long equipmentId) {
        Response response = equipmentService.deleteEquipment(equipmentId);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }


}
