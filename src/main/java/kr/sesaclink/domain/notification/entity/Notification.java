package kr.sesaclink.domain.notification.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Notification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long notificationNo;

  @Column(nullable = false)
  private String content;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime regDate;

  @Column
  private String url;

  @Column
  private String type;
}
