package com.example.SpringJPA;

import com.example.SpringJPA.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
