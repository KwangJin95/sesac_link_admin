package kr.sesaclink.domain.member.controller;

import kr.sesaclink.domain.member.dto.*;
import kr.sesaclink.domain.member.service.AdminMemberService;
import kr.sesaclink.domain.member.service.EmailService;
import kr.sesaclink.domain.member.service.MemberService;
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

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberApiController {

    private final MemberService memberService;

    private final MessageService messageService;

    private final EmailService emailService;

    private final AdminMemberService adminMemberService;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    @Value("${pagination.default-size}")
    private Integer size;

    // 아이디 중복 확인
    @PostMapping("/check-id")
    public boolean checkId(@RequestParam String id) {
        return memberService.isIdAvailable(id);
    }

    // 이메일 중복 확인
    @PostMapping("/check-email")
    public boolean checkEmail(@RequestParam String email) {
        return memberService.checkEmail(email);
    }

    // 아이디, 이메일 매칭 확인
    @PostMapping("/check-id-email")
    public boolean checkIdWithEmail(@RequestParam String id,
                                    @RequestParam String email) {
        return memberService.checkIdWithEmail(id, email);
    }

    // 프로필 이미지 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> getProfileThumbnail(@PathVariable String fileName) {
        if ("dev".equals(activeProfile)) {
            return customFileUtil.getFile(fileName, "profile_images");
        } else {
            return s3Util.getFileFromS3(fileName, "profile_images");
        }
    }

    // 비밀번호 확인
    @PostMapping("/check-pw")
    public boolean checkPw(@RequestParam Long adminNo,
                           @RequestParam String pw) {
        return memberService.checkPw(adminNo, pw);
    }

    // 운영진 권한 목록 가져오기
    @GetMapping("/admin-auth")
    public List<AdminAuthDTO> getAdminAuthList() {
        return memberService.getAdminAuthList();
    }

    // 학생 권한 목록 가져오기
    @GetMapping("/user-auth")
    public List<UserAuthDTO> getUserAuthList() {
        return memberService.getUserAuthList();
    }

    // 잡코디 목록 가져오기
    @GetMapping("/job-coordinator")
    public List<JobCoordinatorDTO> getJobCoordinatorList(@RequestParam Integer campusNo) {
        return memberService.getJobCoordinatorList(campusNo);
    }

    // PRE_ADMIN 회원 정보 목록 가져오기
    @GetMapping("/pre-admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public PageResponseDTO<PreAdminDTO> getPreAdminList(@RequestParam(defaultValue = "1") Integer page,
                                                        String statusType,
                                                        String searchType,
                                                        String keyword) {
        return adminMemberService.getPreAdminList(page,
                                                  size,
                                                  statusType,
                                                  searchType,
                                                  keyword);
    }

    // ADMIN, JOB_COORDINATOR 회원 정보 목록 가져오기
    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public PageResponseDTO<AdminDTO> getAdminList(@AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO,
                                                  @RequestParam(defaultValue = "1") Integer page,
                                                  String authType,
                                                  String searchType,
                                                  String keyword) {
        return adminMemberService.getAdminList(page,
                                               size,
                                               authType,
                                               searchType,
                                               keyword,
                                               adminMemberSecurityDTO.getCampusNo(),
                                               adminMemberSecurityDTO.getAuthName());
    }

    // USER 회원 정보 목록 가져오기
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'JOB_COORDINATOR')")
    public PageResponseDTO<UserDTO> getUserList(@AuthenticationPrincipal AdminMemberSecurityDTO adminMemberSecurityDTO,
                                                  @RequestParam(defaultValue = "1") Integer page,
                                                  Integer courseNo,
                                                  String searchType,
                                                  String keyword) {
        return adminMemberService.getUserList(page,
                                              size,
                                              courseNo,
                                              searchType,
                                              keyword,
                                              adminMemberSecurityDTO.getCampusNo(),
                                              adminMemberSecurityDTO.getAuthName(),
                                              adminMemberSecurityDTO.getAdminNo());
    }

    // PRE_ADMIN 가져오기(소속 캠퍼스, 권한, 회원 상태 변경)
    @PutMapping("/pre-admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String updatePreAdmin(PreAdminDTO preAdminDTO) {

        // PRE_ADMIN 정보 수정
        boolean isUpdated = adminMemberService.updatePreAdmin(preAdminDTO);

        return isUpdated ?
                messageService.getMessage("super_admin.pre_admin.update.success") :
                messageService.getMessage("super_admin.pre_admin.update.failure");
    }

    // PRE_USER 가져오기(소속 캠퍼스, 권한, 회원 상태 변경)
    @PutMapping("/pre-user")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String updatePreUser(PreUserDTO preUserDTO) {

        boolean isUpdated = adminMemberService.updatePreUser(preUserDTO);

        return isUpdated ?
                messageService.getMessage("super_admin.pre_user.update.success") :
                messageService.getMessage("super_admin.pre_user.update.failure");
    }

    // ADMIN, JOB_COORDINATOR 회원 등록
    @PostMapping("/admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String registerAdmin(AdminRegisterDTO adminRegisterDTO) {

        // 등록
        boolean isRegistered = adminMemberService.registerAdmin(adminRegisterDTO);

        return isRegistered ?
                  messageService.getMessage("super_admin.admin.register.success") :
                  messageService.getMessage("super_admin.admin.register.failure");
    }

    // ADMIN, JOB_COORDINATOR 회원 정보 수정
    @PutMapping("/admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String updateAdmin(AdminUpdateDTO adminUpdateDTO) {

        // 운영진 정보 수정
        boolean isUpdated = adminMemberService.updateAdmin(adminUpdateDTO);

        // 비밀번호 수정 시 이메일 발송
        if (isUpdated && adminUpdateDTO.getPw() != null && !adminUpdateDTO.getPw().isBlank()) {
            emailService.sendUpdatePw(adminUpdateDTO.getEmail(), adminUpdateDTO.getPw());
        }

        return isUpdated ?
                   (adminUpdateDTO.getPw() == null || adminUpdateDTO.getPw().isBlank()) ?
                       messageService.getMessage("super_admin.admin.update.success") :
                       messageService.getMessage("super_admin.admin.update.password.success")
                   :
                   messageService.getMessage("super_admin.admin.update.failure");
    }

    // ADMIN, JOB_COORDINATOR 강제 탈퇴(소속 캠퍼스, 권한, 회원 상태 변경)
    @DeleteMapping("/admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String deleteAdmin(Long adminNo) {

        boolean isDeleted = adminMemberService.deleteAdmin(adminNo);

        return isDeleted ?
                  messageService.getMessage("super_admin.admin.delete.success") :
                  messageService.getMessage("super_admin.admin.delete.failure");
    }

    // PRE_USER 회원 정보 목록 가져오기
    @GetMapping("/pre-user")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public PageResponseDTO<PreUserDTO> getPreUserList(@RequestParam(defaultValue = "1") Integer page,
                                                      String statusType,
                                                      String searchType,
                                                      String keyword) {
        return adminMemberService.getPreUserList(page,
                                                 size,
                                                 statusType,
                                                 searchType,
                                                 keyword);
    }

    // USER 회원 정보 수정
    @PutMapping("/user")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String updateUser(UserUpdateDTO userUpdateDTO) {

        // 학생 정보 수정
        boolean isUpdated = adminMemberService.updateUser(userUpdateDTO);

        // 비밀번호 수정 시 이메일 발송
        if (isUpdated && userUpdateDTO.getPw() != null && !userUpdateDTO.getPw().isBlank()) {
            emailService.sendUpdatePw(userUpdateDTO.getEmail(), userUpdateDTO.getPw());
        }

        return isUpdated ?
                ((userUpdateDTO.getPw() == null || userUpdateDTO.getPw().isBlank()) ?
                        messageService.getMessage("super_admin.user.update.success") :
                        messageService.getMessage("super_admin.user.update.password.success")
                ) :
                messageService.getMessage("super_admin.user.update.failure");
    }
    // USER 강좌 정보 수정
    @PutMapping("/user-course")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String updateUserCourse(Long userNo,
                                   @RequestParam(required = false) List<Integer> courseNoToBeDeleted,
                                   @RequestParam(required = false) List<Integer> courseNoToBeRegistered) {

        // 강좌 정보 수정
        boolean isUpdated = adminMemberService.updateUserCourse(userNo,
                courseNoToBeDeleted,
                courseNoToBeRegistered);

        return isUpdated ?
                messageService.getMessage("super_admin.user_course.update.success") :
                messageService.getMessage("super_admin.user_course.update.failure");
    }

    // USER 강제 탈퇴(소속 캠퍼스, 권한, 회원 상태 변경)
    @DeleteMapping("/user")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String deleteUser(Long userNo) {

        boolean isDeleted = adminMemberService.deleteUser(userNo);

        return isDeleted ?
                messageService.getMessage("super_admin.user.delete.success") :
                messageService.getMessage("super_admin.user.delete.failure");
    }
}
