package com.example.backend.controller;

import com.example.backend.dto.LessonDTO;
import com.example.backend.entity.Lesson;
import com.example.backend.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LessonPostController {


    @Autowired
    private LessonService lessonService;

    @PostMapping("/Lesson/{courseId}")
    public ResponseEntity<List<Lesson>> createLessons(@PathVariable Long courseId, @RequestBody LessonDTO lessonDTO) {
        List<Lesson> createdLessons = lessonService.createLessons(courseId, lessonDTO);
        return new ResponseEntity<>(createdLessons, HttpStatus.CREATED);
    }

}
