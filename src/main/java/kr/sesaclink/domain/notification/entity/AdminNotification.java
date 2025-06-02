package kr.sesaclink.domain.notification.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.member.entity.AdminMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AdminNotification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long adminNotificationNo;

  @Column(nullable = false)
  private Boolean checked;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_no", nullable = false)
  private AdminMember adminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "notification_no", nullable = false)
  private Notification notification;
}
