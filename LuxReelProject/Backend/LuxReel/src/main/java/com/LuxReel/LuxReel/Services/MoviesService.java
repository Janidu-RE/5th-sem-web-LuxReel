package com.LuxReel.LuxReel.Services;

import com.LuxReel.LuxReel.Models.Movies;
import com.LuxReel.LuxReel.Repository.MoviesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoviesService {

    @Autowired
    private MoviesRepository moviesRepository;

    public List<Movies> allMovies(){
        return moviesRepository.findAll();
    }
    public List<Movies> findByMovieStatus(String status){
        return moviesRepository.findByCategory(status);
    }
    public Movies addMovie(Movies movie){
        return moviesRepository.save(movie);
    }
    public List<Movies> findByMovieTitle(String title){
        return moviesRepository.findByTitleIgnoreCaseContaining(title);
    }
}
