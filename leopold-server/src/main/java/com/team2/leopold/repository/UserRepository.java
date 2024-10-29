package com.team2.leopold.repository;

import com.team2.leopold.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(String id);

    @Query("SELECT u FROM User u WHERE u.name = :name AND u.email = :email")
    Optional<User> findByNameAndEmail(@Param("name") String name, @Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.name = :name AND u.phone = :phone")
    Optional<User> findByNameAndPhone(@Param("name") String name, @Param("phone") String phone);
}