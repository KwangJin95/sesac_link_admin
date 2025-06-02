package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceReservationDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationUpdateDTO;

import java.time.LocalDate;
import java.util.List;

public interface SpaceReservationService {
    // 공간 예약 목록 조회(일별)
    List<SpaceReservationDTO> getSpaceReservationList(Integer spaceNo,
                                                      LocalDate resDate,
                                                      String statusName);

    // 공간 예약 목록 조회(기간별)
    List<SpaceReservationDTO> getSpaceReservationList(Integer spaceNo,
                                                      LocalDate startDate,
                                                      LocalDate endDate,
                                                      String statusName);

    // 공간 예약 목록 전체 갯수
    Long getSpaceReservationListCount(Integer spaceNo,
                                         LocalDate resDateStart,
                                         LocalDate resDateEnd,
                                         String statusName);

    // 공간 예약 등록
    boolean registerSpaceReservation(SpaceReservationRegisterDTO spaceReservationRegisterDTO);

    // 공간 예약 상태 변경
    boolean updateSpaceReservationReservationStatus(SpaceReservationUpdateDTO spaceReservationUpdateDTO);

}
