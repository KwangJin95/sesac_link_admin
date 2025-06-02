package kr.sesaclink.domain.sesac.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.course.entity.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SesacUserCourse {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long SesacUserCourseNo;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sesac_user_no", nullable = false)
  private SesacUserMember sesacUserMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_no", nullable = false)
  private Course course;
}