package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.entity.ReservationStatus;

import java.util.List;

public interface ReservationStatusService {
    // 예약 상태 목록
    List<ReservationStatus> getReservationStatusList();


}
