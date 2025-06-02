package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.reservation.dto.SpaceRegisterDTO;
import kr.sesaclink.domain.reservation.service.SpaceService;
import kr.sesaclink.global.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/space")
public class SpaceController {

    private final SpaceService spaceService;

    private final MessageService messageService;

    // 공간 페이지 조회
    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String getSpacePage() {
        return "space";
    }

    // 공간 등록
    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public String registerSpace(SpaceRegisterDTO spaceRegisterDTO,
                                MultipartFile spaceImageFile,
                                RedirectAttributes redirectAttributes) {

        boolean isRegistered = spaceService.registerSpace(spaceRegisterDTO, spaceImageFile);

        redirectAttributes.addFlashAttribute("message", isRegistered ?
                messageService.getMessage("space.register.success") :
                messageService.getMessage("space.register.failure"));

        return "redirect:/space";
    }


    // 공간 삭제
    @DeleteMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public String deleteSpace(Integer spaceNo,
                              RedirectAttributes redirectAttributes) {

        // 공간 정보 삭제
        boolean isDeleted = spaceService.deleteSpace(spaceNo);

        redirectAttributes.addFlashAttribute("message", isDeleted ?
                messageService.getMessage("space.delete.success") :
                messageService.getMessage("space.delete.failure"));

        return "redirect:/space";
    }
}
