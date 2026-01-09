package com.phegondev.SurfboardRental.service.interfac;

import com.phegondev.SurfboardRental.dto.Response;
import com.phegondev.SurfboardRental.entity.Rental;

public interface IRentalService {

    Response saveRental(Long equipmentId, Long userId, Rental rentalRequest);

    Response findRentalByConfirmationCode(String confirmationCode);

    Response getAllRentals();

    Response cancelRental(Long rentalId);

}
