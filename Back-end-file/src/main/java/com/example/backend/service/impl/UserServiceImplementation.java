package com.example.backend.service.impl;

import com.example.backend.Authentication.JwtService;
import com.example.backend.dto.CourseEnrolledDTO;
import com.example.backend.dto.TransactionDetailsDTO;
import com.example.backend.dto.UserDetailsDTO;
import com.example.backend.dto.UserInfoDTO;
import com.example.backend.entity.Courseinfo;
import com.example.backend.entity.CoursesEnrolled;
import com.example.backend.entity.Userinfo;
import com.example.backend.repository.CourseinfoRepository;
import com.example.backend.repository.CoursesEnrolledRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Rectangle;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {

    static final String key="rzp_test_gcrvZVGbOlteJ4";
    static final String key_secret="1OtTcEwm5gqRmbDhmalBrNIh";
    static final String currency="INR";
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseinfoRepository courseinfoRepository;
    @Autowired
    private CoursesEnrolledRepository coursesEnrolledRepository;
    @Autowired
    private JavaMailSender javaMailSender;
@Autowired
    JwtService jwtService;
@Autowired
    AuthenticationManager authenticationManager;
 @Autowired
 private PasswordEncoder encoder;



    @Override
    public UserDetailsDTO getusercourse(Long userid) {
        ModelMapper modelMapper = new ModelMapper();
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        Optional<Userinfo> user = userRepository.findById(userid);
        if (user.isEmpty()) {
            throw new RuntimeException("user not found");
        }
        userDetailsDTO.setUserinfo(user.get());
        List<CoursesEnrolled> allByUserInfoUserId = coursesEnrolledRepository.findAllByUserInfoUserId(userid);
        List<CourseEnrolledDTO> courseEnrolledDTOS = new ArrayList<>();
        allByUserInfoUserId.forEach(coursesEnrolled -> {
            CourseEnrolledDTO map = modelMapper.map(coursesEnrolled, CourseEnrolledDTO.class);

            courseEnrolledDTOS.add(map);
        });
        userDetailsDTO.setCourseEnrolled(courseEnrolledDTOS);
        return userDetailsDTO;
    }

    @Override
    public long admininsert(String coursename, String coursedescription, String language, String duration, String difficultylevel, float rating, float price, String authorname, String link) {
        Courseinfo course = new Courseinfo();
        course.setCoursename(coursename);
        course.setCoursedescription(coursedescription);
        course.setLanguage(language);
        course.setDuration(duration);
        course.setRating(rating);
        course.setPrice(price);
        course.setAuthorname(authorname);
        course.setLink(link);
        course.setDifficultyLevel(difficultylevel);
        courseinfoRepository.save(course);
        return course.getCourseId();
    }

    @Override
    public List<Courseinfo> getallcourse() {

        return courseinfoRepository.findAll();
    }

    @Override
    public Long deletecourse(Long courseId) {
        courseinfoRepository.deleteById(courseId);
        return courseId;
    }

    @Override
    public String enrollcourse(Long courseId, Long userid) {
        CoursesEnrolled coursesEnrolled1 = new CoursesEnrolled();
        coursesEnrolled1.setPaid(true);
        coursesEnrolled1.setEnrolledDate(new Date());
        coursesEnrolled1.setAccessedDate(new Date());
        coursesEnrolled1.setCourseCompleted("Uncompleted");
        Optional<Userinfo> userinfo = userRepository.findById(userid);


        if (userinfo.isEmpty()) {
            throw new RuntimeException("user not found");
        }
        coursesEnrolled1.setUserInfo(userinfo.get());

        Optional<Courseinfo> courseinfo = courseinfoRepository.findById(courseId);
        if (courseinfo.isEmpty()) {
            throw new RuntimeException("course not found");
        }
        Userinfo user = userinfo.get();
        Courseinfo course = courseinfo.get();
        coursesEnrolled1.setCourseInfo(courseinfo.get());
        coursesEnrolledRepository.save(coursesEnrolled1);
        sendEnrollEmail(user, course);
        return "done";

    }


    @Override
    public String access(Long userid, Long courseId) {
        Optional<CoursesEnrolled> enrollment = coursesEnrolledRepository.findByUserInfoUserIdAndCourseInfoCourseId(userid, courseId);
        Optional<Userinfo> userinfo = userRepository.findById(userid);
        if (userinfo.isEmpty()) {
            return "User not Found";
        }
        Optional<Courseinfo> courseinfo = courseinfoRepository.findById(courseId);
        if (courseinfo.isEmpty()) {
            return "Course not found";
        }
        if (enrollment.isPresent()) {
            return "Access granted";
        } else {
            return "Access denied";
        }
    }

    @Override
    public String editCourse(Long courseId, String authorname, String coursedescription, String coursename, String difficultylevel, String duration, String link, float price, float rating) {
        Optional<Courseinfo> edit = courseinfoRepository.findById(courseId);

        if (edit.isPresent()) {
            Courseinfo course = edit.get();
            course.setAuthorname(authorname);
            course.setCoursedescription(coursedescription);
            course.setCoursename(coursename);
            course.setDifficultyLevel(difficultylevel);
            course.setDuration(duration);
            course.setLink(link);
            course.setPrice(price);
            course.setRating(rating);

            courseinfoRepository.save(course);

            return "Course updated successfully";
        } else {
            return "Course not found";
        }
    }


    public void sendWelcomeEmail(Userinfo user) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("harismitaragupathy@gmail.com");
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("Welcome to Learning Platform");
        simpleMailMessage.setText("Hello " + user.getUserName() + ",\n\n"
                + "You are now registered on the Learning Platform. Start your learning journey today!\n\n"
                + "Best regards,\nLearning Platform Team");
        javaMailSender.send(simpleMailMessage);
    }

    private void sendEnrollEmail(Userinfo user, Courseinfo course) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("harismitaragupathy@gmail.com");
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Enrollment Confirmation for " + course.getCoursename());
        mailMessage.setText("Hello " + user.getUserName() + ",\n\n"
                + "You have successfully enrolled in the course: " + course.getCoursename() + ".\n"
                + "Course Details:\n"
                + "Course Name: " + course.getCoursename() + "\n"
                + "Course Description: " + course.getCoursedescription() + "\n"
                + "Enrollment Date: " + new Date() + "\n\n"
                + "Start your learning journey today!\n\n"
                + "Best regards,\nLearning Platform Team");

        javaMailSender.send(mailMessage);
    }


    @Override
    public Optional<Courseinfo> getCourseInfo(Long courseId) {
        Optional<Courseinfo> course = courseinfoRepository.findById(courseId);
        return course;

    }

    @Override
    public String courseCompletion(Long userid, Long courseId) {
        Optional<CoursesEnrolled> course = coursesEnrolledRepository.findByUserInfoUserIdAndCourseInfoCourseId(userid, courseId);
        Optional<Userinfo> user = userRepository.findById(userid);
        Optional<Courseinfo> coursename1 = courseinfoRepository.findById(courseId);
        Courseinfo coursename = coursename1.get();
        Userinfo useridget = user.get();
        if (course.isPresent()) {
            CoursesEnrolled courseCompleted = course.get();
            courseCompleted.setCourseCompleted("Completed");
            coursesEnrolledRepository.save(courseCompleted);

            byte[] certificateBytes = generateCertificate(useridget.getUserName(), coursename.getCoursename());
            sendCertificateViaEmail(userid, certificateBytes);

            return "Course Completed. The Certificate has been Sent";
        }
        return "User is not enrolled in this course";
    }

    public byte[] generateCertificate(String studentName, String courseName) {
        Document document = new Document(PageSize.A4.rotate());

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {


            PdfWriter writer = PdfWriter.getInstance(document, baos);
            document.open();

            PdfContentByte contentByteBorder = writer.getDirectContent();

            float x = 40;
            float y = 40;
            float width = document.getPageSize().getWidth()-80;
            float height = document.getPageSize().getHeight()-80;

// Set the border color and width
            contentByteBorder.setColorStroke(new Color(0,0,0));
            contentByteBorder.setLineWidth(2);

// Draw the rectangle
            contentByteBorder.rectangle(x, y, width, height);
            contentByteBorder.stroke();

            PdfPTable table = new PdfPTable(1);
            table.setWidthPercentage(100);

            PdfPCell imageCell = new PdfPCell();
            Image image = Image.getInstance("/Desktop/git/git/learning-platform/Back-end-file/backend/src/main/java/com/example/backend/Brocodelogo.png");
            image.scaleAbsolute(document.getPageSize().getWidth() * 0.25f, document.getPageSize().getHeight() * 0.125f);
            imageCell.addElement(image);
            imageCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            imageCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            imageCell.setBorder(Rectangle.NO_BORDER);
            table.addCell(imageCell);

            PdfPCell textCell = new PdfPCell();
            textCell.setBorder(Rectangle.NO_BORDER);
            textCell.setHorizontalAlignment(Element.ALIGN_CENTER);

            Paragraph certificateText = new Paragraph();
            certificateText.setAlignment(Element.ALIGN_CENTER);
            certificateText.setSpacingAfter(15);
            certificateText.add(new Chunk("Certificate of Completion", new Font(Font.HELVETICA, 36, Font.BOLD, new Color(255, 215, 0))));
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(Chunk.NEWLINE);

            certificateText.add(new Chunk("This is to certify that", new Font(Font.HELVETICA, 20, Font.NORMAL, new Color(0, 0, 0))));

            certificateText.add(Chunk.NEWLINE);
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(new Chunk(studentName, new Font(Font.HELVETICA, 26, Font.BOLD, new Color(0, 0, 0))));
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(new Chunk("has successfully completed the course", new Font(Font.HELVETICA, 20, Font.NORMAL, new Color(0, 0, 0))));
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(Chunk.NEWLINE);
            certificateText.add(new Chunk(courseName, new Font(Font.HELVETICA, 26, Font.BOLD, new Color(0, 128, 0))));
            textCell.addElement(certificateText);

            textCell.setPaddingTop(30);
            textCell.setPaddingLeft(50);

            table.addCell(textCell);

            document.add(table);

            // Add transparent watermark
            PdfContentByte contentByte = writer.getDirectContentUnder();
            PdfGState gs = new PdfGState();
            gs.setFillOpacity(0.2f);
            contentByte.setGState(gs);

            BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.WINANSI, BaseFont.EMBEDDED);
            contentByte.beginText();
            contentByte.setFontAndSize(bf, 70);
            contentByte.setColorFill(new Color(192, 192, 192));

            contentByte.showTextAligned(Element.ALIGN_CENTER, "BROCODE", document.getPageSize().getWidth()/2 , document.getPageSize().getHeight()/2, 45);

            contentByte.endText();

            PdfContentByte contentByteSign = writer.getDirectContentUnder();

            PdfGState gs1 = new PdfGState();
            gs1.setFillOpacity(2f);

            contentByteSign.setGState(gs1);

            Image signatureImage1 = Image.getInstance("/Desktop/git/git/learning-platform/Back-end-file/backend/src/main/java/com/example/backend/HarisSign.jpeg");
            signatureImage1.scaleAbsolute(100, 50);
            signatureImage1.setAbsolutePosition(150, 100);
            document.add(signatureImage1);

            BaseFont bf1 = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.WINANSI, BaseFont.EMBEDDED);
            contentByteSign.beginText();
            contentByteSign.setFontAndSize(bf1, 18);
            contentByteSign.setColorFill(new Color(0, 0, 0 ));
            contentByteSign.showTextAligned(Element.ALIGN_CENTER, "Harismita",  200, 70, 0);
            contentByteSign.showTextAligned(Element.ALIGN_CENTER, "(Director)", 200, 50, 0);
            contentByteSign.endText();


            Image signatureImage2 = Image.getInstance("/Desktop/git/git/learning-platform/Back-end-file/backend/src/main/java/com/example/backend/NickSign.jpeg");
            signatureImage2.scaleAbsolute(100, 50);
            signatureImage2.setAbsolutePosition(600, 100);
            document.add(signatureImage2);

            contentByteSign.beginText();
            contentByteSign.setFontAndSize(bf1, 18);
            contentByteSign.setColorFill(new Color(0, 0, 0 ));
            contentByteSign.showTextAligned(Element.ALIGN_CENTER, "Alnickson", 650, 70, 0);
            contentByteSign.showTextAligned(Element.ALIGN_CENTER, "(Co-ordinator)", 650, 50, 0);
            contentByteSign.endText();




            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return baos.toByteArray();
    }
    public void sendCertificateViaEmail(Long userId, byte[] certificateBytes) {
        Optional<Userinfo> userinfo = userRepository.findById(userId);
        if (userinfo.isPresent()) {
            MimeMessage message = javaMailSender.createMimeMessage();
            try {
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
                helper.setSubject("Certificate of Completion");
                helper.setText("Congratulations! You have successfully completed the course.");
                helper.setTo(userinfo.get().getEmail());
                helper.setFrom("harismitaragupathy@gmail.com");

                helper.addAttachment("Certificate.pdf", new ByteArrayResource(certificateBytes));

                javaMailSender.send(message);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }


    @Override
    public List<Courseinfo> courseCompletioncount(Long userid) {
        List<Courseinfo> courseCompleted = new ArrayList<>();

        List<CoursesEnrolled> coursesEnrolledList = coursesEnrolledRepository.findByUserInfoUserIdAndCourseCompleted(userid, "Completed");

        for (CoursesEnrolled coursesEnrolled : coursesEnrolledList) {
            Courseinfo completedCourse = coursesEnrolled.getCourseInfo();
            courseCompleted.add(completedCourse);
        }

        return courseCompleted;
    }

    @Override
    public List<Courseinfo> courseunCompletioncount(Long userid) {
        List<Courseinfo> courseCompleted = new ArrayList<>();

        List<CoursesEnrolled> coursesEnrolledList = coursesEnrolledRepository.findByUserInfoUserIdAndCourseCompleted(userid, "Uncompleted");

        for (CoursesEnrolled coursesEnrolled : coursesEnrolledList) {
            Courseinfo completedCourse = coursesEnrolled.getCourseInfo();
            courseCompleted.add(completedCourse);
        }

        return courseCompleted;
    }

    @Override
    public String AddUser(UserInfoDTO userInfoDTO) {

        Optional<Userinfo> admin=userRepository.findByEmail(userInfoDTO.getEmail());
         
        
    //    if(admin.isEmpty())
    //    {

    //        Userinfo admin1=new Userinfo();
    //        admin1.setUserName(userInfoDTO.getUserName());
    //        admin1.setEmail(userInfoDTO.getEmail());
    //        admin1.setRole("Admin");
    //        admin1.setPassword(encoder.encode(userInfoDTO.getPassword()));
    //        userRepository.save(admin1);

    //    }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userInfoDTO.getEmail(),userInfoDTO.getPassword() ));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(userInfoDTO.getEmail());
        } else {
            return "Admin not Found";
        }
    }

    @Override
    public TransactionDetailsDTO startTransaction(float amount){
        try {
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("amount",(amount*100));
            jsonObject.put("currency",currency);
            // jsonObject.put("key",key);
            RazorpayClient razorpayClient = new RazorpayClient(key,key_secret);
            Order order= razorpayClient.orders.create(jsonObject);
            //System.out.println(order);
            TransactionDetailsDTO transactionDetailsDTO=processTransactionDetails(order);

            return transactionDetailsDTO;
        }
        catch(Exception e){
            System.out.println(e.getMessage());
//        System.out.println("here");
        }
        return null;

    }

    public TransactionDetailsDTO processTransactionDetails(Order order){
        String orderId=order.get("id");
        String currency=order.get("currency");
        Integer amount=order.get("amount");

        TransactionDetailsDTO transactionDetailsDTO=new TransactionDetailsDTO(orderId,currency,amount,key);
        return transactionDetailsDTO;
    }



}
