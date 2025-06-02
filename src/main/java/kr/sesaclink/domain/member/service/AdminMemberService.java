package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.member.dto.*;
import kr.sesaclink.global.dto.PageResponseDTO;

import java.util.List;

public interface AdminMemberService {
    // PRE_ADMIN 목록 조회
    PageResponseDTO<PreAdminDTO> getPreAdminList(Integer page,
                                                 Integer size,
                                                 String statusType,
                                                 String searchType,
                                                 String keyword);

    // PRE_ADMIN 가져오기 - 소속 캠퍼스, 권한, 회원 상태 변경
    boolean updatePreAdmin(PreAdminDTO preAdminDTO);

    // ADMIN, JOB_COORDINATOR 목록 조회
    PageResponseDTO<AdminDTO> getAdminList(Integer page,
                                           Integer size,
                                           String authType,
                                           String searchType,
                                           String keyword,
                                           int campusNo,
                                           String authName);
    // ADMIN, JOB_COORDINATOR 등록
    boolean registerAdmin(AdminRegisterDTO adminRegisterDTO);
    // ADMIN, JOB_COORDINATOR 수정
    boolean updateAdmin(AdminUpdateDTO adminUpdateDTO);
    // ADMIN, JOB_COORDINATOR 삭제
    boolean deleteAdmin(Long adminNo);

    // PRE_USER 목록 조회
    PageResponseDTO<PreUserDTO> getPreUserList(Integer page,
                                               Integer size,
                                               String statusType,
                                               String searchType,
                                               String keyword);
    // PRE_USER 가져오기 - 소속 캠퍼스, 권한, 회원 상태 변경
    boolean updatePreUser(PreUserDTO preUserDTO);

    // USER 목록 조회
    PageResponseDTO<UserDTO> getUserList(Integer page,
                                         Integer size,
                                         Integer courseNo,
                                         String searchType,
                                         String keyword,
                                         int campusNo,
                                         String authName,
                                         Long adminNo);
    // USER 회원 정보 수정
    boolean updateUser(UserUpdateDTO userUpdateDTO);
    // USER 강좌 정보 수정
    boolean updateUserCourse(Long userNo,
                             List<Integer> courseNoToBeDeleted,
                             List<Integer> courseNoToBeRegistered);
    // USER 삭제
    boolean deleteUser(Long userNo);
}
