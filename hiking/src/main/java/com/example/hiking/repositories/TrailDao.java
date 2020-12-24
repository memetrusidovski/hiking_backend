package com.example.hiking.repositories;

import com.example.hiking.Model.Trail;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TrailDao {
    public List<Trail> getTrails();

    public int insertNewTrail(UUID id, Trail trail);
    public Optional<Trail> findTrail(String name);

    public void setDescription(String name, String description);
}
