package com.example.backend.repository;

import com.example.backend.entity.Courseinfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseinfoRepository extends JpaRepository<Courseinfo, Long> {
    Courseinfo findByCourseId(Long courseId);
}
