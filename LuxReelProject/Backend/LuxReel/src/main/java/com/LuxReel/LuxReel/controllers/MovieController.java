package com.LuxReel.LuxReel.controllers;

import com.LuxReel.LuxReel.Models.Movies;
import com.LuxReel.LuxReel.Services.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MoviesService moviesService;

    @GetMapping
    public List<Movies> movies(){
        return moviesService.allMovies();
    }

    @GetMapping("/{status}")
    public List<Movies> moviesByStatus(@PathVariable String status){
        return moviesService.findByMovieStatus(status);
    }

    @GetMapping("/search")
    public List<Movies> moviesByTitle(@RequestParam String title){
        return moviesService.findByMovieTitle(title);
    }

    @PostMapping
    public Movies addMovie(@RequestBody Movies movie){
        return moviesService.addMovie(movie);
    }
}
