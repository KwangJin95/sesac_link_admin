package kr.sesaclink.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.sesaclink.domain.member.entity.UserMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PreUserDTO {
  private Long userNo;

  private String id;

  private String name;

  private String email;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime regDate;

  private Integer userAuthNo;

  private Integer campusNo;

  private Integer memberStatusNo;

  private String memberStatusNameKor;

  public PreUserDTO(UserMember userMember) {
    this.userNo = userMember.getUserNo();
    this.id = userMember.getId();
    this.name = userMember.getName();
    this.email = userMember.getEmail();
    this.regDate = userMember.getRegDate();
    this.userAuthNo = userMember.getUserAuth().getUserAuthNo();
    this.memberStatusNo = userMember.getMemberStatus().getMemberStatusNo();

    this.memberStatusNameKor = switch (this.memberStatusNo) {
      case 1 -> "활성화";
      case 2 -> "강제 탈퇴";
      case 3 -> "탈퇴";
      default -> "";
    };
  }
}
