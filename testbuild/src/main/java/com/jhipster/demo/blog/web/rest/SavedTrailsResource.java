package com.jhipster.demo.blog.web.rest;

import com.jhipster.demo.blog.domain.SavedTrails;
import com.jhipster.demo.blog.repository.SavedTrailsRepository;
import com.jhipster.demo.blog.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.demo.blog.domain.SavedTrails}.
 */
@RestController
@RequestMapping("/api")
public class SavedTrailsResource {

    private final Logger log = LoggerFactory.getLogger(SavedTrailsResource.class);

    private static final String ENTITY_NAME = "savedTrails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SavedTrailsRepository savedTrailsRepository;

    public SavedTrailsResource(SavedTrailsRepository savedTrailsRepository) {
        this.savedTrailsRepository = savedTrailsRepository;
    }

    /**
     * {@code POST  /saved-trails} : Create a new savedTrails.
     *
     * @param savedTrails the savedTrails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new savedTrails, or with status {@code 400 (Bad Request)} if the savedTrails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/saved-trails")
    public ResponseEntity<SavedTrails> createSavedTrails(@Valid @RequestBody SavedTrails savedTrails) throws URISyntaxException {
        log.debug("REST request to save SavedTrails : {}", savedTrails);
        if (savedTrails.getId() != null) {
            throw new BadRequestAlertException("A new savedTrails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SavedTrails result = savedTrailsRepository.save(savedTrails);
        return ResponseEntity.created(new URI("/api/saved-trails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /saved-trails} : Updates an existing savedTrails.
     *
     * @param savedTrails the savedTrails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated savedTrails,
     * or with status {@code 400 (Bad Request)} if the savedTrails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the savedTrails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/saved-trails")
    public ResponseEntity<SavedTrails> updateSavedTrails(@Valid @RequestBody SavedTrails savedTrails) throws URISyntaxException {
        log.debug("REST request to update SavedTrails : {}", savedTrails);
        if (savedTrails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SavedTrails result = savedTrailsRepository.save(savedTrails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, savedTrails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /saved-trails} : get all the savedTrails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of savedTrails in body.
     */
    @GetMapping("/saved-trails")
    public List<SavedTrails> getAllSavedTrails() {
        log.debug("REST request to get all SavedTrails");
        return savedTrailsRepository.findAll();
    }

    /**
     * {@code GET  /saved-trails/:id} : get the "id" savedTrails.
     *
     * @param id the id of the savedTrails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the savedTrails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/saved-trails/{id}")
    public ResponseEntity<SavedTrails> getSavedTrails(@PathVariable Long id) {
        log.debug("REST request to get SavedTrails : {}", id);
        Optional<SavedTrails> savedTrails = savedTrailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(savedTrails);
    }

    /**
     * {@code DELETE  /saved-trails/:id} : delete the "id" savedTrails.
     *
     * @param id the id of the savedTrails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/saved-trails/{id}")
    public ResponseEntity<Void> deleteSavedTrails(@PathVariable Long id) {
        log.debug("REST request to delete SavedTrails : {}", id);
        savedTrailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
