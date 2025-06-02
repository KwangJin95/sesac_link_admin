package kr.sesaclink.domain.notification.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.member.entity.UserMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserNotification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long userNotificationNo;

  @Column(nullable = false)
  private Boolean checked;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_no", nullable = false)
  private UserMember userMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "notification_no", nullable = false)
  private Notification notification;
}
