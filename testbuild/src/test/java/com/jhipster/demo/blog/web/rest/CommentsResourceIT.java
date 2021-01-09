package com.jhipster.demo.blog.web.rest;

import com.jhipster.demo.blog.BlogApp;
import com.jhipster.demo.blog.domain.Comments;
import com.jhipster.demo.blog.repository.CommentsRepository;
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
 * Integration tests for the {@Link CommentsResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)
public class CommentsResourceIT {

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private CommentsRepository commentsRepository;

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

    private MockMvc restCommentsMockMvc;

    private Comments comments;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommentsResource commentsResource = new CommentsResource(commentsRepository);
        this.restCommentsMockMvc = MockMvcBuilders.standaloneSetup(commentsResource)
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
    public static Comments createEntity(EntityManager em) {
        Comments comments = new Comments()
            .author(DEFAULT_AUTHOR)
            .description(DEFAULT_DESCRIPTION);
        return comments;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Comments createUpdatedEntity(EntityManager em) {
        Comments comments = new Comments()
            .author(UPDATED_AUTHOR)
            .description(UPDATED_DESCRIPTION);
        return comments;
    }

    @BeforeEach
    public void initTest() {
        comments = createEntity(em);
    }

    @Test
    @Transactional
    public void createComments() throws Exception {
        int databaseSizeBeforeCreate = commentsRepository.findAll().size();

        // Create the Comments
        restCommentsMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isCreated());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeCreate + 1);
        Comments testComments = commentsList.get(commentsList.size() - 1);
        assertThat(testComments.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
        assertThat(testComments.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createCommentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commentsRepository.findAll().size();

        // Create the Comments with an existing ID
        comments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommentsMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isBadRequest());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentsRepository.findAll().size();
        // set the field null
        comments.setDescription(null);

        // Create the Comments, which fails.

        restCommentsMockMvc.perform(post("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isBadRequest());

        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        // Get all the commentsList
        restCommentsMockMvc.perform(get("/api/comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comments.getId().intValue())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        // Get the comments
        restCommentsMockMvc.perform(get("/api/comments/{id}", comments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comments.getId().intValue()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComments() throws Exception {
        // Get the comments
        restCommentsMockMvc.perform(get("/api/comments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();

        // Update the comments
        Comments updatedComments = commentsRepository.findById(comments.getId()).get();
        // Disconnect from session so that the updates on updatedComments are not directly saved in db
        em.detach(updatedComments);
        updatedComments
            .author(UPDATED_AUTHOR)
            .description(UPDATED_DESCRIPTION);

        restCommentsMockMvc.perform(put("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComments)))
            .andExpect(status().isOk());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
        Comments testComments = commentsList.get(commentsList.size() - 1);
        assertThat(testComments.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testComments.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingComments() throws Exception {
        int databaseSizeBeforeUpdate = commentsRepository.findAll().size();

        // Create the Comments

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentsMockMvc.perform(put("/api/comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comments)))
            .andExpect(status().isBadRequest());

        // Validate the Comments in the database
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComments() throws Exception {
        // Initialize the database
        commentsRepository.saveAndFlush(comments);

        int databaseSizeBeforeDelete = commentsRepository.findAll().size();

        // Delete the comments
        restCommentsMockMvc.perform(delete("/api/comments/{id}", comments.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Comments> commentsList = commentsRepository.findAll();
        assertThat(commentsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comments.class);
        Comments comments1 = new Comments();
        comments1.setId(1L);
        Comments comments2 = new Comments();
        comments2.setId(comments1.getId());
        assertThat(comments1).isEqualTo(comments2);
        comments2.setId(2L);
        assertThat(comments1).isNotEqualTo(comments2);
        comments1.setId(null);
        assertThat(comments1).isNotEqualTo(comments2);
    }
}
