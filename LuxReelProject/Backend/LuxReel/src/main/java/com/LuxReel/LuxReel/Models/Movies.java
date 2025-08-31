package com.LuxReel.LuxReel.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Time;
import java.util.List;

@Document(collection = "Movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movies {
    @Id
    private ObjectId id;
    private String title;
    private String description;
    private String releaseDate;
    private int duration;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private String category;
    private String language;
    private double rating;

}
