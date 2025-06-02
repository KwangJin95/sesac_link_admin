package kr.sesaclink.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobCoordinatorDTO {
  private Long adminNo;

  private String jobCoordinatorName;
}
