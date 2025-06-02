package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.reservation.dto.AdviceReservationDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationUpdateDTO;
import kr.sesaclink.domain.reservation.service.AdviceReservationService;
import kr.sesaclink.global.service.MessageService;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservation/advice")
public class AdviceReservationApiController {

    private final AdviceReservationService adviceReservationService;

    private final MessageService messageService;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 상담 예약 목록(일별)
    @GetMapping("/daily")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public List<AdviceReservationDTO> getAdviceReservationListDaily(Long jobAdminNo,
                                                                    LocalDate resDate,
                                                                    String statusName) {
        return adviceReservationService.getAdviceReservationList(jobAdminNo, resDate, statusName);
    }

    // 상담 예약 상태 변경
    @PutMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String updateAdviceReservationReservationStatus(AdviceReservationUpdateDTO adviceReservationUpdateDTO) {

        // 상담 예약 상태 변경 및 기존 예약 상태 변경
        boolean isUpdated = adviceReservationService.updateAdviceReservationReservationStatus(adviceReservationUpdateDTO);

        return isUpdated ?
                messageService.getMessage("reservation.advice.update.success") :
                messageService.getMessage("reservation.advice.update.failure");
    }

    // 상담 예약 목록(기간별)
    @GetMapping("/period")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public List<AdviceReservationDTO> getAdviceReservationListPeriod(Long jobAdminNo,
                                                                     LocalDate startDate,
                                                                     LocalDate endDate,
                                                                     String statusName) {
        return adviceReservationService.getAdviceReservationList(jobAdminNo, startDate, endDate, statusName);
    }

    // 상담 예약 등록
    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String registerAdviceReservation(AdviceReservationRegisterDTO adviceReservationRegisterDTO) {

        // 상담 예약 등록 및 기존 예약 상태 변경 -> 거절
        boolean isRegistered = adviceReservationService.registerAdviceReservation(adviceReservationRegisterDTO);

        return isRegistered ?
                messageService.getMessage("reservation.advice.register.success") :
                messageService.getMessage("reservation.advice.register.failure");
    }

    // 첨부파일 다운로드
    @GetMapping("/advice-file/{adviceFile}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public ResponseEntity<Resource> getAdviceFile(@PathVariable String adviceFile) {
        if ("dev".equals(activeProfile)) {
            return customFileUtil.getFile(adviceFile, "advice_files");
        } else {
            return s3Util.getFileFromS3(adviceFile, "advice_files");
        }
    }

}
