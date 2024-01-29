package com.example.backend.controller;

import com.example.backend.Authentication.JwtService;
import com.example.backend.dto.*;
import com.example.backend.entity.Courseinfo;
import com.example.backend.entity.Userinfo;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtService jwtService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;


    @PostMapping("/login")
    @PreAuthorize("permitAll")
    public String AddUser(@RequestBody UserInfoDTO userInfoDTO) {
        // System.out.println("inside add user");
        return userService.AddUser(userInfoDTO);
    }


    @PostMapping("/userLogin")
    @PreAuthorize("permitAll")
    public ResponseEntity<?> UserLogin(@RequestBody UserRequestDTO userRequest) {

        Optional<Userinfo> user = userRepository.findByEmail(userRequest.getEmail());

        if (user.isEmpty()) {
            Userinfo newuser = new Userinfo();
            newuser.setUserName(userRequest.getUserName());
            newuser.setEmail(userRequest.getEmail());
            newuser.setRole("User");
            newuser.setPassword(encoder.encode("BroCODE*12652837462"));

            newuser = userRepository.save(newuser);
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequest.getEmail(), "BroCODE*12652837462"));

        if (authentication.isAuthenticated()) {

            String token = jwtService.generateToken(userRequest.getEmail());


            Long userId = user.orElseGet(() -> userRepository.findByEmail(userRequest.getEmail()).get()).getUserId();

            AuthResponseDTO authResponse = new AuthResponseDTO(token,userId);
            return ResponseEntity.ok(authResponse);
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }


    @GetMapping("/courses/{userid}")
    public UserDetailsDTO getUserCourses(@PathVariable long userid) {
        return userService.getusercourse(userid);
    }

    @PostMapping("/Adminposting")
    public long admininsert(@RequestBody AdminCoursePostDTO courseinfo) {
        // System.out.println(courseinfo.getAuthorname());
        return userService.admininsert(courseinfo.getCoursename(), courseinfo.getCoursedescription(), courseinfo.getLanguage(), courseinfo.getDuration(), courseinfo.getDifficultylevel(), courseinfo.getRating(), courseinfo.getPrice(), courseinfo.getAuthorname(), courseinfo.getLink());
    }

    @GetMapping("/get")
    public List<Courseinfo> getallcourses() {
        return userService.getallcourse();
    }

    @DeleteMapping("/DeleteCourse/{courseId}")
    public Long admindeletecourse(@PathVariable long courseId) {
        return userService.deletecourse(courseId);
    }

    @PostMapping("/enroll")
    public String enrollment(@RequestParam(value = "courseId") Long courseId, @RequestParam(value = "userid") Long userid) {
        return userService.enrollcourse(courseId, userid);
    }

    @GetMapping("/Access")
    public String accesscontrol(@RequestParam(value = "userid") Long userid, @RequestParam(value = "courseId") Long courseId) {
        return userService.access(userid, courseId);
    }

    @PutMapping("/EditCourse/{courseId}")
    public String EditCourse(@RequestBody Courseinfo courseinfo, @PathVariable Long courseId) {

        return userService.editCourse(courseId, courseinfo.getAuthorname(), courseinfo.getCoursedescription(), courseinfo.getCoursename(), courseinfo.getDifficultylevel(), courseinfo.getDuration(), courseinfo.getLink(), courseinfo.getPrice(), courseinfo.getRating());
    }

    @GetMapping("/Getcourse/{courseId}")
    public Optional<Courseinfo> getcourseinfo(@PathVariable Long courseId) {
        return userService.getCourseInfo(courseId);
    }

    @PostMapping("/CourseCompletion")
    public String Coursecompletion(@RequestParam(value = "userid") Long userid, @RequestParam(value = "courseId") Long courseId) {
        return userService.courseCompletion(userid, courseId);

    }

    @GetMapping("/Coursecompleted/{userid}")
    public List<Courseinfo> courseCopmletedget(@PathVariable Long userid) {
        return userService.courseCompletioncount(userid);
    }

    @GetMapping("/Courseuncompleted/{userid}")
    public List<Courseinfo> courseunCopmletedget(@PathVariable Long userid) {
        return userService.courseunCompletioncount(userid);
    }

    @GetMapping("/sample")
    @PreAuthorize("hasAuthority('ROLE_User')")
    public String sample() {
        return "sample";
    }

    @GetMapping("/transaction/{amount}")
    public TransactionDetailsDTO startTransaction(@PathVariable float amount){
        return userService.startTransaction(amount);

    }


}