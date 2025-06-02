package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.member.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {
    // 아이디 중복 확인
    boolean isIdAvailable(String id);

    // 이메일 중복 확인
    boolean checkEmail(String email);

    // 아이디, 이메일 매칭 확인
    boolean checkIdWithEmail(String id,
                             String email);
    
    // 회원가입
    boolean signup(AdminMemberSignupDTO adminMemberSignupDTO);
    
    // 아이디 찾기
    String findId(String email);
    
    // 비밀번호 재설정
    String findPw(MemberFindPwDTO memberFindPwDTO);
    
    // 이메일 재설정
    boolean updateEmail(Long adminNo,
                        String email);

    // 비밀번호 확인
    boolean checkPw(Long adminNo,
                    String pw);

    // 비밀번호 재설정 - 마이페이지
    boolean updatePw(Long adminNo,
                     String pw);
    
    // 프로필 수정
    boolean updateMyMember(Long adminNo,
                           String name,
                           String phone,
                           MultipartFile file);
    
    // 탈퇴하기
    boolean deleteMyMember(Long adminNo);
    
    // 운영진 권한 목록 가져오기
    List<AdminAuthDTO> getAdminAuthList();

    // 학생 권한 목록 가져오기
    List<UserAuthDTO> getUserAuthList();

    // 잡코디 목록 조회
    List<JobCoordinatorDTO> getJobCoordinatorList(Integer campusNo);
}
