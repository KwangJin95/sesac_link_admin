package kr.sesaclink.domain.course.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.member.entity.UserMember;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserCourse {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long userCourseNo;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_no", nullable = false)
  private Course course;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_no", nullable = false)
  private UserMember userMember;
}