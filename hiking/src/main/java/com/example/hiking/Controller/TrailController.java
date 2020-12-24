package com.example.hiking.Controller;

import com.example.hiking.Model.Trail;
import com.example.hiking.Service.TrailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequestMapping("api/trail")
@RestController
public class TrailController {
    private final TrailService trailService;

    @Autowired
    public TrailController(TrailService trailService) {
        this.trailService = trailService;
    }

    @GetMapping
    public List<Trail> getTrails(){
        return trailService.getTrails();
    }

    @GetMapping(path="{name}")
    public Optional<Trail> getTrailByName(@PathVariable("name") String name){
        return this.trailService.findTrail(name);
    }

    @GetMapping(path="{name}/{description}")
    public int setDescription(@PathVariable("name") String name, @PathVariable("description") String description){
        trailService.setDescription(name, description);
        return 1;
    }

    @PostMapping
    public int insertTrail(@RequestBody Trail trail){
        trailService.insertNewTrail(UUID.randomUUID() , trail);
        return 1;
    }

    @RequestMapping("/update")
    @PutMapping
    public int setUpdate(@RequestBody Trail trail){
        trailService.setDescription(trail.getName(), trail.getDescription());
        return 1;
    }

}
