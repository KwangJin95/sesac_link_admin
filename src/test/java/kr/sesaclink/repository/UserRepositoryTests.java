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
public class UserRepositoryTests {

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
  public void userRegisterTest() {
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

  /*
  // 회원 등록
  @Test
  public void userRegisterTest() {
    Campus campus = campusRepository.findById(2).orElseThrow();

    UserMember user = UserMember.builder()
        .id("test1")
        .pw("1234")
        .name("tester1")
        .address("서울시 영등포구")
        .phoneNumber("010-1234-5678")
        .email("test@gmail.com")
        .role(0)
        .campus(campus)
        .build();
    userRepository.save(user);
  }
  
  // 나의 정보 조회
  @Test
  @Transactional
  public void myUserReadTest() {

    log.info(userRepository.findUserWithCampus(9L).orElseThrow());
  }

   */
}
