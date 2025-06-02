package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.member.dto.*;
import kr.sesaclink.domain.member.entity.AdminAuth;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.member.entity.MemberStatus;
import kr.sesaclink.domain.member.repository.AdminAuthRepository;
import kr.sesaclink.domain.member.repository.AdminMemberRepository;
import kr.sesaclink.domain.member.repository.UserAuthRepository;
import kr.sesaclink.global.security.CustomUserDetailService;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final AdminMemberRepository adminMemberRepository;

    private final PasswordEncoder passwordEncoder;

    private final CustomUserDetailService customUserDetailService;

    private final AdminAuthRepository adminAuthRepository;

    private final UserAuthRepository userAuthRepository;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 아이디 중복 확인
    @Override
    public boolean isIdAvailable(String id) {
        return !adminMemberRepository.existsById(id);  // 사용 가능하면 true, 중복이면 false
    }

    // 이메일 중복 확인
    @Override
    public boolean checkEmail(String email) {
        return !adminMemberRepository.existsByEmail(email);  // 사용 가능하면 true, 중복이면 false
    }

    // 아이디, 이메일 매칭 확인
    @Override
    public boolean checkIdWithEmail(String id,
                                    String email) {
        return adminMemberRepository.existsByIdAndEmail(id, email);
    }

    // 회원가입
    @Override
    public boolean signup(AdminMemberSignupDTO adminMemberSignupDTO) {

        AdminMember adminMember = AdminMember.builder()
                .id(adminMemberSignupDTO.getId())
                .pw(passwordEncoder.encode(adminMemberSignupDTO.getPw()))
                .name(adminMemberSignupDTO.getName())
                .phone(adminMemberSignupDTO.getPhone())
                .email(adminMemberSignupDTO.getEmail())
                .profileThumbnail(adminMemberSignupDTO.getProfileThumbnail())
                .adminAuth(AdminAuth.builder().adminAuthNo(adminMemberSignupDTO.getAdminAuthNo()).build())
                .memberStatus(MemberStatus.builder().memberStatusNo(adminMemberSignupDTO.getMemberStatusNo()).build())
                .build();

        adminMember = adminMemberRepository.save(adminMember);

        return adminMember.getId() != null;
    }

    // 아이디 찾기
    @Override
    public String findId(String email) {
        return adminMemberRepository.getIdByEmail(email);
    }

    // 비밀번호 재설정
    @Override
    public String findPw(MemberFindPwDTO memberFindPwDTO) {

        AdminMember adminMember = adminMemberRepository.findMemberByIdAndEmail(memberFindPwDTO.getId(), memberFindPwDTO.getEmail());

        // 아이디, 이메일에 해당하는 회원 없음
        if (adminMember == null) {
            return null;
        }

        // 비밀번호 재설정
        adminMember.changePw(passwordEncoder.encode(memberFindPwDTO.getPw()));

        adminMemberRepository.save(adminMember);

        return adminMember.getId();
    }

    // 이메일 재설정
    @Override
    public boolean updateEmail(Long adminNo,
                               String email) {

        // 이메일 재설정
        AdminMember adminMember = adminMemberRepository.findById(adminNo).orElseThrow();

        adminMember.changeEmail(email);

        adminMember = adminMemberRepository.save(adminMember);

        // Authentication 객체 갱신
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails updatedUser = customUserDetailService.loadUserByUsername(adminMember.getId());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(updatedUser, authentication.getCredentials(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        return email.equals(adminMember.getEmail());
    }

    // 비밀번호 확인
    @Override
    public boolean checkPw(Long adminNo,
                           String pw) {

        String originPw = adminMemberRepository.getPwByAdminNo(adminNo);

        return passwordEncoder.matches(pw, originPw);
    }

    // 비밀번호 재설정 - 마이페이지
    @Override
    public boolean updatePw(Long adminNo,
                            String pw) {

        // 비밀번호 재설정
        AdminMember adminMember = adminMemberRepository.findById(adminNo).orElseThrow();

        adminMember.changePw(passwordEncoder.encode(pw));

        adminMember = adminMemberRepository.save(adminMember);

        // Authentication 객체 갱신
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails updatedUser = customUserDetailService.loadUserByUsername(adminMember.getId());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(updatedUser, authentication.getCredentials(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        // 전달받은 비밀번호와 DB에 저장된 인코딩된 비밀번호 비교 반환
        return passwordEncoder.matches(pw, adminMember.getPw());
    }

    // 프로필 수정
    @Override
    public boolean updateMyMember(Long adminNo,
                                  String name,
                                  String phone,
                                  MultipartFile file) {

        AdminMember adminMember = adminMemberRepository.findById(adminNo).orElseThrow();

        // 이름, 핸드폰 번호 필드 수정
        adminMember.changeName(name);
        adminMember.changePhone(phone);

        // 새로 저장한 파일 이름
        String fileName;

        try {
            // file 존재
            if (file != null && !file.isEmpty()) {

                // 기존 파일 삭제(프로필 사진이 null)
                if (adminMember.getProfileThumbnail() != null) {
                    if ("dev".equals(activeProfile)) {
                        customFileUtil.deleteFile(adminMember.getProfileThumbnail(), "profile_images");
                    } else {
                        s3Util.removeS3File("profile_images/" + adminMember.getProfileThumbnail());
                    }
                }

                // 파일 저장
                if ("dev".equals(activeProfile)) {
                    fileName = customFileUtil.saveFile(file, "profile_images");
                } else {
                    fileName = s3Util.upload(customFileUtil.saveFileReturnPath(file), "profile_images");
                }

                // 프로필 이미지 필드 수정
                adminMember.changeProfileThumbnail(fileName);
            }

            adminMember = adminMemberRepository.save(adminMember);

        } catch (Exception e) {
            return false;
        }

        AdminMember afterUpdateAdmin = adminMemberRepository.findById(adminNo).orElseThrow();

        // Authentication 객체 갱신
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails updatedUser = customUserDetailService.loadUserByUsername(adminMember.getId());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(updatedUser, authentication.getCredentials(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        return afterUpdateAdmin.getName().equals(name) &&
               afterUpdateAdmin.getPhone().equals(phone);
    }

    // 탈퇴하기
    @Override
    public boolean deleteMyMember(Long adminNo) {

        AdminMember adminMember = adminMemberRepository.findById(adminNo).orElseThrow();

        // 회원 상태 WITHDRAWN 변경
        adminMember.changeMemberStatus(MemberStatus.builder().memberStatusNo(3).build());

        // 회원 캠퍼스 NULL 변경
        adminMember.changeCampus(null);
        
        // 회원 권한 PRE_ADMIN 변경
        adminMember.changeAdminAuth(AdminAuth.builder().adminAuthNo(2).build());

        adminMember = adminMemberRepository.save(adminMember);

        return ((adminMember.getMemberStatus().getMemberStatusNo() == 3) &&
                (adminMember.getCampus() == null) &&
                (adminMember.getAdminAuth().getAdminAuthNo() == 2));
    }
    
    // 운영진 권한 목록 가져오기
    @Override
    public List<AdminAuthDTO> getAdminAuthList() {
        return adminAuthRepository.getAdminAuthListExceptSuperAdminAndPreAdmin();
    }

    // 학생 권한 목록 가져오기
    @Override
    public List<UserAuthDTO> getUserAuthList() {
        return userAuthRepository.getUserAuthListExceptPreUser();
    }

    // 잡코디 목록 조회
    @Override
    public List<JobCoordinatorDTO> getJobCoordinatorList(Integer campusNo) {
        return adminMemberRepository.getJobCoordinatorList(campusNo);
    }
}
