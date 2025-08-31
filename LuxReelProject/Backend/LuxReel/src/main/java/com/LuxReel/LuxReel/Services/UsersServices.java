package com.LuxReel.LuxReel.Services;

import com.LuxReel.LuxReel.Models.Users;
import com.LuxReel.LuxReel.Repository.MoviesRepository;
import com.LuxReel.LuxReel.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersServices {

    @Autowired
    private UsersRepository usersRepository;

    public List<Users> AllUsers(){
        return usersRepository.findAll();
    }
}
