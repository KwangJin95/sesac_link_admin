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
public class SpaceReservationRegisterDTO {

  private LocalDate resDate;

  private LocalTime startTime;

  private LocalTime endTime;

  private Integer peopleCount;

  private String purpose;

  private Long adminNo;

  private Integer spaceNo;

  private Integer reservationStatusNo;

}
