package com.example.backend.service.impl;

import com.example.backend.entity.AdminPost;
import com.example.backend.repository.AdminPostRepository;
import com.example.backend.service.AdminPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminPostImplementation implements AdminPostService {
    @Autowired
    private AdminPostRepository adminPostRepository;


    @Override
    public String messagepost(String message) {
        AdminPost adminPost=new AdminPost();
        adminPost.setMessage(message);
        adminPostRepository.save(adminPost);
        return message;
    }

    @Override
    public List<AdminPost> getAdminMessage() {
        return adminPostRepository.findAll();
    }
}

