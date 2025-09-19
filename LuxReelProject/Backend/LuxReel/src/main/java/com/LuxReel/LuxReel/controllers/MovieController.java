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

    @DeleteMapping("/id/{title}")
    public ResponseEntity<?> deleteMovie(@PathVariable String title) {
            moviesService.deleteMovieByTitle(title);
            return ResponseEntity.ok("Movie deleted successfully");

    }

    @PutMapping("/id/{title}")
    public ResponseEntity<?> updateMovie(@PathVariable String title, @RequestBody Movies updatedMovie) {
        Optional<Movies> existingMovie = moviesService.findByMovieTitleExact(title);
        if (existingMovie.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found");
        }
        Movies movie = existingMovie.get();

        movie.setTitle(updatedMovie.getTitle());
        movie.setCategory(updatedMovie.getCategory());
        movie.setRating(updatedMovie.getRating());
        movie.setReleaseDate(updatedMovie.getReleaseDate());
        movie.setTrailerLink(updatedMovie.getTrailerLink());

        Movies saved = moviesService.addMovie(movie); // same save() in repository
        return ResponseEntity.ok(saved);
    }






}
