package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.member.dto.AdminMemberSecurityDTO;
import kr.sesaclink.domain.reservation.dto.SpaceDTO;
import kr.sesaclink.domain.reservation.entity.ReservationStatus;
import kr.sesaclink.domain.reservation.service.ReservationStatusService;
import kr.sesaclink.domain.reservation.service.SpaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/reservation/space")
public class SpaceReservationController {

    private final SpaceService spaceService;

    private final ReservationStatusService reservationStatusService;

    // 공간 예약 목록 조회(일별)
    @GetMapping("/daily")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String getSpaceReservationsDailyPage(Model model,
                                                @AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO) {

        // 공간 목록
        List<SpaceDTO> spaceDTOList = spaceService.getSpaceList(adminMemberSecurityDTO.getCampusNo());
        model.addAttribute("spaceDTOList", spaceDTOList);

        // 예약 상태 목록
        List<ReservationStatus> reservationStatusList = reservationStatusService.getReservationStatusList();
        model.addAttribute("reservationStatusList", reservationStatusList);

        return "reservation/space/daily";
    }

    // 공간 예약 목록 조회(기간별)
    @GetMapping("/period")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String getSpaceReservationsPeriodPage(Model model,
                                                 @AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO) {

        // 공간 목록
        List<SpaceDTO> spaceDTOList = spaceService.getSpaceList(adminMemberSecurityDTO.getCampusNo());
        model.addAttribute("spaceDTOList", spaceDTOList);

        // 예약 상태 목록
        List<ReservationStatus> reservationStatusList = reservationStatusService.getReservationStatusList();
        model.addAttribute("reservationStatusList", reservationStatusList);

        return "reservation/space/period";
    }

}
