package com.example.backend.repository;

import com.example.backend.entity.Userinfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Userinfo,Long> {
    Optional<Userinfo> findByEmail(String email);
}
