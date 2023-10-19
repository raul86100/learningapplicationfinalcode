package com.example.backend.service.impl;

import com.example.backend.dto.LessonDTO;
import com.example.backend.dto.LessonInfoDTO;
import com.example.backend.entity.Courseinfo;
import com.example.backend.entity.Lesson;
import com.example.backend.repository.CourseinfoRepository;
import com.example.backend.repository.LessonRepository;
import com.example.backend.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LessonImplementation implements LessonService {
    @Autowired
    private CourseinfoRepository courseinfoRepository;
    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public List<Lesson> createLessons(Long courseId, LessonDTO lessonDTO) {
        Courseinfo course = courseinfoRepository.findByCourseId(courseId);
        List<Lesson> notCreatedLesson=new ArrayList<>();
        if (course!=null)
        {
            List<Lesson> createdLessons = new ArrayList<>();


            for (LessonInfoDTO lessonInfo : lessonDTO.getLessons())
            {
                Lesson lesson = new Lesson();
                lesson.setLessonName(lessonInfo.getLessonName());
                lesson.setLessonDescription(lessonInfo.getLessonDescription());
                lesson.setLessonLink(lessonInfo.getLessonLink());
                lesson.setCourse(course);

                createdLessons.add(lesson);
            }
            lessonRepository.saveAll(createdLessons);
            return createdLessons;
        }
        return notCreatedLesson;
    }



}
