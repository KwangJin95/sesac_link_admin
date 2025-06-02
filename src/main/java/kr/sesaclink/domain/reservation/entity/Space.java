package kr.sesaclink.domain.reservation.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.reservation.dto.SpaceRegisterDTO;
import kr.sesaclink.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Space extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Integer spaceNo;

  @Column(nullable = false)
  private String spaceName;

  @Column(nullable = false)
  private LocalTime spaceAvailableStartTime;

  @Column(nullable = false)
  private LocalTime spaceAvailableEndTime;

  @Column(nullable = false)
  private Boolean beamProjector;

  @Column(nullable = false)
  private Integer peopleCount;

  @Column(nullable = false)
  private Boolean whiteBoard;

  private String spaceImage;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "campus_no", nullable = false)
  private Campus campus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_no", nullable = false)
  private AdminMember adminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "space_status_no", nullable = false)
  private SpaceStatus spaceStatus;

  public Space(SpaceRegisterDTO spaceRegisterDTO) {
    this.spaceName = spaceRegisterDTO.getSpaceName();
    this.spaceAvailableStartTime = spaceRegisterDTO.getSpaceAvailableStartTime();
    this.spaceAvailableEndTime = spaceRegisterDTO.getSpaceAvailableEndTime();
    this.beamProjector = spaceRegisterDTO.getBeamProjector();
    this.peopleCount = spaceRegisterDTO.getPeopleCount();
    this.whiteBoard = spaceRegisterDTO.getWhiteBoard();
    this.spaceImage = spaceRegisterDTO.getSpaceImage();
    this.campus = Campus.builder().campusNo(spaceRegisterDTO.getCampusNo()).build();
    this.adminMember = AdminMember.builder().adminNo(spaceRegisterDTO.getAdminNo()).build();
  }
  
  // 공간 이름 변경
  public void changeSpaceName(String spaceName) {
    this.spaceName = spaceName;
  }
  // 시작 시간 변경
  public void changeSpaceAvailableStartTime(LocalTime spaceAvailableStartTime) {
    this.spaceAvailableStartTime = spaceAvailableStartTime;
  }
  // 종료 시간 변경
  public void changeSpaceAvailableEndTime(LocalTime spaceAvailableEndTime) {
    this.spaceAvailableEndTime = spaceAvailableEndTime;
  }
  // 빔프로젝터 변경
  public void changeBeamProjector(Boolean beamProjector) {
    this.beamProjector = beamProjector;
  }
  // 인원수 변경
  public void changePeopleCount(Integer peopleCount) {
    this.peopleCount = peopleCount;
  }
  // 화이트보드 변경
  public void changeWhiteBoard(Boolean whiteBoard) {
    this.whiteBoard = whiteBoard;
  }
  // 공간 이미지 변경
  public void changeSpaceImage(String spaceImage) {
    this.spaceImage = spaceImage;
  }
  // 공간 상태 변경
  public void changeSpaceStatus(SpaceStatus spaceStatus) {
    this.spaceStatus = spaceStatus;
  }
  
}
