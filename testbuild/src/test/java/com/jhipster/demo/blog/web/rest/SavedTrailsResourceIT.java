package com.jhipster.demo.blog.web.rest;

import com.jhipster.demo.blog.BlogApp;
import com.jhipster.demo.blog.domain.SavedTrails;
import com.jhipster.demo.blog.repository.SavedTrailsRepository;
import com.jhipster.demo.blog.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.jhipster.demo.blog.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link SavedTrailsResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)
public class SavedTrailsResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private SavedTrailsRepository savedTrailsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSavedTrailsMockMvc;

    private SavedTrails savedTrails;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SavedTrailsResource savedTrailsResource = new SavedTrailsResource(savedTrailsRepository);
        this.restSavedTrailsMockMvc = MockMvcBuilders.standaloneSetup(savedTrailsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SavedTrails createEntity(EntityManager em) {
        SavedTrails savedTrails = new SavedTrails()
            .title(DEFAULT_TITLE);
        return savedTrails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SavedTrails createUpdatedEntity(EntityManager em) {
        SavedTrails savedTrails = new SavedTrails()
            .title(UPDATED_TITLE);
        return savedTrails;
    }

    @BeforeEach
    public void initTest() {
        savedTrails = createEntity(em);
    }

    @Test
    @Transactional
    public void createSavedTrails() throws Exception {
        int databaseSizeBeforeCreate = savedTrailsRepository.findAll().size();

        // Create the SavedTrails
        restSavedTrailsMockMvc.perform(post("/api/saved-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(savedTrails)))
            .andExpect(status().isCreated());

        // Validate the SavedTrails in the database
        List<SavedTrails> savedTrailsList = savedTrailsRepository.findAll();
        assertThat(savedTrailsList).hasSize(databaseSizeBeforeCreate + 1);
        SavedTrails testSavedTrails = savedTrailsList.get(savedTrailsList.size() - 1);
        assertThat(testSavedTrails.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createSavedTrailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = savedTrailsRepository.findAll().size();

        // Create the SavedTrails with an existing ID
        savedTrails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSavedTrailsMockMvc.perform(post("/api/saved-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(savedTrails)))
            .andExpect(status().isBadRequest());

        // Validate the SavedTrails in the database
        List<SavedTrails> savedTrailsList = savedTrailsRepository.findAll();
        assertThat(savedTrailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = savedTrailsRepository.findAll().size();
        // set the field null
        savedTrails.setTitle(null);

        // Create the SavedTrails, which fails.

        restSavedTrailsMockMvc.perform(post("/api/saved-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(savedTrails)))
            .andExpect(status().isBadRequest());

        List<SavedTrails> savedTrailsList = savedTrailsRepository.findAll();
        assertThat(savedTrailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSavedTrails() throws Exception {
        // Initialize the database
        savedTrailsRepository.saveAndFlush(savedTrails);

        // Get all the savedTrailsList
        restSavedTrailsMockMvc.perform(get("/api/saved-trails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(savedTrails.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }
    
    @Test
    @Transactional
    public void getSavedTrails() throws Exception {
        // Initialize the database
        savedTrailsRepository.saveAndFlush(savedTrails);

        // Get the savedTrails
        restSavedTrailsMockMvc.perform(get("/api/saved-trails/{id}", savedTrails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(savedTrails.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSavedTrails() throws Exception {
        // Get the savedTrails
        restSavedTrailsMockMvc.perform(get("/api/saved-trails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSavedTrails() throws Exception {
        // Initialize the database
        savedTrailsRepository.saveAndFlush(savedTrails);

        int databaseSizeBeforeUpdate = savedTrailsRepository.findAll().size();

        // Update the savedTrails
        SavedTrails updatedSavedTrails = savedTrailsRepository.findById(savedTrails.getId()).get();
        // Disconnect from session so that the updates on updatedSavedTrails are not directly saved in db
        em.detach(updatedSavedTrails);
        updatedSavedTrails
            .title(UPDATED_TITLE);

        restSavedTrailsMockMvc.perform(put("/api/saved-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSavedTrails)))
            .andExpect(status().isOk());

        // Validate the SavedTrails in the database
        List<SavedTrails> savedTrailsList = savedTrailsRepository.findAll();
        assertThat(savedTrailsList).hasSize(databaseSizeBeforeUpdate);
        SavedTrails testSavedTrails = savedTrailsList.get(savedTrailsList.size() - 1);
        assertThat(testSavedTrails.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingSavedTrails() throws Exception {
        int databaseSizeBeforeUpdate = savedTrailsRepository.findAll().size();

        // Create the SavedTrails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSavedTrailsMockMvc.perform(put("/api/saved-trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(savedTrails)))
            .andExpect(status().isBadRequest());

        // Validate the SavedTrails in the database
        List<SavedTrails> savedTrailsList = savedTrailsRepository.findAll();
        assertThat(savedTrailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSavedTrails() throws Exception {
        // Initialize the database
        savedTrailsRepository.saveAndFlush(savedTrails);

        int databaseSizeBeforeDelete = savedTrailsRepository.findAll().size();

        // Delete the savedTrails
        restSavedTrailsMockMvc.perform(delete("/api/saved-trails/{id}", savedTrails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SavedTrails> savedTrailsList = savedTrailsRepository.findAll();
        assertThat(savedTrailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SavedTrails.class);
        SavedTrails savedTrails1 = new SavedTrails();
        savedTrails1.setId(1L);
        SavedTrails savedTrails2 = new SavedTrails();
        savedTrails2.setId(savedTrails1.getId());
        assertThat(savedTrails1).isEqualTo(savedTrails2);
        savedTrails2.setId(2L);
        assertThat(savedTrails1).isNotEqualTo(savedTrails2);
        savedTrails1.setId(null);
        assertThat(savedTrails1).isNotEqualTo(savedTrails2);
    }
}
