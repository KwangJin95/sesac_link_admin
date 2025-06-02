package kr.sesaclink.domain.member.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class MemberFindPwDTO {
  private String id;

  private String pw;

  private String email;
}
