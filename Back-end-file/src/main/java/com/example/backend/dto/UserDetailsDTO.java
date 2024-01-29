package com.example.backend.dto;

import com.example.backend.entity.Userinfo;


import java.util.List;

public class UserDetailsDTO {

    Userinfo userinfo;
    List<CourseEnrolledDTO> courseEnrolled;

    public Userinfo getUserinfo() {
        return userinfo;
    }

    public void setUserinfo(Userinfo userinfo) {
        this.userinfo = userinfo;
    }

    public List<CourseEnrolledDTO> getCourseEnrolled() {
        return courseEnrolled;
    }

    public void setCourseEnrolled(List<CourseEnrolledDTO> courseEnrolled) {
        this.courseEnrolled = courseEnrolled;
    }
}
