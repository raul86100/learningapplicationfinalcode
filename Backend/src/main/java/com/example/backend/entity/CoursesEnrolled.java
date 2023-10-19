package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
public class CoursesEnrolled {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int enrollmentId;

    private Date enrolledDate;
    private Date accessedDate;
    private String courseCompleted;

    public String getCourseCompleted() {
        return courseCompleted;
    }

    public void setCourseCompleted(String courseCompleted) {
        this.courseCompleted = courseCompleted;
    }

    private boolean paid;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userid")
    private Userinfo userInfo;
    @ManyToOne

    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "courseId")
    private Courseinfo courseInfo;


    public int getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(int enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public Date getEnrolledDate() {
        return enrolledDate;
    }

    public void setEnrolledDate(Date enrolledDate) {
        this.enrolledDate = enrolledDate;
    }

    public Date getAccessedDate() {
        return accessedDate;
    }

    public void setAccessedDate(Date accessedDate) {
        this.accessedDate = accessedDate;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public Userinfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Userinfo userInfo) {
        this.userInfo = userInfo;
    }

    public Courseinfo getCourseInfo() {
        return courseInfo;
    }

    public void setCourseInfo(Courseinfo courseInfo) {
        this.courseInfo = courseInfo;
    }
}
