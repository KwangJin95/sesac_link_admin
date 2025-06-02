package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.member.dto.AdminMemberSecurityDTO;
import kr.sesaclink.domain.member.service.MemberService;
import kr.sesaclink.domain.reservation.service.ReservationStatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/reservation/advice")
public class AdviceReservationController {

    private final MemberService memberService;

    private final ReservationStatusService reservationStatusService;

    // 상담 예약 목록 조회(일별)
    @GetMapping("/daily")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String getAdviceReservationsDailyPage(Model model,
                                                 @AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO) {

        // 잡코디 목록
        model.addAttribute("jobCoordinatorDTOList", memberService.getJobCoordinatorList(adminMemberSecurityDTO.getCampusNo()));

        // 예약 상태 목록
        model.addAttribute("reservationStatusList", reservationStatusService.getReservationStatusList());

        return "reservation/advice/daily";
    }

    // 상담 예약 목록 조회(기간별)
    @GetMapping("/period")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String getAdviceReservationsPeriodPage(Model model,
                                                  @AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO) {

        // 잡코디 목록
        model.addAttribute("jobCoordinatorDTOList", memberService.getJobCoordinatorList(adminMemberSecurityDTO.getCampusNo()));

        // 예약 상태 목록
        model.addAttribute("reservationStatusList", reservationStatusService.getReservationStatusList());

        return "reservation/advice/period";
    }

}
