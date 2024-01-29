package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class LoginStreak {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Userinfo user;

    private int streakCount;
    private LocalDate lastLoginDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Userinfo getUser() {
        return user;
    }

    public void setUser(Userinfo user) {
        this.user = user;
    }

    public int getStreakCount() {
        return streakCount;
    }

    public int setStreakCount(int streakCount) {
        this.streakCount = streakCount;
        return streakCount;
    }

    public LocalDate getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(LocalDate lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }


}