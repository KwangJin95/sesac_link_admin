package kr.sesaclink.global.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Log4j2
@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class CustomSecurityConfig {

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {

    return (web) -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    // 인가 처리
    http.authorizeHttpRequests((auth) ->
      auth
              .requestMatchers("/",
                               "/login",
                               "/signup",
                               "/logout",
                               "/find-id",
                               "/find-pw",
                               "/api/**").permitAll()

              .anyRequest().authenticated()
    );

    // 다중 로그인 방지
    http.sessionManagement(session -> session
            .maximumSessions(1)              // 하나의 계정으로 하나의 세션만 허용
            .maxSessionsPreventsLogin(false) // true: 새 로그인 차단, false: 기존 세션 만료
            .expiredUrl("/login")            // 세션 만료 시 이동할 URL
    );

    // 로그인 설정
    http.formLogin((formLogin) ->
            formLogin
                    .loginPage("/login").permitAll()
                    .defaultSuccessUrl("/", true));

    // 로그아웃 설정
    http.logout((logout) ->
            logout.logoutUrl("/logout")
                  .logoutSuccessUrl("/")
                  .invalidateHttpSession(true)
                  .deleteCookies("JSESSIONID"));


    // csrf 설정
    http.csrf(auth -> auth.disable());

    return http.build();
  }

  @Primary
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}