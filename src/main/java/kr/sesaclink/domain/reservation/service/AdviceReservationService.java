package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.AdviceReservationDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationUpdateDTO;

import java.time.LocalDate;
import java.util.List;

public interface AdviceReservationService {
    // 상담 예약 목록 조회(일별)
    List<AdviceReservationDTO> getAdviceReservationList(Long jobAdminNo,
                                                        LocalDate resDate,
                                                        String statusName);

    // 상담 예약 목록 조회(기간별)
    List<AdviceReservationDTO> getAdviceReservationList(Long jobAdminNo,
                                                        LocalDate startDate,
                                                        LocalDate endDate,
                                                        String statusName);

    // 상담 예약 등록
    boolean registerAdviceReservation(AdviceReservationRegisterDTO adviceReservationRegisterDTO);

    // 상담 예약 상태 변경
    boolean updateAdviceReservationReservationStatus(AdviceReservationUpdateDTO adviceReservationUpdateDTO);
}
