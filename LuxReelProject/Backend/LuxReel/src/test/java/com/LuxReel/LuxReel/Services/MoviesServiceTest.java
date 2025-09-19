package com.LuxReel.LuxReel.Services;

import com.LuxReel.LuxReel.Models.Movies;
import com.LuxReel.LuxReel.Repository.MoviesRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MoviesServiceTest {

    @Mock
    private MoviesRepository moviesRepository;

    @InjectMocks
    private MoviesService moviesService;

    @Test
    void addMovie_shouldSaveAndReturnMovie() {

        Movies newMovie = new Movies();
        newMovie.setId(new ObjectId());
        newMovie.setTitle("My Movie");
        newMovie.setCategory("Now Showing");

        when(moviesRepository.save(newMovie)).thenReturn(newMovie);


        Movies saved = moviesService.addMovie(newMovie);


        assertNotNull(saved);
        assertEquals("My Movie", saved.getTitle());
        verify(moviesRepository, times(1)).save(newMovie);
    }

    @Test
    void findByMovieStatus_shouldReturnMoviesOfGivenCategory() {

        Movies movie1 = new Movies();
        movie1.setTitle("Action Movie");
        movie1.setCategory("Action");

        Movies movie2 = new Movies();
        movie2.setTitle("Another Action");
        movie2.setCategory("Action");

        when(moviesRepository.findByCategory("Action"))
                .thenReturn(Arrays.asList(movie1, movie2));


        List<Movies> result = moviesService.findByMovieStatus("Action");


        assertEquals(2, result.size());
        assertEquals("Action", result.get(0).getCategory());
        verify(moviesRepository, times(1)).findByCategory("Action");
    }
}
