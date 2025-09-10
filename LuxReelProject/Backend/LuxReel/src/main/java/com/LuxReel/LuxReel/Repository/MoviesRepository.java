package com.LuxReel.LuxReel.Repository;

import com.LuxReel.LuxReel.Models.Movies;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MoviesRepository extends MongoRepository<Movies, ObjectId> {
    List<Movies> findByCategory(String category);
    List<Movies> findByTitleIgnoreCaseContaining(String title);
    void deleteByTitle(String title);
    Optional<Movies> findByTitle(String title);
}

