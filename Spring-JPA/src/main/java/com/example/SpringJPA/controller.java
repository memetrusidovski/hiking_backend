package com.example.SpringJPA;

import com.example.SpringJPA.Models.Review;
import com.example.SpringJPA.Models.Trail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
public class controller {

    @Autowired
    testService test;

    @RequestMapping("/")
    public String home(){
        return "<h1>Welcome</h1>";
    }

    @RequestMapping("/get")
    public String findTrails(){
        List<Trail> l = new ArrayList<>();
        String s = "";
        l = test.getAllTrails();

        for (Trail x:
             l) {
            System.out.println(x.toString());
            s+= "<h1>" + x.toString() + "</h1>";
        }

        return s;
    }

    @RequestMapping("/newtrail")
    @PutMapping
    public int setUpdate(@RequestBody Trail trail){
        test.addTrail(trail.getName(), trail.getDescription());
        return 1;
    }

    @RequestMapping("/newreview/{name}")
    @PutMapping
    public int setReview(@RequestBody Review review, @PathVariable("name") String  name){

        test.addReviewToTrail(UUID.fromString( name ) , "anyone", review.getTitle(), review.getDescription());
        return 1;
    }
}
