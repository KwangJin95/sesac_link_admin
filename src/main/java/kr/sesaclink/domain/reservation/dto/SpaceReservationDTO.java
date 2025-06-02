package kr.sesaclink.domain.reservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.sesaclink.domain.reservation.entity.SpaceReservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpaceReservationDTO {
  private Long spaceReservationNo;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate resDate;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime startTime;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime endTime;

  private Integer peopleCount;

  private String purpose;

  private Integer reservationStatusNo;

  private String statusNameKor;

  // 학생
  private Long userNo;

  private String userName;

  private String userAuthNameKor;

  // 예약 운영진
  private Long adminNo;

  private String adminName;

  private String adminAuthNameKor;

  // 예약 상태 변경인(운영진)
  private Long statusAdminNo;

  private String statusAdminName;

  private String statusAdminAuthNameKor;

  public SpaceReservationDTO(SpaceReservation spaceReservation) {
    this.spaceReservationNo = spaceReservation.getSpaceReservationNo();
    this.resDate = spaceReservation.getResDate();
    this.startTime = spaceReservation.getStartTime();
    this.endTime = spaceReservation.getEndTime();
    this.peopleCount = spaceReservation.getPeopleCount();
    this.purpose = spaceReservation.getPurpose();

    this.reservationStatusNo = spaceReservation.getReservationStatus().getReservationStatusNo();
    // 예약 상태 이름 한글 표시
    this.statusNameKor =
      switch (spaceReservation.getReservationStatus().getStatusName()) {
        case "APPLYING" -> "요청";
        case "REJECTED" -> "거절";
        case "APPROVED" -> "승인";
        case "CANCELED" -> "취소";
        default -> null;
    };

    if (spaceReservation.getUserMember() != null) {
      this.userNo = spaceReservation.getUserMember().getUserNo();
      this.userName = spaceReservation.getUserMember().getName();
      this.userAuthNameKor =
        switch (spaceReservation.getUserMember().getUserAuth().getAuthName()) {
          case "USER" -> "학생";
          case "PRE_USER" -> "예비 학생";
          default -> null;
      };
    }

    if (spaceReservation.getAdminMember() != null) {
      this.adminNo = spaceReservation.getAdminMember().getAdminNo();
      this.adminName = spaceReservation.getAdminMember().getName();
      this.adminAuthNameKor =
        switch (spaceReservation.getAdminMember().getAdminAuth().getAuthName()) {
          case "SUPER_ADMIN" -> "관리자";
          case "PRE_ADMIN" -> "예비 운영진";
          case "ADMIN" -> "운영진";
          case "JOB_COORDINATOR" -> "잡코디";
          default -> null;
      };
    }

    if (spaceReservation.getStatusAdminMember() != null) {
      this.statusAdminNo = spaceReservation.getStatusAdminMember().getAdminNo();
      this.statusAdminName = spaceReservation.getStatusAdminMember().getName();
      this.statusAdminAuthNameKor =
        switch (spaceReservation.getStatusAdminMember().getAdminAuth().getAuthName()) {
          case "SUPER_ADMIN" -> "관리자";
          case "PRE_ADMIN" -> "예비 운영진";
          case "ADMIN" -> "운영진";
          case "JOB_COORDINATOR" -> "잡코디";
          default -> null;
      };
    }
  }

}
