package com.example.hiking.repositories;

import com.example.hiking.Model.Trail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class TrailDataService implements TrailDao {
    //private static List<Trail> DB = new ArrayList<>();
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TrailDataService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertNewTrail(UUID id, Trail trail){
        String sql = "INSERT INTO trails (id, name) VALUES (?,?)";
        jdbcTemplate.update( sql, id, trail.getName() );
        return 1;
    }

    @Override
    public void setDescription(String name, String description){
        String sql = "UPDATE trails SET description = ? WHERE name = ?";
        jdbcTemplate.update( sql, description, name);
        System.out.println("Hello");
    }

    @Override
    public List<Trail> getTrails(){
        String sql = "SELECT id, name FROM trails";
        List<Trail> trails = jdbcTemplate.query(sql, (resultSet, i) -> {
            return new Trail(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("name"));
        });
        return trails;
    }

    @Override
    public Optional<Trail> findTrail(String name){
        String sql = "SELECT id, name FROM trails WHERE name = ?";
        Trail trails = jdbcTemplate.queryForObject(
                sql,
                new Object[]{name},
                (resultSet, i) -> {
                    return new Trail(
                            UUID.fromString(resultSet.getString("id")),
                            resultSet.getString("name"));
        });
        return Optional.ofNullable(trails);
    }

}