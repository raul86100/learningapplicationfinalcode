package com.example.backend.controller;

import com.example.backend.service.CountService;
import com.example.backend.dto.CountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountController {
    @Autowired
    private CountService countService;

    @GetMapping("/GetCount")
    public ResponseEntity<CountDTO> getCount() {
        int userCount = countService.userCount();
        int courseCount = countService.courseCount();
        int enrollmentCount = countService.enrollmentCount();
        CountDTO countDto = new CountDTO(userCount, courseCount, enrollmentCount);
        return ResponseEntity.ok(countDto);

    }

}
