package com.example.backend.repository;

import com.example.backend.entity.LoginStreak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginStreakRepo extends JpaRepository<LoginStreak,Long> {


    Optional<LoginStreak> findByUserUserId(Long userId);
}
