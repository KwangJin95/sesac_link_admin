package kr.sesaclink.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.sesaclink.domain.member.entity.AdminMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
  private Long adminNo;

  private String id;

  private String name;

  private String phone;

  private String email;

  private String profileThumbnail;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime regDate;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime modDate;

  private Integer adminAuthNo;

  private Integer campusNo;

  private Integer memberStatusNo;

  private String authNameKor;

  public AdminDTO(AdminMember adminMember) {
    this.adminNo = adminMember.getAdminNo();
    this.id = adminMember.getId();
    this.name = adminMember.getName();
    this.phone = adminMember.getPhone();
    this.email = adminMember.getEmail();
    this.profileThumbnail = adminMember.getProfileThumbnail();
    this.regDate = adminMember.getRegDate();
    this.modDate = adminMember.getModDate();
    this.adminAuthNo = adminMember.getAdminAuth().getAdminAuthNo();
    this.campusNo = adminMember.getCampus().getCampusNo();
    this.memberStatusNo = adminMember.getMemberStatus().getMemberStatusNo();
    this.authNameKor = switch(this.adminAuthNo) {
      case 1 -> "관리자";
      case 3 -> "운영진";
      case 4 -> "잡코디";
      default -> "";
    };
  }
}
