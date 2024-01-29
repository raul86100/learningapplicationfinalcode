package com.example.backend.service.impl;

import com.example.backend.repository.CourseinfoRepository;
import com.example.backend.repository.CoursesEnrolledRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.CountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class CountImplementation implements CountService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseinfoRepository courseinfoRepository;
    @Autowired
    private CoursesEnrolledRepository coursesEnrolledRepository;

    @Override
    public int userCount() {
        long count = userRepository.count();
        return (int) count;

    }

    @Override
    public int courseCount() {
        long courseCount = courseinfoRepository.count();
        return (int) courseCount;
    }

    @Override
    public int enrollmentCount() {
        long enrollmentCount = coursesEnrolledRepository.count();
        return (int) enrollmentCount;
    }
}
