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
public class PreAdminDTO {
  private Long adminNo;

  private String id;

  private String name;

  private String email;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime regDate;

  private Integer adminAuthNo;

  private Integer campusNo;

  private Integer memberStatusNo;

  private String memberStatusNameKor;

  public PreAdminDTO(AdminMember adminMember) {
    this.adminNo = adminMember.getAdminNo();
    this.id = adminMember.getId();
    this.name = adminMember.getName();
    this.email = adminMember.getEmail();
    this.regDate = adminMember.getRegDate();
    this.adminAuthNo = adminMember.getAdminAuth().getAdminAuthNo();
    this.memberStatusNo = adminMember.getMemberStatus().getMemberStatusNo();

    this.memberStatusNameKor = switch (this.memberStatusNo) {
      case 1 -> "활성화";
      case 2 -> "강제 탈퇴";
      case 3 -> "탈퇴";
      default -> "";
    };
  }
}
