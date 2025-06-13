package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.reservation.dto.SpaceReservationDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationUpdateDTO;
import kr.sesaclink.domain.reservation.service.SpaceReservationService;
import kr.sesaclink.global.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservation/space")
public class SpaceReservationApiController {

    private final SpaceReservationService spaceReservationService;

    private final MessageService messageService;

    // 공간 예약 목록(일별)
    @GetMapping("/daily")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public List<SpaceReservationDTO> getSpaceReservationListDaily(Integer spaceNo,
                                                                  LocalDate resDate,
                                                                  String statusName) {
        return spaceReservationService.getSpaceReservationList(spaceNo, resDate, statusName);
    }

    // 공간 예약 목록(기간별)
    @GetMapping("/period")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public List<SpaceReservationDTO> getSpaceReservationListPeriod(Integer spaceNo,
                                                                  LocalDate startDate,
                                                                  LocalDate endDate,
                                                                  String statusName) {
        return spaceReservationService.getSpaceReservationList(spaceNo, startDate, endDate, statusName);
    }

    // 공간 예약 등록
    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public String registerSpaceReservation(SpaceReservationRegisterDTO spaceReservationRegisterDTO) {

        // 공간 예약 등록 및 기존 예약 상태 변경 -> 거절
        boolean isRegistered = spaceReservationService.registerSpaceReservation(spaceReservationRegisterDTO);

        return isRegistered ?
                messageService.getMessage("reservation.space.register.success") :
                messageService.getMessage("reservation.space.register.failure");
    }

    // 공간 예약 상태 변경
    @PutMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public String updateSpaceReservationReservationStatus(SpaceReservationUpdateDTO spaceReservationUpdateDTO) {

        // 공간 예약 상태 변경 및 기존 예약 상태 변경
        boolean isUpdated = spaceReservationService.updateSpaceReservationReservationStatus(spaceReservationUpdateDTO);

        return isUpdated ?
                messageService.getMessage("reservation.space.update.success") :
                messageService.getMessage("reservation.space.update.failure");
    }
}
