package com.example.SpringJPA;

import com.example.SpringJPA.Models.Trail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

//The First value in the generic type is the Model object that the CRUD
//App is working with. The second is the type of the id.
public interface TrailRepository extends CrudRepository<Trail, UUID> {
    String findByName(String name);
    Page<Trail> findByRatingGreaterThan(Integer rating, Pageable page);
    //Slice<Trail> findByRating(Integer rating, Pageable page);

}
