package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceReservationDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationUpdateDTO;
import kr.sesaclink.domain.reservation.entity.SpaceReservation;
import kr.sesaclink.domain.reservation.repository.ReservationStatusRepository;
import kr.sesaclink.domain.reservation.repository.SpaceReservationRepository;
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
public class SpaceReservationServiceImpl implements SpaceReservationService {

    private final SpaceReservationRepository spaceReservationRepository;

    private final ReservationStatusRepository reservationStatusRepository;

    // 공간 예약 목록 조회(일별)
    @Override
    public List<SpaceReservationDTO> getSpaceReservationList(Integer spaceNo,
                                                             LocalDate resDate,
                                                             String statusName) {

        List<SpaceReservation> result =
                spaceReservationRepository.getSpaceReservationBySpaceNoAndResDate(spaceNo,
                                                                                  resDate,
                                                                                  statusName);

        return result.stream()
                .map(spaceReservation -> new SpaceReservationDTO(spaceReservation))
                .collect(Collectors.toList());
    }

    // 공간 예약 목록 조회(기간별)
    @Override
    public List<SpaceReservationDTO> getSpaceReservationList(Integer spaceNo,
                                                             LocalDate startDate,
                                                             LocalDate endDate,
                                                             String statusName) {

        List<SpaceReservation> result =
                spaceReservationRepository.getSpaceReservationBySpaceNoBetweenStartDateAndEndDate(spaceNo,
                                                                                                  startDate,
                                                                                                  endDate,
                                                                                                  statusName);

        return result.stream()
                .map(spaceReservation -> new SpaceReservationDTO(spaceReservation))
                .collect(Collectors.toList());
    }

    // 공간 예약 목록 전체 갯수
    @Override
    public Long getSpaceReservationListCount(Integer spaceNo,
                                             LocalDate resDateStart,
                                             LocalDate resDateEnd,
                                             String statusName) {

        return spaceReservationRepository.getSpaceReservationCountBySpaceNoAndResDate(spaceNo,
                                                                                      resDateStart,
                                                                                      resDateEnd,
                                                                                      statusName);
    }

    // 공간 예약 등록
    @Override
    @Transactional
    public boolean registerSpaceReservation(SpaceReservationRegisterDTO spaceReservationRegisterDTO) {

        // CANCELED 제외한 기존 공간 예약 목록(새로 등록할 시작시간 ~ 종료시간)
        List<SpaceReservation> spaceReservationList =
            spaceReservationRepository.getSpaceReservationBySpaceNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                spaceReservationRegisterDTO.getSpaceNo(),
                spaceReservationRegisterDTO.getResDate(),
                spaceReservationRegisterDTO.getStartTime(),
                spaceReservationRegisterDTO.getEndTime());

        spaceReservationList.forEach(spaceReservation -> {
            // 기존 공간 예약 상태 -> 거절(REJECTED)로 변경
            spaceReservation.changeReservationStatus(
                    reservationStatusRepository.findReservationStatusNoByStatusName("REJECTED")
            );
            // 상태 변경인으로 예약 등록자 설정
            spaceReservation.changeStatusAdminMember(
                    spaceReservationRegisterDTO.getAdminNo()
            );
            // 저장
            spaceReservationRepository.save(spaceReservation);
        });

        // 등록된 공간 예약 엔티티
        SpaceReservation registerdSpaceReservation;

        // 예약 상태 - 승인(APPROVED)
        spaceReservationRegisterDTO.setReservationStatusNo(
                reservationStatusRepository.findReservationStatusNoByStatusName("APPROVED")
        );
        
        SpaceReservation spaceReservation = new SpaceReservation(spaceReservationRegisterDTO);

        // 등록
        registerdSpaceReservation = spaceReservationRepository.save(spaceReservation);

        return registerdSpaceReservation.getSpaceReservationNo() != null;
    }

    // 공간 예약 상태 변경
    @Override
    @Transactional
    public boolean updateSpaceReservationReservationStatus(SpaceReservationUpdateDTO spaceReservationUpdateDTO) {

        // 기존 예약
        SpaceReservation originSpaceReservation =
                spaceReservationRepository.findWithReservationStatusBySpaceReservationNo(
                        spaceReservationUpdateDTO.getSpaceReservationNo()).orElseThrow();
        
        // 변경할 예약 상태가 승인 일 때
        if (Objects.equals(spaceReservationUpdateDTO.getReservationStatusNo(),
                    reservationStatusRepository.findReservationStatusNoByStatusName("APPROVED"))) {

            // CANCELED 제외한 기존 공간 예약 목록(시작시간 ~ 종료시간)
            List<SpaceReservation> spaceReservationList =
                spaceReservationRepository.getSpaceReservationBySpaceNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                    spaceReservationUpdateDTO.getSpaceNo(),
                    spaceReservationUpdateDTO.getResDate(),
                    spaceReservationUpdateDTO.getStartTime(),
                    spaceReservationUpdateDTO.getEndTime());

            spaceReservationList.forEach(spaceReservation -> {
                // 기존 공간 예약 상태 -> 거절(REJECTED)로 변경
                spaceReservation.changeReservationStatus(
                        reservationStatusRepository.findReservationStatusNoByStatusName("REJECTED")
                );
                // 상태 변경인 설정
                spaceReservation.changeStatusAdminMember(
                        spaceReservationUpdateDTO.getStatusAdminNo()
                );
                // 저장
                spaceReservationRepository.save(spaceReservation);
            });
        }

        // 기존 예약이 승인 상태이면서
        // 변경할 예약 상태가 요청 또는 취소일 때
        if (Objects.equals(originSpaceReservation.getReservationStatus().getReservationStatusNo(),
                reservationStatusRepository.findReservationStatusNoByStatusName("APPROVED")) &&
           (Objects.equals(spaceReservationUpdateDTO.getReservationStatusNo(),
                reservationStatusRepository.findReservationStatusNoByStatusName("CANCELED")) ||
            Objects.equals(spaceReservationUpdateDTO.getReservationStatusNo(),
                reservationStatusRepository.findReservationStatusNoByStatusName("APPLYING")))) {

            // CANCELED 제외한 기존 공간 예약 목록(시작시간 ~ 종료시간)
            List<SpaceReservation> spaceReservationList =
                spaceReservationRepository.getSpaceReservationBySpaceNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                    spaceReservationUpdateDTO.getSpaceNo(),
                    spaceReservationUpdateDTO.getResDate(),
                    spaceReservationUpdateDTO.getStartTime(),
                    spaceReservationUpdateDTO.getEndTime());

            spaceReservationList.forEach(spaceReservation -> {
                // 기존 거절된 공간 예약 상태 -> 요청(APPLYING)으로 변경
                spaceReservation.changeReservationStatus(
                        reservationStatusRepository.findReservationStatusNoByStatusName("APPLYING")
                );
                // 상태 변경인 설정
                spaceReservation.changeStatusAdminMember(
                        spaceReservationUpdateDTO.getStatusAdminNo()
                );
                // 저장
                spaceReservationRepository.save(spaceReservation);
            });
        }

        // 수정된 공간 예약 엔티티
        SpaceReservation updatedSpaceReservation;

        SpaceReservation spaceReservation =
                spaceReservationRepository.findById(spaceReservationUpdateDTO.getSpaceReservationNo()).orElseThrow();

        // 예약 상태 변경
        spaceReservation.changeReservationStatus(spaceReservationUpdateDTO.getReservationStatusNo());
        // 예약 상태 변경인 변경
        spaceReservation.changeStatusAdminMember(spaceReservationUpdateDTO.getStatusAdminNo());

        // 저장
        spaceReservationRepository.save(spaceReservation);

        updatedSpaceReservation =
                spaceReservationRepository.findById(spaceReservationUpdateDTO.getSpaceReservationNo()).orElseThrow();

        return Objects.equals(updatedSpaceReservation.getReservationStatus().getReservationStatusNo(),
                              spaceReservationUpdateDTO.getReservationStatusNo());
    }

}
