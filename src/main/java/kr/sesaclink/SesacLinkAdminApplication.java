package kr.sesaclink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SesacLinkAdminApplication {

  public static void main(String[] args) {
    SpringApplication.run(SesacLinkAdminApplication.class, args);
  }
}