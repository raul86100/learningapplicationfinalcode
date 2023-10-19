package com.example.backend.controller;

import com.example.backend.service.LoginStreakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class LoginStreakController {

    @Autowired
    private LoginStreakService loginStreakService;

    @GetMapping("/GetLoginStreakforParticularUser/{userid}")
    public int GetLoginStreakforParticularUser(@PathVariable Long userid) {
        return loginStreakService.getLoginStreak(userid);
    }


}
