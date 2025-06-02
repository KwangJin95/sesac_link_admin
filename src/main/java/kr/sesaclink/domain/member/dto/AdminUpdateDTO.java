package kr.sesaclink.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUpdateDTO {
  private Long adminNo;

  private String email;

  private String profileThumbnail;

  private String name;

  private String phone;

  private String pw;

  private Integer adminAuthNo;

}
