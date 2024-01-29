package com.example.backend.service;

import com.example.backend.entity.AdminPost;

import java.util.List;

public interface AdminPostService {
    String messagepost(String message);

    List<AdminPost> getAdminMessage();
}
