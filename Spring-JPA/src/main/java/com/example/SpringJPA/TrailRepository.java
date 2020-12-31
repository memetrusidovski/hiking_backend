package com.example.SpringJPA;

import com.example.SpringJPA.Models.Trail;
import org.springframework.data.repository.CrudRepository;

//The First value in the generic type is the Model object that the CRUD
//App is working with. The second is the type of the id.
public interface TrailRepository extends CrudRepository<Trail, String> {

}
