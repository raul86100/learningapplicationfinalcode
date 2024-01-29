package com.example.backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Courseinfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "courseid")
    long courseId;
    String coursename;
    @Column(length = 10000)
    String coursedescription;

    String language;
    String duration;
    String difficultylevel;


    float rating;
    float price;
    String authorname;
    String link;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Lesson> lessons;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }


    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }

    public String getCoursename() {
        return coursename;
    }

    public void setCoursename(String coursename) {
        this.coursename = coursename;
    }

    public String getCoursedescription() {
        return coursedescription;
    }

    public void setCoursedescription(String coursedescription) {
        this.coursedescription = coursedescription;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }


    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getAuthorname() {
        return authorname;
    }

    public void setAuthorname(String authorname) {
        this.authorname = authorname;
    }


    public void setDifficultyLevel(String difficultylevel) {
        this.difficultylevel = difficultylevel;
    }

    public String getDifficultylevel() {
        return difficultylevel;
    }
}
