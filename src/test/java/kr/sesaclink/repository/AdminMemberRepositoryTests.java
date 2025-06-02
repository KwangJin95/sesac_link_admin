package kr.sesaclink.repository;

import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.campus.repository.CampusRepository;
import kr.sesaclink.domain.member.entity.AdminAuth;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.member.entity.MemberStatus;
import kr.sesaclink.domain.member.repository.AdminAuthRepository;
import kr.sesaclink.domain.member.repository.AdminMemberRepository;
import kr.sesaclink.domain.member.repository.MemberStatusRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@Log4j2
public class AdminMemberRepositoryTests {

  @Autowired
  CampusRepository campusRepository;

  @Autowired
  AdminAuthRepository adminAuthRepository;

  @Autowired
  MemberStatusRepository memberStatusRepository;

  @Autowired
  AdminMemberRepository adminMemberRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  // 회원 등록
  @Test
  public void testAdminMemberRegister() {
    Campus campus = campusRepository.findById(14).orElseThrow();
    MemberStatus memberStatus = memberStatusRepository.findById(1).orElseThrow();
    AdminAuth adminAuth = adminAuthRepository.findById(1).orElseThrow();

    AdminMember admin = AdminMember.builder()
            .id("test1")
            .pw(passwordEncoder.encode("1111"))
            .name("tester1")
            .memberStatus(memberStatus)
            .phone("01012345678")
            .email("test@gmail.com")
            .adminAuth(adminAuth)
            .campus(campus)
            .build();
    adminMemberRepository.save(admin);
  }

  // 아이디 중복 확인
  @Test
  public void testIdCheck() {
    boolean isAvailable = !adminMemberRepository.existsById("test1");
    log.info("isAvailable: " + isAvailable);
  }
  
  // 이메일 중복 확인
  @Test
  public void testEmailCheck() {
    boolean isAvailable = !adminMemberRepository.existsByEmail("test@gmail.com");
    log.info("isAvailable: " + isAvailable);
  }

  // 비밀번호 확인
  @Test
  public void testPwCheck() {
    String pw = adminMemberRepository.getPwByAdminNo(14L);
    log.info("pw: " + pw);
  }

  // 아이디, 이메일 매칭 확인
  @Test
  public void testIdWithEmailCheck() {
    boolean idEmailchecked = adminMemberRepository.existsByIdAndEmail("eeeee", "rhkdwls95@naver.com");
    log.info("idEmailchecked: " + idEmailchecked);
  }
}
