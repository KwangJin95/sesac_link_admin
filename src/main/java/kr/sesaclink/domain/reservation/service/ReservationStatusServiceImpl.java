package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.entity.ReservationStatus;
import kr.sesaclink.domain.reservation.repository.ReservationStatusRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ReservationStatusServiceImpl implements ReservationStatusService {

    private final ReservationStatusRepository reservationStatusRepository;

    // 예약 상태 목록
    @Override
    public List<ReservationStatus> getReservationStatusList() {
        return reservationStatusRepository.findAll();
    }
}
