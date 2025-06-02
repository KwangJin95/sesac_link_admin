package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.AdviceReservationDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationUpdateDTO;
import kr.sesaclink.domain.reservation.entity.AdviceReservation;
import kr.sesaclink.domain.reservation.repository.AdviceReservationRepository;
import kr.sesaclink.domain.reservation.repository.ReservationStatusRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class AdviceReservationServiceImpl implements AdviceReservationService {

    private final AdviceReservationRepository adviceReservationRepository;

    private final ReservationStatusRepository reservationStatusRepository;

    // 상담 예약 목록 조회(일별)
    @Override
    public List<AdviceReservationDTO> getAdviceReservationList(Long jobAdminNo,
                                                              LocalDate resDate,
                                                              String statusName) {

        List<AdviceReservation> result =
            adviceReservationRepository.getAdviceReservationByJobAdminNoAndResDate(jobAdminNo,
                                                                                   resDate,
                                                                                   statusName);

        return result.stream()
                .map(adviceReservation -> new AdviceReservationDTO(adviceReservation))
                .collect(Collectors.toList());
    }

    // 상담 예약 목록 조회(기간별)
    @Override
    public List<AdviceReservationDTO> getAdviceReservationList(Long jobAdminNo,
                                                               LocalDate startDate,
                                                               LocalDate endDate,
                                                               String statusName) {

        List<AdviceReservation> result =
            adviceReservationRepository.getAdviceReservationByJobAdminNoBetweenStartDateAndEndDate(
                jobAdminNo,
                startDate,
                endDate,
                statusName);

        return result.stream()
            .map(adviceReservation -> new AdviceReservationDTO(adviceReservation))
            .collect(Collectors.toList());
    }

    // 상담 예약 등록
    @Override
    @Transactional
    public boolean registerAdviceReservation(AdviceReservationRegisterDTO adviceReservationRegisterDTO) {

        // CANCELED 제외한 기존 상담 예약 목록(새로 등록할 시작시간 ~ 종료시간)
        List<AdviceReservation> adviceReservationList =
            adviceReservationRepository.getAdviceReservationByJobAdminNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                adviceReservationRegisterDTO.getJobAdminNo(),
                adviceReservationRegisterDTO.getResDate(),
                adviceReservationRegisterDTO.getStartTime(),
                adviceReservationRegisterDTO.getEndTime());

        adviceReservationList.forEach(adviceReservation -> {
            // 기존 공간 예약 상태 -> 거절(REJECTED)로 변경
            adviceReservation.changeReservationStatus(
                reservationStatusRepository.findReservationStatusNoByStatusName("REJECTED")
            );
            // 상태 변경인으로 예약 등록자 설정
            adviceReservation.changeStatusAdminMember(
                adviceReservationRegisterDTO.getAdminNo()
            );
            // 저장
            adviceReservationRepository.save(adviceReservation);
        });

        // 등록된 상담 예약 엔티티
        AdviceReservation registerdAdviceReservation;

        // 예약 상태 - 승인(APPROVED)
        adviceReservationRegisterDTO.setReservationStatusNo(
            reservationStatusRepository.findReservationStatusNoByStatusName("APPROVED")
        );

        AdviceReservation adviceReservation = new AdviceReservation(adviceReservationRegisterDTO);

        // 등록
        registerdAdviceReservation = adviceReservationRepository.save(adviceReservation);

        return registerdAdviceReservation.getAdviceReservationNo() != null;
    }

    // 상담 예약 상태 변경
    @Override
    @Transactional
    public boolean updateAdviceReservationReservationStatus(AdviceReservationUpdateDTO adviceReservationUpdateDTO) {

        // 기존 예약
        AdviceReservation originAdviceReservation =
                adviceReservationRepository.findWithReservationStatusByAdviceReservationNo(
                        adviceReservationUpdateDTO.getAdviceReservationNo()).orElseThrow();

        // 변경할 예약 상태가 승인 일 때
        if (Objects.equals(adviceReservationUpdateDTO.getReservationStatusNo(),
                reservationStatusRepository.findReservationStatusNoByStatusName("APPROVED"))) {

            // CANCELED 제외한 기존 상담 예약 목록(시작시간 ~ 종료시간)
            List<AdviceReservation> adviceReservationList =
                adviceReservationRepository.getAdviceReservationByJobAdminNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                    adviceReservationUpdateDTO.getJobAdminNo(),
                    adviceReservationUpdateDTO.getResDate(),
                    adviceReservationUpdateDTO.getStartTime(),
                    adviceReservationUpdateDTO.getEndTime());

            adviceReservationList.forEach(adviceReservation -> {
                // 기존 공간 예약 상태 -> 거절(REJECTED)로 변경
                adviceReservation.changeReservationStatus(
                    reservationStatusRepository.findReservationStatusNoByStatusName("REJECTED")
                );
                // 상태 변경인 설정
                adviceReservation.changeStatusAdminMember(
                    adviceReservationUpdateDTO.getStatusAdminNo()
                );
                // 저장
                adviceReservationRepository.save(adviceReservation);
            });
        }

        // 기존 예약이 승인 상태이면서
        // 변경할 예약 상태가 요청 또는 취소일 때
        if (Objects.equals(originAdviceReservation.getReservationStatus().getReservationStatusNo(),
                reservationStatusRepository.findReservationStatusNoByStatusName("APPROVED")) &&
                (Objects.equals(adviceReservationUpdateDTO.getReservationStatusNo(),
                        reservationStatusRepository.findReservationStatusNoByStatusName("CANCELED")) ||
                        Objects.equals(adviceReservationUpdateDTO.getReservationStatusNo(),
                                reservationStatusRepository.findReservationStatusNoByStatusName("APPLYING")))) {

            // CANCELED 제외한 기존 상담 예약 목록(시작시간 ~ 종료시간)
            List<AdviceReservation> adviceReservationList =
                adviceReservationRepository.getAdviceReservationByJobAdminNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                    adviceReservationUpdateDTO.getJobAdminNo(),
                    adviceReservationUpdateDTO.getResDate(),
                    adviceReservationUpdateDTO.getStartTime(),
                    adviceReservationUpdateDTO.getEndTime());

            adviceReservationList.forEach(adviceReservation -> {
                // 기존 거절된 상담 예약 상태 -> 요청(APPLYING)으로 변경
                adviceReservation.changeReservationStatus(
                    reservationStatusRepository.findReservationStatusNoByStatusName("APPLYING")
                );
                // 상태 변경인 설정
                adviceReservation.changeStatusAdminMember(
                    adviceReservationUpdateDTO.getStatusAdminNo()
                );
                // 저장
                adviceReservationRepository.save(adviceReservation);
            });
        }

        // 수정된 상담 예약 엔티티
        AdviceReservation updatedAdviceReservation;

        AdviceReservation adviceReservation =
            adviceReservationRepository.findById(adviceReservationUpdateDTO.getAdviceReservationNo()).orElseThrow();

        // 예약 상태 변경
        adviceReservation.changeReservationStatus(adviceReservationUpdateDTO.getReservationStatusNo());
        // 예약 상태 변경인 변경
        adviceReservation.changeStatusAdminMember(adviceReservationUpdateDTO.getStatusAdminNo());

        // 저장
        adviceReservationRepository.save(adviceReservation);

        updatedAdviceReservation =
                adviceReservationRepository.findById(adviceReservationUpdateDTO.getAdviceReservationNo()).orElseThrow();

        return Objects.equals(updatedAdviceReservation.getReservationStatus().getReservationStatusNo(),
                adviceReservationUpdateDTO.getReservationStatusNo());

    }

}
