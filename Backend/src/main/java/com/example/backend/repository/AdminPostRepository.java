package com.example.backend.repository;

import com.example.backend.entity.AdminPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminPostRepository extends JpaRepository<AdminPost,Long> {
}
