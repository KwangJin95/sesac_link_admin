package kr.sesaclink.domain.member.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class AdminMemberSignupDTO {
  private String id;

  private String pw;

  private String name;

  private String phone;

  private String email;

  private String profileThumbnail;

  private Integer adminAuthNo;

  private Integer memberStatusNo;

  // 기본값 설정
  public AdminMemberSignupDTO() {
    this.adminAuthNo = 2;     // PRE_ADMIN
    this.memberStatusNo = 1;  // ACTIVE
  }

}
