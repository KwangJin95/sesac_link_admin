package kr.sesaclink.service;

import kr.sesaclink.domain.member.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailServiceTests {
    @Autowired
    private EmailService emailService;

    @Test
    public void sendVerificationCodeTest() {
        emailService.sendVerificationCode("dlsndifn98@gmail.com");
    }

    @Test
    public void verifyCodeTest() {
        //Given
        String testEmail = "dlsndifn98@gmail.com";
        String code = emailService.sendVerificationCode(testEmail);

        //When
        //boolean result = emailService.verifyCode(testEmail, code);

        //Then
        //assertTrue(result);

    }
}
