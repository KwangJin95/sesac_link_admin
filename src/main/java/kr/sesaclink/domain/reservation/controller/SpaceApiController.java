package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.member.dto.AdminMemberSecurityDTO;
import kr.sesaclink.domain.reservation.dto.SpaceDTO;
import kr.sesaclink.domain.reservation.dto.SpaceUpdateDTO;
import kr.sesaclink.domain.reservation.service.SpaceService;
import kr.sesaclink.global.dto.PageResponseDTO;
import kr.sesaclink.global.service.MessageService;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/space")
public class SpaceApiController {

    private final SpaceService spaceService;

    private final MessageService messageService;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    @Value("${pagination.default-size}")
    private Integer size;

    // 공간 이미지
    @GetMapping("/view/{filename}")
    public ResponseEntity<Resource> getSpaceImage(@PathVariable String filename) {
        if ("dev".equals(activeProfile)) {
            return customFileUtil.getFile(filename, "space_images");
        } else {
            return s3Util.getFileFromS3(filename, "space_images");
        }
    }

    // 공간 목록 조회(페이징)
    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public PageResponseDTO<SpaceDTO> getSpacePageResponseDTO(@RequestParam(defaultValue = "1") Integer page,
                                                             @AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO) {

        return spaceService.getSpaceList(page, size,
                                         adminMemberSecurityDTO.getCampusNo());
    }

    // 공간 수정
    @PutMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public String updateSpace(SpaceUpdateDTO spaceUpdateDTO,
                              MultipartFile spaceImageFile) {

        // 공간 정보 수정
        boolean isUpdated = spaceService.updateSpace(spaceUpdateDTO, spaceImageFile);

        return isUpdated ?
                messageService.getMessage("space.update.success") :
                messageService.getMessage("space.update.failure");
    }

}
