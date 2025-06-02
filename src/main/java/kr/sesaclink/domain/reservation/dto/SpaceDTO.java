package kr.sesaclink.domain.reservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.sesaclink.domain.reservation.entity.Space;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpaceDTO {
  private Integer spaceNo;

  private String spaceName;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime spaceAvailableStartTime;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime spaceAvailableEndTime;

  private Boolean beamProjector;

  private Integer peopleCount;

  private Boolean whiteBoard;

  private String spaceImage;

  private Long adminNo;

  private String adminName;

  private Integer campusNo;

  private LocalDateTime regDate;

  private LocalDateTime modDate;

  public SpaceDTO(Space space) {
    this.spaceNo = space.getSpaceNo();
    this.spaceName = space.getSpaceName();
    this.spaceAvailableStartTime = space.getSpaceAvailableStartTime();
    this.spaceAvailableEndTime = space.getSpaceAvailableEndTime();
    this.beamProjector = space.getBeamProjector();
    this.peopleCount = space.getPeopleCount();
    this.whiteBoard = space.getWhiteBoard();
    this.spaceImage = space.getSpaceImage();
    this.adminNo = space.getAdminMember().getAdminNo();
    this.adminName = space.getAdminMember().getName();
    this.campusNo = space.getCampus().getCampusNo();
    this.regDate = space.getRegDate();
    this.modDate = space.getModDate();
  }

}
