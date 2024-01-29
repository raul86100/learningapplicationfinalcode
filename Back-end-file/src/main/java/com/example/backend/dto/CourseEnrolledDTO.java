package com.example.backend.dto;

import com.example.backend.entity.Courseinfo;

import java.util.Date;

public class CourseEnrolledDTO {

    private int enrollmentId;

    private Date enrolledDate;
    private Date accessedDate;
    private boolean paid;

    private Courseinfo courseinfo;

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

    public Courseinfo getCourseinfo() {
        return courseinfo;
    }

    public void setCourseinfo(Courseinfo courseinfo) {
        this.courseinfo = courseinfo;
    }
}
