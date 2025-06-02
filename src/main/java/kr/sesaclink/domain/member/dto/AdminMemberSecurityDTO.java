package kr.sesaclink.domain.member.dto;

import kr.sesaclink.domain.member.entity.AdminMember;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

@Getter
@Setter
@ToString
public class AdminMemberSecurityDTO extends User {
  private Long adminNo;

  private String id;

  private String pw;

  private String name;

  private String phone;

  private String email;

  private String profileThumbnail;

  private Integer campusNo;

  private String campusName;

  private String authName;

  private String authNameKor;

  public AdminMemberSecurityDTO(AdminMember adminMember) {

    super(adminMember.getId(), adminMember.getPw(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + adminMember.getAdminAuth().getAuthName())));
    this.adminNo = adminMember.getAdminNo();
    this.id = adminMember.getId();
    this.pw = adminMember.getPw();
    this.name = adminMember.getName();
    this.phone = adminMember.getPhone();
    this.email = adminMember.getEmail();
    this.profileThumbnail = adminMember.getProfileThumbnail() != null ?
            adminMember.getProfileThumbnail() : null;

    this.campusNo = adminMember.getCampus() != null ?
                      adminMember.getCampus().getCampusNo() : null;
    this.campusName = adminMember.getCampus() != null ?
                        adminMember.getCampus().getCampusName() : null;;
    this.authName = adminMember.getAdminAuth().getAuthName();

    // 권한 이름 한글 표시
    this.authNameKor = switch (adminMember.getAdminAuth().getAuthName()) {
      case "SUPER_ADMIN" -> "관리자";
      case "PRE_ADMIN" -> "예비 운영진";
      case "ADMIN" -> "운영진";
      case "JOB_COORDINATOR" -> "잡코디";
      default -> null;
    };
  }

}
