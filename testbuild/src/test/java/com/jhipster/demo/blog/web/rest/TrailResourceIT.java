package com.jhipster.demo.blog.web.rest;

import com.jhipster.demo.blog.BlogApp;
import com.jhipster.demo.blog.domain.Trail;
import com.jhipster.demo.blog.repository.TrailRepository;
import com.jhipster.demo.blog.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.jhipster.demo.blog.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TrailResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)
public class TrailResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TrailRepository trailRepository;

    @Mock
    private TrailRepository trailRepositoryMock;

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

    private MockMvc restTrailMockMvc;

    private Trail trail;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrailResource trailResource = new TrailResource(trailRepository);
        this.restTrailMockMvc = MockMvcBuilders.standaloneSetup(trailResource)
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
    public static Trail createEntity(EntityManager em) {
        Trail trail = new Trail()
            .title(DEFAULT_TITLE)
            .url(DEFAULT_URL)
            .content(DEFAULT_CONTENT)
            .date(DEFAULT_DATE);
        return trail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trail createUpdatedEntity(EntityManager em) {
        Trail trail = new Trail()
            .title(UPDATED_TITLE)
            .url(UPDATED_URL)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE);
        return trail;
    }

    @BeforeEach
    public void initTest() {
        trail = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrail() throws Exception {
        int databaseSizeBeforeCreate = trailRepository.findAll().size();

        // Create the Trail
        restTrailMockMvc.perform(post("/api/trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trail)))
            .andExpect(status().isCreated());

        // Validate the Trail in the database
        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeCreate + 1);
        Trail testTrail = trailList.get(trailList.size() - 1);
        assertThat(testTrail.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTrail.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testTrail.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testTrail.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createTrailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trailRepository.findAll().size();

        // Create the Trail with an existing ID
        trail.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrailMockMvc.perform(post("/api/trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trail)))
            .andExpect(status().isBadRequest());

        // Validate the Trail in the database
        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = trailRepository.findAll().size();
        // set the field null
        trail.setTitle(null);

        // Create the Trail, which fails.

        restTrailMockMvc.perform(post("/api/trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trail)))
            .andExpect(status().isBadRequest());

        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = trailRepository.findAll().size();
        // set the field null
        trail.setUrl(null);

        // Create the Trail, which fails.

        restTrailMockMvc.perform(post("/api/trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trail)))
            .andExpect(status().isBadRequest());

        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = trailRepository.findAll().size();
        // set the field null
        trail.setDate(null);

        // Create the Trail, which fails.

        restTrailMockMvc.perform(post("/api/trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trail)))
            .andExpect(status().isBadRequest());

        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrails() throws Exception {
        // Initialize the database
        trailRepository.saveAndFlush(trail);

        // Get all the trailList
        restTrailMockMvc.perform(get("/api/trails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trail.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTrailsWithEagerRelationshipsIsEnabled() throws Exception {
        TrailResource trailResource = new TrailResource(trailRepositoryMock);
        when(trailRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTrailMockMvc = MockMvcBuilders.standaloneSetup(trailResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTrailMockMvc.perform(get("/api/trails?eagerload=true"))
        .andExpect(status().isOk());

        verify(trailRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTrailsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TrailResource trailResource = new TrailResource(trailRepositoryMock);
            when(trailRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTrailMockMvc = MockMvcBuilders.standaloneSetup(trailResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTrailMockMvc.perform(get("/api/trails?eagerload=true"))
        .andExpect(status().isOk());

            verify(trailRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTrail() throws Exception {
        // Initialize the database
        trailRepository.saveAndFlush(trail);

        // Get the trail
        restTrailMockMvc.perform(get("/api/trails/{id}", trail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trail.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTrail() throws Exception {
        // Get the trail
        restTrailMockMvc.perform(get("/api/trails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrail() throws Exception {
        // Initialize the database
        trailRepository.saveAndFlush(trail);

        int databaseSizeBeforeUpdate = trailRepository.findAll().size();

        // Update the trail
        Trail updatedTrail = trailRepository.findById(trail.getId()).get();
        // Disconnect from session so that the updates on updatedTrail are not directly saved in db
        em.detach(updatedTrail);
        updatedTrail
            .title(UPDATED_TITLE)
            .url(UPDATED_URL)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE);

        restTrailMockMvc.perform(put("/api/trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrail)))
            .andExpect(status().isOk());

        // Validate the Trail in the database
        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeUpdate);
        Trail testTrail = trailList.get(trailList.size() - 1);
        assertThat(testTrail.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTrail.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testTrail.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testTrail.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTrail() throws Exception {
        int databaseSizeBeforeUpdate = trailRepository.findAll().size();

        // Create the Trail

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrailMockMvc.perform(put("/api/trails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trail)))
            .andExpect(status().isBadRequest());

        // Validate the Trail in the database
        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrail() throws Exception {
        // Initialize the database
        trailRepository.saveAndFlush(trail);

        int databaseSizeBeforeDelete = trailRepository.findAll().size();

        // Delete the trail
        restTrailMockMvc.perform(delete("/api/trails/{id}", trail.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Trail> trailList = trailRepository.findAll();
        assertThat(trailList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trail.class);
        Trail trail1 = new Trail();
        trail1.setId(1L);
        Trail trail2 = new Trail();
        trail2.setId(trail1.getId());
        assertThat(trail1).isEqualTo(trail2);
        trail2.setId(2L);
        assertThat(trail1).isNotEqualTo(trail2);
        trail1.setId(null);
        assertThat(trail1).isNotEqualTo(trail2);
    }
}
