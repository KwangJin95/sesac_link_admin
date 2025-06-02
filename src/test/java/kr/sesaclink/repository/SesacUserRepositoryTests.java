package kr.sesaclink.repository;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class SesacUserRepositoryTests {

    /*
    @Autowired
    SesacUserRepository sesacUserRepository;

    @Test
    @Transactional
    public void testFindSesacUserByEmail() {

        String email = "rhkdwls95@gmail.com";

        SesacUser sesacUser = sesacUserRepository.findByEmail(email).orElseThrow();

        log.info("아이디 : {}", sesacUser.getId());
        log.info("이름 : {}", sesacUser.getName());
        log.info("주소 : {}", sesacUser.getAddress());
        log.info("휴대폰 번호 : {}", sesacUser.getPhoneNumber());
        log.info("캠퍼스명 : {}", sesacUser.getCampus().getName());
    }

     */
}
