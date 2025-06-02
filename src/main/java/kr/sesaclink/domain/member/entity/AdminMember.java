package kr.sesaclink.domain.member.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.global.entity.BaseEntity;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class AdminMember extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long adminNo;

  @Column(nullable = false, length = 50)
  private String id;

  @Column(nullable = false)
  private String pw;

  @Column(nullable = false, length = 30)
  private String name;

  @Column(nullable = false, length = 15)
  private String phone;

  @Column(nullable = false, length = 320)
  private String email;

  @Column
  private String profileThumbnail;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_auth_no", nullable = false)
  private AdminAuth adminAuth;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_status_no", nullable = false)
  private MemberStatus memberStatus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "campus_no")
  private Campus campus;

  // 비밀번호 재설정
  public void changePw(String pw) {
    this.pw = pw;
  }

  // 이름 변경
  public void changeName(String name) {
    this.name = name;
  }

  // 핸드폰 번호 변경
  public void changePhone(String phone) {
    this.phone = phone;
  }
  
  // 이메일 변경
  public void changeEmail(String email) {
    this.email = email;
  }
  
  // 프로필 사진 변경
  public void changeProfileThumbnail(String profileThumbnail) {
    this.profileThumbnail = profileThumbnail;
  }

  // 회원 상태 변경
  public void changeMemberStatus(MemberStatus memberStatus) {
    this.memberStatus = memberStatus;
  }

  // 회원 캠퍼스 변경
  public void changeCampus(Campus campus) {
    this.campus = campus;
  }

  // 회원 권한 변경
  public void changeAdminAuth(AdminAuth adminAuth) {
    this.adminAuth = adminAuth;
  }

}
