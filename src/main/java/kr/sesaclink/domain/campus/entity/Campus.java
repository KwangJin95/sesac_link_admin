package kr.sesaclink.domain.campus.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Campus {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Integer campusNo;

  @Column(nullable = false, length = 30)
  private String campusName;
}
