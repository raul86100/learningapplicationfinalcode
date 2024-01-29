package com.example.backend.controller;

import com.example.backend.entity.AdminPost;
import com.example.backend.service.AdminPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class AdminPostController {
    @Autowired
    private AdminPostService adminPostService;
    @PostMapping("/AdminPostMessage")
            public String AdminPost(@RequestBody AdminPost adminPost)
    {
        return adminPostService.messagepost(adminPost.getMessage());
    }
        
    @CrossOrigin(origins = "*")
    @GetMapping("/GetAdminmessage")
    @PreAuthorize("permitAll")
    public List<AdminPost> getAdminMessages( AdminPost adminPost)
    {
        return adminPostService.getAdminMessage();
    }


}
