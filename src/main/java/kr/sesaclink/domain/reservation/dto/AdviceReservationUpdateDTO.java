package kr.sesaclink.domain.reservation.dto;

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
public class AdviceReservationUpdateDTO {
  private Long adviceReservationNo;

  private LocalDate resDate;

  private LocalTime startTime;

  private LocalTime endTime;

  private Integer reservationStatusNo;

  // 잡코디
  private Long jobAdminNo;

  // 예약 상태 변경인(운영진)
  private Long statusAdminNo;
}
