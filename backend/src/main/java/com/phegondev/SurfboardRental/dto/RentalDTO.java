package com.phegondev.SurfboardRental.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RentalDTO {

    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private String rentalConfirmationCode;
    private Integer quantity;
    private UserDTO user;
    private EquipmentDTO equipment;
}
