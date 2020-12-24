package com.example.hiking.Service;

import com.example.hiking.Model.Trail;
import com.example.hiking.repositories.TrailDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TrailService {
    private final TrailDao trailDao;

    @Autowired
    public TrailService(@Qualifier("postgres") TrailDao trailDao) {
        this.trailDao = trailDao;
    }

    public List<Trail> getTrails(){
        return trailDao.getTrails();
    }

    public Optional<Trail> findTrail(String name){
        return trailDao.findTrail(name);
    }

    public int insertNewTrail(UUID uuid, Trail trail){
        trailDao.insertNewTrail(uuid, trail);
        return 1;
    }


    public void setDescription(String name, String description) {
        trailDao.setDescription(name, description);
    }
}
