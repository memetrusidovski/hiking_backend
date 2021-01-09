package com.jhipster.demo.blog.repository;

import com.jhipster.demo.blog.domain.SavedTrails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SavedTrails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SavedTrailsRepository extends JpaRepository<SavedTrails, Long> {

}
