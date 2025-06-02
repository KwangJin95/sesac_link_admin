package kr.sesaclink.domain.course.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.campus.entity.Campus;
import lombok.*;

import java.time.LocalDate;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Integer courseNo;

  @Column(nullable = false)
  private String courseName;

  @Column(nullable = false)
  private String teacher;

  @Column(nullable = false)
  private LocalDate startDate;

  @Column(nullable = false)
  private LocalDate endDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "campus_no", nullable = false)
  private Campus campus;
}