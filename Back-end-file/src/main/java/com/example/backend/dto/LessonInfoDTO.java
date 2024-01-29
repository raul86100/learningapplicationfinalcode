package com.example.backend.dto;

public class LessonInfoDTO {
    private String lessonName;
    private String lessonDescription;
    private String lessonLink;

    public String getLessonName() {
        return lessonName;
    }

    public void setLessonName(String lessonName) {
        this.lessonName = lessonName;
    }

    public String getLessonDescription() {
        return lessonDescription;
    }

    public void setLessonDescription(String lessonDescription) {
        this.lessonDescription = lessonDescription;
    }

    public String getLessonLink() {
        return lessonLink;
    }

    public void setLessonLink(String lessonLink) {
        this.lessonLink = lessonLink;
    }
}
