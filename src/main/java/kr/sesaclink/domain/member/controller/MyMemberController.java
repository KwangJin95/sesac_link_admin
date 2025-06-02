package kr.sesaclink.domain.member.controller;

import kr.sesaclink.domain.member.service.MemberService;
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
@RequestMapping("/my/member")
public class MyMemberController {

    private final MemberService memberService;

    private final MessageService messageService;

    // 내 정보 조회 화면
    @GetMapping
    public void getMyMemberPage() {}

    // 프로필 수정(이름, 핸드폰 번호, 프로필 이미지)
    @PostMapping
    public String updateMyMember(Long adminNo,
                                 String name,
                                 String phone,
                                 MultipartFile file,
                                 RedirectAttributes redirectAttributes) {

        boolean isUpdated = memberService.updateMyMember(adminNo, name, phone, file);
        String code = isUpdated ? "my.member.update.success" :
                                  "my.member.update.failure";

        // 메시지
        redirectAttributes.addFlashAttribute("message", messageService.getMessage(code));

        return "redirect:/my/member";
    }

    // 이메일 재설정
    @PostMapping("/email")
    public String updateMyMemberEmail(Long adminNo,
                                      String email,
                                      RedirectAttributes redirectAttributes) {

        boolean isUpdated = memberService.updateEmail(adminNo, email);
        String code = isUpdated ? "my.member.email.success" :
                                  "my.member.email.failure";

        redirectAttributes.addFlashAttribute("message", messageService.getMessage(code));

        return "redirect:/my/member";
    }

    // 비밀번호 재설정
    @PostMapping("/pw")
    public String updateMyMemberPw(Long adminNo,
                                   String pw,
                                   RedirectAttributes redirectAttributes) {

        boolean isUpdated = memberService.updatePw(adminNo, pw);
        String code = isUpdated ? "my.member.pw.success" :
                                  "my.member.pw.failure";

        // 메시지
        redirectAttributes.addFlashAttribute("message", messageService.getMessage(code));

        return "redirect:/my/member";
    }

    // 탈퇴하기 ( SUPER_ADMIN은 불가 )
    @PreAuthorize("hasAnyRole('PRE_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    @DeleteMapping
    public String deleteMyMember(Long adminNo,
                                 RedirectAttributes redirectAttributes) {

        boolean isDeleted = memberService.deleteMyMember(adminNo);

        // 탈퇴 실패
        if (!isDeleted) {
            redirectAttributes.addFlashAttribute("message",
                    messageService.getMessage("my.member.delete.failure"));
            return "redirect:/my/member";
        }
        
        return "redirect:/logout";
    }
}
