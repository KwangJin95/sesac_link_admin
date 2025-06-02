package kr.sesaclink.domain.qna.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.member.entity.UserMember;
import kr.sesaclink.global.entity.BaseEntity;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Answer extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long answerId;

  @Column(nullable = false)
  @Lob
  private String content;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_id", nullable = false)
  private Question question;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_no", nullable = false)
  private UserMember user;
  
  // 내용 수정
  public void changeContent(String content) {
    this.content = content;
  }
}
