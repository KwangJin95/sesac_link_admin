package kr.sesaclink.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminRegisterDTO {
  private String id;

  private String pw;

  private String name;

  private String phone;

  private String email;

  private Integer adminAuthNo;

  private Integer campusNo;

  @Builder.Default
  private Integer memberStatusNo = 1;
}
