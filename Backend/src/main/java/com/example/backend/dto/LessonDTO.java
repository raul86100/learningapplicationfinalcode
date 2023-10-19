package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class LessonDTO {

    public List<LessonInfoDTO> getLessons() {
        return lessons;
    }

    public void setLessons(List<LessonInfoDTO> lessons) {
        this.lessons = lessons;
    }

    private List<LessonInfoDTO> lessons;

}