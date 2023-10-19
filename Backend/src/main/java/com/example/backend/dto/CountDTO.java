package com.example.backend.dto;

public class CountDTO {
    private int userCount;
    private int courseCount;
    private int enrollmentCount;
    public CountDTO(int userCount, int courseCount, int enrollmentCount) {
        this.userCount = userCount;
        this.courseCount = courseCount;
        this.enrollmentCount = enrollmentCount;
    }

    public int getUserCount() {
        return userCount;
    }

    public void setUserCount(int userCount) {
        this.userCount = userCount;
    }

    public int getCourseCount() {
        return courseCount;
    }

    public void setCourseCount(int courseCount) {
        this.courseCount = courseCount;
    }

    public int getEnrollmentCount() {
        return enrollmentCount;
    }

    public void setEnrollmentCount(int enrollmentCount) {
        this.enrollmentCount = enrollmentCount;
    }
}
