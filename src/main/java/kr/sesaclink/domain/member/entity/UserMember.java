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
public class UserMember extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long userNo;

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

  @Column(nullable = false)
  private String address;

  @Column(nullable = false)
  private String detailAddress;

  @Column
  private String profileThumbnail;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_auth_no", nullable = false)
  private UserAuth userAuth;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_status_no", nullable = false)
  private MemberStatus memberStatus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "campus_no")
  private Campus campus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_no")
  private AdminMember adminMember;

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
  // 주소 변경
  public void changeAddress(String address) {
    this.address = address;
  }
  // 상세 주소 변경
  public void changeDetailAddress(String detailAddress) {
    this.detailAddress = detailAddress;
  }
  // 프로필 사진 변경
  public void changeProfileThumbnail(String profileThumbnail) {
    this.profileThumbnail = profileThumbnail;
  }
  // 권한 변경
  public void changeUserAuth(UserAuth userAuth) {
    this.userAuth = userAuth;
  }
  // 상태 변경
  public void changeMemberStatus(MemberStatus memberStatus) {
    this.memberStatus = memberStatus;
  }
  // 캠퍼스 변경
  public void changeCampus(Campus campus) {
    this.campus = campus;
  }
  // 잡코디 변경
  public void changeAdminMember(AdminMember adminMember) {
    this.adminMember = adminMember;
  }
}
