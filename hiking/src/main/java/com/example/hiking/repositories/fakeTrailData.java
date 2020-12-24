package com.example.hiking.repositories;

import com.example.hiking.Model.Trail;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("fakeTrail")
public class fakeTrailData implements TrailDao {
    private static List<Trail> DB = new ArrayList<>();

    public int insertNewTrail(UUID id, Trail trail){
        DB.add(new Trail(id, trail.getName()));
        return 1;
    }

    @Override
    public List<Trail> getTrails(){
        return this.DB;
    }

    @Override
    public Optional<Trail> findTrail(String name){
        return DB.stream().findAny();
    }

    @Override
    public void setDescription(String name, String description) {

    }

}
