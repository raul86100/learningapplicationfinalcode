package com.example.backend.service;

import com.example.backend.dto.TransactionDetailsDTO;
import com.example.backend.dto.UserDetailsDTO;
import com.example.backend.dto.UserInfoDTO;
import com.example.backend.entity.Courseinfo;

import java.util.List;
import java.util.Optional;

public interface UserService {


    public UserDetailsDTO getusercourse(Long userid);

    public long admininsert(String coursename, String coursedescription, String language, String duration, String difficultylevel, float rating, float price, String authorname, String link);

    public List<Courseinfo> getallcourse();

    public Long deletecourse(Long courseId);

    public String enrollcourse(Long courseId, Long userid);

    public String access(Long userid, Long courseId);

    String editCourse(Long courseId, String authorname, String coursedescription, String coursename, String difficultylevel, String duration, String link, float price, float rating);

    public Optional<Courseinfo> getCourseInfo(Long courseId);


    String courseCompletion(Long userid, Long courseId);


    List<Courseinfo> courseCompletioncount(Long userid);

    List<Courseinfo> courseunCompletioncount(Long userid);

    String AddUser(UserInfoDTO userInfoDTO);
    public TransactionDetailsDTO startTransaction(float amount);

}
