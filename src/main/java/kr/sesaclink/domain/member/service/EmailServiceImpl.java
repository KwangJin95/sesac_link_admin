package kr.sesaclink.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final JavaMailSender emailSender;

    // 이메일 인증 코드 발송
    @Override
    public String sendVerificationCode(String email) {
        String code = String.format("%06d", new Random().nextInt(1000000));

        // 메일 전송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[SeSAC Link] 인증 코드 발송");
        message.setText("인증 코드 : " + code);
        emailSender.send(message);

        return code;
    }

    // 수정 비밀번호 발송
    @Override
    public void sendUpdatePw(String email,
                             String pw) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[SeSAC Link] 재설정 비밀번호 발송");
        message.setText("비밀번호 : " + pw + "\n\n빠른 시일내에 수정 부탁드립니다.");

        emailSender.send(message);
    }

}

