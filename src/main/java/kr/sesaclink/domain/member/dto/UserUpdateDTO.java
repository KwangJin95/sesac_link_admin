package kr.sesaclink.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
  private Long userNo;

  private String email;

  private String name;

  private String phone;

  private String address;

  private String detailAddress;

  private String profileThumbnail;

  private String pw;

  private Long adminNo;
}
