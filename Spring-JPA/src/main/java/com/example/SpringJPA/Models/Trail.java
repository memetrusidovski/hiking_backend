package com.example.SpringJPA.Models;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Trail {

    @Id
    private UUID id;
    @NonNull
    private String name;


    private String description;
    private String imageURL;
    private String imageAlt;


    private String difficulty;
    private Integer rating;
    private String length;
    private Integer dogFriendly;


    private Integer open;
    private Integer close;
    private String address;

    @OneToMany(mappedBy = "trail",
                cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                            CascadeType.DETACH, CascadeType.REFRESH})
    private List<Review> reviews;

    public void add(Review tempReview){
        if (reviews == null){
            reviews = new ArrayList<>();
        }

        reviews.add(0, tempReview);
        tempReview.setTrail(this);
    }
    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Trail(){}

    public Trail(UUID id, @NonNull String name) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Trail(UUID id, @NonNull String name, String description, Integer open, Integer close) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.open = open;
        this.close = close;
    }

    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription() {
        return description;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
    public UUID getId() {
        return id;
    }

    public String getImageAlt() {
        return imageAlt;
    }

    public Integer getRating() {
        return rating;
    }
    @NonNull
    public String getName() {
        return name;
    }

    @Override
    public String toString(){
        return this.name;
    }
}
