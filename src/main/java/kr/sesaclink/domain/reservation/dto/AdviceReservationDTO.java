package kr.sesaclink.domain.reservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.sesaclink.domain.reservation.entity.AdviceReservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdviceReservationDTO {
  private Long adviceReservationNo;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate resDate;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime startTime;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime endTime;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime regDate;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime modDate;

  private String adviceFile;

  private Integer reservationStatusNo;

  private String statusNameKor;

  // 학생
  private Long userNo;

  private String userName;

  private String userAuthNameKor;

  // 잡코디
  private Long jobAdminNo;

  private String jobAdminName;

  // 관리자
  private Long adminNo;

  private String adminName;

  private String adminAuthNameKor;

  // 예약 상태 변경인(운영진)
  private Long statusAdminNo;

  private String statusAdminName;

  private String statusAdminAuthNameKor;

  public AdviceReservationDTO(AdviceReservation adviceReservation) {
    this.adviceReservationNo = adviceReservation.getAdviceReservationNo();
    this.resDate = adviceReservation.getResDate();
    this.startTime = adviceReservation.getStartTime();
    this.endTime = adviceReservation.getEndTime();
    this.adviceFile = adviceReservation.getAdviceFile();
    this.regDate = adviceReservation.getRegDate();
    this.modDate = adviceReservation.getModDate();

    this.reservationStatusNo = adviceReservation.getReservationStatus().getReservationStatusNo();
    // 예약 상태 이름 한글 표시
    this.statusNameKor =
      switch (adviceReservation.getReservationStatus().getStatusName()) {
        case "APPLYING" -> "요청";
        case "REJECTED" -> "거절";
        case "APPROVED" -> "승인";
        case "CANCELED" -> "취소";
        default -> null;
    };

    if (adviceReservation.getUserMember() != null) {
      this.userNo = adviceReservation.getUserMember().getUserNo();
      this.userName = adviceReservation.getUserMember().getName();
      this.userAuthNameKor =
        switch (adviceReservation.getUserMember().getUserAuth().getAuthName()) {
          case "USER" -> "학생";
          case "PRE_USER" -> "예비 학생";
          default -> null;
      };
    }

    if (adviceReservation.getJobAdminMember() != null) {
        this.jobAdminNo = adviceReservation.getJobAdminMember().getAdminNo();
        this.jobAdminName = adviceReservation.getJobAdminMember().getName();
    }

    if (adviceReservation.getAdminMember() != null) {
      this.adminNo = adviceReservation.getAdminMember().getAdminNo();
      this.adminName = adviceReservation.getAdminMember().getName();
      this.adminAuthNameKor =
        switch (adviceReservation.getAdminMember().getAdminAuth().getAuthName()) {
          case "SUPER_ADMIN" -> "관리자";
          case "PRE_ADMIN" -> "예비 운영진";
          case "ADMIN" -> "운영진";
          case "JOB_COORDINATOR" -> "잡코디";
          default -> null;
      };
    }

    if (adviceReservation.getStatusAdminMember() != null) {
      this.statusAdminNo = adviceReservation.getStatusAdminMember().getAdminNo();
      this.statusAdminName = adviceReservation.getStatusAdminMember().getName();
      this.statusAdminAuthNameKor =
        switch (adviceReservation.getStatusAdminMember().getAdminAuth().getAuthName()) {
          case "SUPER_ADMIN" -> "관리자";
          case "PRE_ADMIN" -> "예비 운영진";
          case "ADMIN" -> "운영진";
          case "JOB_COORDINATOR" -> "잡코디";
          default -> null;
      };
    }
  }

}
