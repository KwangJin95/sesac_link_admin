package kr.sesaclink.domain.member.controller;

import kr.sesaclink.domain.member.dto.MemberFindPwDTO;
import kr.sesaclink.domain.member.dto.AdminMemberSignupDTO;
import kr.sesaclink.domain.member.service.MemberService;
import kr.sesaclink.global.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Log4j2
@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final MessageService messageService;

    // 로그인 페이지
    @GetMapping("/login")
    public void getLoginPage() {}

    // 회원가입 페이지
    @GetMapping("/signup")
    public void getSignupPage(@ModelAttribute("memberSignupDTO") AdminMemberSignupDTO adminMemberSignupDTO) {}

    // 회원가입
    @PostMapping("/signup")
    public String signup(@ModelAttribute("adminMemberSignupDTO") AdminMemberSignupDTO adminMemberSignupDTO,
                                                                 Model model,
                                                                 RedirectAttributes redirectAttributes) {

        boolean isRegistered = memberService.signup(adminMemberSignupDTO);
        String  code = isRegistered ? "signup.success" :
                                      "signup.failure";

        // 메시지
        redirectAttributes.addFlashAttribute("message", messageService.getMessage(code));
        
        // 회원가입 성공
        if (isRegistered) {
            return "redirect:/";
        }

        // 실패 시 다시 회원가입 페이지로
        model.addAttribute("signupAgain", true);
        return "/signup";
    }

    // 아이디 찾기 페이지
    @GetMapping("/find-id")
    public void getFindIdPage() {}

    // 아이디 찾기
    @PostMapping("/find-id")
    public String findId(String email,
                         RedirectAttributes redirectAttributes) {

        String id = memberService.findId(email);
        String   code = (id != null) ? "find-id.success" :
                                       "find-id.failure";
        Object[] args = (id != null) ? new Object[]{id} : // 아이디를 메시지에 전달
                                       null;

        redirectAttributes.addFlashAttribute("message", messageService.getMessage(code, args));

        return (id != null) ? "redirect:/" :
                              "redirect:/find-id";
    }

    // 비밀번호 재설정 페이지
    @GetMapping("/find-pw")
    public void getFindPwPage() {}

    // 비밀번호 재설정
    @PostMapping("/find-pw")
    public String findPw(MemberFindPwDTO memberFindPwDTO,
                         RedirectAttributes redirectAttributes) {

        String id = memberService.findPw(memberFindPwDTO);
        String code = (id != null) ? "find-pw.success" :
                                     "find-pw.failure";

        // 메시지
        redirectAttributes.addFlashAttribute("message", messageService.getMessage(code));

        return (id != null) ? "redirect:/" :
                              "redirect:/find-pw";
    }
}
