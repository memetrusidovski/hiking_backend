package com.example.hiking.Model;

import org.springframework.lang.NonNull;

import java.util.UUID;

public class Trail {
    private UUID id;
    @NonNull
    private String name;


    private String description;
    private String imageURL;


    private String imageAlt;
    private Integer rating;

    private Integer open;
    private Integer close;
    private String address;

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
}
