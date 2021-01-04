package com.example.SpringJPA;

import com.example.SpringJPA.Models.Review;
import com.example.SpringJPA.Models.Trail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;

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

    public List<Trail> pageOfData(){
        List<Trail> l = new ArrayList<>();
        Pageable page = PageRequest.of(0,5);

        l = trailRepository.findByRatingGreaterThan(2, page).getContent();
        return l;
    }
}
