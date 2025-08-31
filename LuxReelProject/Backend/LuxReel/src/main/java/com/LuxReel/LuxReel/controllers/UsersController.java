package com.LuxReel.LuxReel.controllers;

import com.LuxReel.LuxReel.Models.Users;
import com.LuxReel.LuxReel.Services.MoviesService;
import com.LuxReel.LuxReel.Services.UsersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersServices usersServices;

    @GetMapping
    public List<Users> users(){
        return usersServices.AllUsers();
    }
}
