package kr.sesaclink.domain.reservation.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.member.entity.UserMember;
import kr.sesaclink.domain.reservation.dto.SpaceReservationRegisterDTO;
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
public class SpaceReservation extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long spaceReservationNo;

  @Column(nullable = false)
  private LocalDate resDate;

  @Column(nullable = false)
  private LocalTime startTime;

  @Column(nullable = false)
  private LocalTime endTime;

  @Column(nullable = false)
  private String purpose;

  @Column(nullable = false)
  private Integer peopleCount;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_no")
  private UserMember userMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "space_no", nullable = false)
  private Space space;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reservation_status_no", nullable = false)
  private ReservationStatus reservationStatus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_no")
  private AdminMember adminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "status_admin_no")
  private AdminMember statusAdminMember;

  public SpaceReservation(SpaceReservationRegisterDTO spaceReservationRegisterDTO) {
    this.resDate = spaceReservationRegisterDTO.getResDate();
    this.startTime = spaceReservationRegisterDTO.getStartTime();
    this.endTime = spaceReservationRegisterDTO.getEndTime();
    this.purpose = spaceReservationRegisterDTO.getPurpose();
    this.peopleCount = spaceReservationRegisterDTO.getPeopleCount();
    this.space = Space.builder()
            .spaceNo(spaceReservationRegisterDTO.getSpaceNo())
            .build();
    this.adminMember = AdminMember.builder()
            .adminNo(spaceReservationRegisterDTO.getAdminNo())
            .build();
    this.reservationStatus = ReservationStatus.builder()
            .reservationStatusNo(spaceReservationRegisterDTO.getReservationStatusNo())
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
