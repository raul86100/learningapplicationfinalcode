package com.example.backend.service;

import com.example.backend.dto.LessonDTO;
import com.example.backend.entity.Lesson;

import java.util.List;

public interface LessonService {
    List<Lesson> createLessons(Long courseId, LessonDTO lessonDTO);


}
