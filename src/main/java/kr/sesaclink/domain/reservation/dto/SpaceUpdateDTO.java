package kr.sesaclink.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpaceUpdateDTO {
  private Integer spaceNo;

  private String spaceName;

  private LocalTime spaceAvailableStartTime;

  private LocalTime spaceAvailableEndTime;

  private Boolean beamProjector;

  private Integer peopleCount;

  private Boolean whiteBoard;

}
