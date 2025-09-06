package com.LuxReel.LuxReel.Services;

import com.LuxReel.LuxReel.DTO.LoginRequest;
import com.LuxReel.LuxReel.DTO.SignupRequest;
import com.LuxReel.LuxReel.Models.Users;
import com.LuxReel.LuxReel.Repository.MoviesRepository;
import com.LuxReel.LuxReel.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersServices {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<Users> AllUsers() {
        return usersRepository.findAll();
    }

    public Users registerUser(SignupRequest request) {
        if(usersRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username already taken");
        if(usersRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email already registered");

        String hashedPassword = passwordEncoder.encode(request.getPassword()); // Use injected encoder
        Users user = new Users();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);
        if (request.getRole() == null || request.getRole().isEmpty()) {
            user.setRole("USER");
        } else {
            user.setRole(request.getRole());
        }

        return usersRepository.save(user);
    }

    public Users loginUser(LoginRequest request) {
        Optional<Users> optionalUser = usersRepository.findByUsernameOrEmail(
                request.getUsernameOrEmail(), request.getUsernameOrEmail()
        );

        if (optionalUser.isEmpty())
            throw new RuntimeException("User not found");

        Users user = optionalUser.get();
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword()); // Use injected encoder
        if (!matches) throw new RuntimeException("Invalid password");

        return user;
    }
}
