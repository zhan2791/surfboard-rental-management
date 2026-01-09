package com.phegondev.SurfboardRental.service.impl;

import com.phegondev.SurfboardRental.dto.RentalDTO;
import com.phegondev.SurfboardRental.dto.Response;
import com.phegondev.SurfboardRental.entity.Rental;
import com.phegondev.SurfboardRental.entity.Equipment;
import com.phegondev.SurfboardRental.entity.User;
import com.phegondev.SurfboardRental.exception.OurException;
import com.phegondev.SurfboardRental.repo.RentalRepository;
import com.phegondev.SurfboardRental.repo.EquipmentRepository;
import com.phegondev.SurfboardRental.repo.UserRepository;
import com.phegondev.SurfboardRental.service.interfac.IRentalService;
import com.phegondev.SurfboardRental.service.interfac.IEquipmentService;
import com.phegondev.SurfboardRental.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RentalService implements IRentalService {

    @Autowired
    private RentalRepository rentalRepository;
    @Autowired
    private IEquipmentService equipmentService;
    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public Response saveRental(Long equipmentId, Long userId, Rental rentalRequest) {

        Response response = new Response();

        try {
            if (rentalRequest.getCheckOutDate().isBefore(rentalRequest.getCheckInDate())
                    || rentalRequest.getCheckOutDate().isEqual(rentalRequest.getCheckInDate())) {
                throw new IllegalArgumentException("End date must be after start date");
            }
            Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(() -> new OurException("Equipment Not Found"));
            User user = userRepository.findById(userId).orElseThrow(() -> new OurException("User Not Found"));

            rentalRequest.setEquipment(equipment);
            List<Rental> existingRentals = equipment.getRentals();

            if (!rentalIsAvailable(rentalRequest, existingRentals)) {
                throw new OurException("Rental not Available for selected date range");
            }


            rentalRequest.setUser(user);
            String rentalConfirmationCode = Utils.generateRandomConfirmationCode(10);
            rentalRequest.setRentalConfirmationCode(rentalConfirmationCode);
            rentalRepository.save(rentalRequest);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRentalConfirmationCode(rentalConfirmationCode);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Saving a rental: " + e.getMessage());

        }
        return response;
    }


    @Override
    public Response findRentalByConfirmationCode(String confirmationCode) {

        Response response = new Response();

        try {
            Rental rental = rentalRepository.findByRentalConfirmationCode(confirmationCode).orElseThrow(() -> new OurException("Rental Not Found"));
            RentalDTO rentalDTO = Utils.mapRentalEntityToRentalDTOPlusBookedEquipments(rental, true);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRental(rentalDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Finding a rental: " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response getAllRentals() {

        Response response = new Response();

        try {
            List<Rental> rentalList = rentalRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RentalDTO> rentalDTOList = Utils.mapRentalListEntityToRentalListDTO(rentalList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRentalList(rentalDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting all rentals: " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response cancelRental(Long rentalId) {

        Response response = new Response();

        try {
            rentalRepository.findById(rentalId).orElseThrow(() -> new OurException("Rental Does Not Exist"));
            rentalRepository.deleteById(rentalId);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Cancelling a rental: " + e.getMessage());

        }
        return response;
    }


    private boolean rentalIsAvailable(Rental rentalRequest, List<Rental> existingRentals) {

        // 没有设备/库存信息的话，只做最基本的重叠判断
        if (existingRentals == null || existingRentals.isEmpty()) return true;

        LocalDate reqStart = rentalRequest.getCheckInDate();
        LocalDate reqEnd = rentalRequest.getCheckOutDate();

        int reqQty = rentalRequest.getQuantity();
        if (reqQty <= 0) reqQty = 1;

        // 同一时间段内，已租出的数量总和 + 本次请求数量 <= 库存
        int stock = rentalRequest.getEquipment().getStockQuantity();

        int alreadyBookedQty = existingRentals.stream()
                .filter(r -> datesOverlap(reqStart, reqEnd, r.getCheckInDate(), r.getCheckOutDate()))
                .mapToInt(r -> r.getQuantity() <= 0 ? 1 : r.getQuantity())
                .sum();

        return alreadyBookedQty + reqQty <= stock;
    }

    /**
     * if overlap：
     *  [start, end)
     * overlap 当且仅当 start < otherEnd && end > otherStart
     */
    private boolean datesOverlap(LocalDate start1, LocalDate end1, LocalDate start2, LocalDate end2) {
        return start1.isBefore(end2) && end1.isAfter(start2);
    }
}
