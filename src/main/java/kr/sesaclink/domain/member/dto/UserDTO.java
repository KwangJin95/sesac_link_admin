package kr.sesaclink.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.sesaclink.domain.course.entity.Course;
import kr.sesaclink.domain.member.entity.UserMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
  private Long userNo;

  private String id;

  private String name;

  private String phone;

  private String email;

  private String address;

  private String detailAddress;

  private String profileThumbnail;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime regDate;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime modDate;

  private Integer userAuthNo;

  private Integer memberStatusNo;

  private Integer campusNo;

  private Long adminNo;

  private String jobCoordinatorName;

  @Builder.Default
  private List<Course> courseList = new ArrayList<>();

  public UserDTO(UserMember userMember) {
    this.userNo = userMember.getUserNo();
    this.id = userMember.getId();
    this.name = userMember.getName();
    this.phone = userMember.getPhone();
    this.email = userMember.getEmail();
    this.address = userMember.getAddress();
    this.detailAddress = userMember.getDetailAddress();
    this.profileThumbnail = userMember.getProfileThumbnail();
    this.regDate = userMember.getRegDate();
    this.modDate = userMember.getModDate();
    this.userAuthNo = userMember.getUserAuth().getUserAuthNo();
    this.memberStatusNo = userMember.getMemberStatus().getMemberStatusNo();
    this.campusNo = userMember.getCampus().getCampusNo();

    if (userMember.getAdminMember() != null) {
      this.adminNo = userMember.getAdminMember().getAdminNo();
      this.jobCoordinatorName = userMember.getAdminMember().getName();
    }
  }

  // 강좌 목록 add
  public void addCourse(Course course) {
    if (this.courseList == null) {
      this.courseList = new ArrayList<>();

      if (course != null) {
        this.courseList.add(course);
      }
    }
  }
}
