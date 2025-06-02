package kr.sesaclink.domain.qna.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.member.entity.UserMember;
import kr.sesaclink.global.entity.BaseEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class Question extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private Long questionNo;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String content;

  @Column(nullable = false)
  private Boolean secret;

  @Column(nullable = false)
  private Boolean replied;

  @Column(nullable = false)
  @ColumnDefault("0")
  @Builder.Default
  private Integer view = 0;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_no", nullable = false)
  private UserMember userMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "campus_no", nullable = false)
  private Campus campus;

  // 제목 수정
  public void changeTitle(String title) {
    this.title = title;
  }

  // 내용 수정
  public void changeContent(String content) {
    this.content = content;
  }
  
  // 비밀글 여부 수정
  public void changeSecret(boolean secret) {
    this.secret = secret;
  }
}
