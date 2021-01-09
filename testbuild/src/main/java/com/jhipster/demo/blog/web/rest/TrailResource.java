package com.jhipster.demo.blog.web.rest;

import com.jhipster.demo.blog.domain.Trail;
import com.jhipster.demo.blog.repository.TrailRepository;
import com.jhipster.demo.blog.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.demo.blog.domain.Trail}.
 */
@RestController
@RequestMapping("/api")
public class TrailResource {

    private final Logger log = LoggerFactory.getLogger(TrailResource.class);

    private static final String ENTITY_NAME = "trail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrailRepository trailRepository;

    public TrailResource(TrailRepository trailRepository) {
        this.trailRepository = trailRepository;
    }

    /**
     * {@code POST  /trails} : Create a new trail.
     *
     * @param trail the trail to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trail, or with status {@code 400 (Bad Request)} if the trail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trails")
    public ResponseEntity<Trail> createTrail(@Valid @RequestBody Trail trail) throws URISyntaxException {
        log.debug("REST request to save Trail : {}", trail);
        if (trail.getId() != null) {
            throw new BadRequestAlertException("A new trail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trail result = trailRepository.save(trail);
        return ResponseEntity.created(new URI("/api/trails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trails} : Updates an existing trail.
     *
     * @param trail the trail to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trail,
     * or with status {@code 400 (Bad Request)} if the trail is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trail couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trails")
    public ResponseEntity<Trail> updateTrail(@Valid @RequestBody Trail trail) throws URISyntaxException {
        log.debug("REST request to update Trail : {}", trail);
        if (trail.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Trail result = trailRepository.save(trail);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trail.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /trails} : get all the trails.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trails in body.
     */
    @GetMapping("/trails")
    public ResponseEntity<List<Trail>> getAllTrails(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Trails");
        Page<Trail> page;
        if (eagerload) {
            page = trailRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = trailRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /trails/:id} : get the "id" trail.
     *
     * @param id the id of the trail to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trail, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trails/{id}")
    public ResponseEntity<Trail> getTrail(@PathVariable Long id) {
        log.debug("REST request to get Trail : {}", id);
        Optional<Trail> trail = trailRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(trail);
    }

    /**
     * {@code DELETE  /trails/:id} : delete the "id" trail.
     *
     * @param id the id of the trail to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trails/{id}")
    public ResponseEntity<Void> deleteTrail(@PathVariable Long id) {
        log.debug("REST request to delete Trail : {}", id);
        trailRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
