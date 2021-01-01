package com.example.SpringJPA;

import com.example.SpringJPA.Models.Review;
import com.example.SpringJPA.Models.Trail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class testService {

    @Autowired
    private TrailRepository trailRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Trail> getAllTrails(){
        List<Trail> t = new ArrayList<>();
        trailRepository.findAll()
                .forEach(t::add);

        return t;
    }

    public int addTrail(String name, String description ){
        Trail temp = new Trail(UUID.randomUUID(), name);
        temp.setDescription(description);

        trailRepository.save(temp);

        return 1;
    }
    public int addReviewToTrail(UUID search, String user, String title, String description){
        Review temp = new Review(user, title, description);
        //Optional<Trail> trail = trailRepository..findById(search);
        Trail trail = trailRepository.findById(search).get();

        System.out.println(temp.getTitle() +"<++++++");

        trail.add(temp);
        reviewRepository.save( trail.getReviews().get(0) );

        System.out.println(trail.getReviews().get(0).getTitle() + "<------");
        return 1;
    }
}
