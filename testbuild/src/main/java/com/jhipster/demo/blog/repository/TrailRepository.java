package com.jhipster.demo.blog.repository;

import com.jhipster.demo.blog.domain.Trail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Trail entity.
 */
@Repository
public interface TrailRepository extends JpaRepository<Trail, Long> {

    @Query(value = "select distinct trail from Trail trail left join fetch trail.tags",
        countQuery = "select count(distinct trail) from Trail trail")
    Page<Trail> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct trail from Trail trail left join fetch trail.tags")
    List<Trail> findAllWithEagerRelationships();

    @Query("select trail from Trail trail left join fetch trail.tags where trail.id =:id")
    Optional<Trail> findOneWithEagerRelationships(@Param("id") Long id);

}
