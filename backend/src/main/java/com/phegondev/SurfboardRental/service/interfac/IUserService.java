package com.phegondev.SurfboardRental.service.interfac;

import com.phegondev.SurfboardRental.dto.LoginRequest;
import com.phegondev.SurfboardRental.dto.Response;
import com.phegondev.SurfboardRental.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserRentalHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
