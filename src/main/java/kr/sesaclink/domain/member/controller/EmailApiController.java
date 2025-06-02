package kr.sesaclink.domain.member.controller;

import kr.sesaclink.domain.member.service.EmailService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@Log4j2
public class EmailApiController {

    private final EmailService emailService;

    // 이메일 인증 코드 전송
    @PostMapping("/send-code")
    public String sendCode(@RequestParam String email) {
        return emailService.sendVerificationCode(email);
    }
}