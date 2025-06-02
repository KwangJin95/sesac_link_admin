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
public class SpaceReservationUpdateDTO {
  private Long spaceReservationNo;

  private LocalDate resDate;

  private LocalTime startTime;

  private LocalTime endTime;

  private Integer reservationStatusNo;

  // 예약 상태 변경인(운영진)
  private Long statusAdminNo;
  
  // 공간 번호
  private Integer spaceNo;
}
