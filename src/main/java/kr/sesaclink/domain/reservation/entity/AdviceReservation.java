package kr.sesaclink.domain.reservation.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.member.entity.UserMember;
import kr.sesaclink.domain.reservation.dto.AdviceReservationRegisterDTO;
import kr.sesaclink.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AdviceReservation extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long adviceReservationNo;

  @Column(nullable = false)
  private LocalDate resDate;

  @Column(nullable = false)
  private LocalTime startTime;

  @Column(nullable = false)
  private LocalTime endTime;

  @Column
  private String adviceFile;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_no")
  private UserMember userMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "job_admin_no", nullable = false)
  private AdminMember jobAdminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_no")
  private AdminMember adminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reservation_status_no", nullable = false)
  private ReservationStatus reservationStatus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "status_admin_no")
  private AdminMember statusAdminMember;

  public AdviceReservation(AdviceReservationRegisterDTO adviceReservationRegisterDTO) {
    this.resDate = adviceReservationRegisterDTO.getResDate();
    this.startTime = adviceReservationRegisterDTO.getStartTime();
    this.endTime = adviceReservationRegisterDTO.getEndTime();

    this.jobAdminMember = AdminMember.builder()
            .adminNo(adviceReservationRegisterDTO.getJobAdminNo())
            .build();
    this.adminMember = AdminMember.builder()
            .adminNo(adviceReservationRegisterDTO.getAdminNo())
            .build();
    this.reservationStatus = ReservationStatus.builder()
            .reservationStatusNo(adviceReservationRegisterDTO.getReservationStatusNo())
            .build();
  }

  // 예약 상태 변경
  public void changeReservationStatus(Integer reservationStatusNo) {
    this.reservationStatus = ReservationStatus.builder()
            .reservationStatusNo(reservationStatusNo)
            .build();
  }
  // 예약 관리자 변경
  public void changeStatusAdminMember(Long adminNo) {
    this.statusAdminMember = AdminMember.builder()
            .adminNo(adminNo)
            .build();
  }

}
