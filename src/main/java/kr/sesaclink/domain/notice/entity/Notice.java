package kr.sesaclink.domain.notice.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.global.entity.BaseEntity;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Notice extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long noticeNo;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  @Lob
  private String content;

  @Column(nullable = false)
  private Integer view;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_no", nullable = false)
  private AdminMember adminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "campus_no")
  private Campus campus;

  public void changeTitle(String title) {
    this.title = title;
  }

  public void changeContent(String content) {
    this.content = content;
  }
}
