package kr.sesaclink.domain.member.controller;

import kr.sesaclink.domain.course.service.CourseService;
import kr.sesaclink.domain.member.dto.AdminMemberSecurityDTO;
import kr.sesaclink.domain.member.service.MemberService;
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
@RequestMapping({"/super-admin/members", "/admin/members"})
public class AdminMemberController {

    private final MemberService memberService;

    private final CourseService courseService;

    // PRE_ADMIN 페이지
    @GetMapping("/pre-admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String getPreAdminPage(Model model) {

        // 운영진 권한 목록
        model.addAttribute("adminAuthList", memberService.getAdminAuthList());

        return "admin/members/pre-admin";
    }

    // ADMIN, JOB_COORDINATOR 페이지
    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String getAdminPage(Model model) {

        // 운영진 권한 목록
        model.addAttribute("adminAuthList", memberService.getAdminAuthList());

        return "admin/members/admin";
    }

    // PRE_USER 페이지
    @GetMapping("/pre-user")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String getPreUserPage(Model model) {

        // 학생 권한 목록
        model.addAttribute("userAuthList", memberService.getUserAuthList());

        return "admin/members/pre-user";
    }

    // USER 페이지
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public String getUserPage(@AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO,
                              Model model) {

        // 강좌 목록
        model.addAttribute("courseList",
                courseService.getCourseListByCampus(adminMemberSecurityDTO.getCampusNo()));

        // 잡코디 목록
        model.addAttribute("jobCoordinatorList",
                memberService.getJobCoordinatorList(adminMemberSecurityDTO.getCampusNo()));

        return "admin/members/user";
    }

}
