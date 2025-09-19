package com.LuxReel.LuxReel.stepdefinitions;

import com.LuxReel.LuxReel.Models.Movies;
import com.LuxReel.LuxReel.Services.MoviesService;
import io.cucumber.java.en.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@SpringBootTest
public class MoviSteps {

    @Autowired
    private MoviesService moviesService;

    private Movies addedMovie;

    @Given("the movie list is empty")
    public void movie_list_is_empty() {
        List<Movies> allMovies = moviesService.allMovies();
        for (Movies movie : allMovies) {
            moviesService.deleteMovieByTitle(movie.getTitle());
        }
    }

    @When("I add a movie with title {string} and category {string} and rating {double}")
    public void i_add_movie(String title, String category, double rating) {
        Movies movie = new Movies();
        movie.setTitle(title);
        movie.setCategory(category);
        movie.setRating(rating);
        addedMovie = moviesService.addMovie(movie);
    }

    @Then("the movie list should contain the movie {string}")
    public void movie_list_should_contain(String title) {
        List<Movies> movies = moviesService.findByMovieTitle(title);
        assertFalse(movies.isEmpty(), "Movie list does not contain the movie");
        assertEquals(title, movies.get(0).getTitle());
    }
}
