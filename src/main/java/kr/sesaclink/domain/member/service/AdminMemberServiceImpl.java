package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.course.entity.Course;
import kr.sesaclink.domain.course.entity.UserCourse;
import kr.sesaclink.domain.course.repository.UserCourseRepository;
import kr.sesaclink.domain.member.dto.*;
import kr.sesaclink.domain.member.entity.*;
import kr.sesaclink.domain.member.repository.AdminMemberRepository;
import kr.sesaclink.domain.member.repository.UserMemberRepository;
import kr.sesaclink.domain.member.repository.search.AdminMemberSearch;
import kr.sesaclink.domain.member.repository.search.UserMemberSearch;
import kr.sesaclink.global.dto.PageResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class AdminMemberServiceImpl implements AdminMemberService {

    private final AdminMemberSearch adminMemberSearch;
    private final AdminMemberRepository adminMemberRepository;

    private final UserMemberSearch userMemberSearch;
    private final UserMemberRepository userMemberRepository;

    private final UserCourseRepository userCourseRepository;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    // PRE_ADMIN 목록 조회(검색)
    @Override
    public PageResponseDTO<PreAdminDTO> getPreAdminList(Integer page,
                                                        Integer size,
                                                        String statusType,
                                                        String searchType,
                                                        String keyword) {

        Pageable pageable = PageRequest.of(page - 1,
                size,
                Sort.by("adminNo").descending());

        Page<AdminMember> result = adminMemberSearch.searchPreAdminList(statusType,
                                                                        searchType,
                                                                        keyword,
                                                                        pageable);

        List<PreAdminDTO> preAdminDTOList = result.getContent().stream()
                .map(preAdmin -> new PreAdminDTO(preAdmin))
                .collect(Collectors.toList());

        return new PageResponseDTO<>(page,
                size,
                preAdminDTOList,
                (int) result.getTotalElements());
    }

    // ADMIN, JOB_COORDINATOR 목록 조회(검색)
    @Override
    public PageResponseDTO<AdminDTO> getAdminList(Integer page,
                                                  Integer size,
                                                  String authType,
                                                  String searchType,
                                                  String keyword,
                                                  int campusNo,
                                                  String authName) {

        Pageable pageable = PageRequest.of(page - 1,
                                            size,
                                            Sort.by("adminNo").descending());

        Page<AdminMember> result = adminMemberSearch.searchAdminList(authType,
                                                                     searchType,
                                                                     keyword,
                                                                     campusNo,
                                                                     authName,
                                                                     pageable);

        List<AdminDTO> adminDTOList = result.getContent().stream()
                .map(admin -> new AdminDTO(admin))
                .collect(Collectors.toList());

        return new PageResponseDTO<>(page,
                size,
                adminDTOList,
                (int) result.getTotalElements());
    }

    // PRE_USER 목록 조회(검색)
    @Override
    public PageResponseDTO<PreUserDTO> getPreUserList(Integer page,
                                                      Integer size,
                                                      String statusType,
                                                      String searchType,
                                                      String keyword) {

        Pageable pageable = PageRequest.of(page - 1,
                size,
                Sort.by("userNo").descending());

        Page<UserMember> result = userMemberSearch.searchPreUserList(statusType,
                                                                     searchType,
                                                                     keyword,
                                                                     pageable);

        List<PreUserDTO> preUserDTOList = result.getContent().stream()
                .map(preUser -> new PreUserDTO(preUser))
                .collect(Collectors.toList());

        return new PageResponseDTO<>(page,
                size,
                preUserDTOList,
                (int) result.getTotalElements());
    }

    // PRE_ADMIN 가져오기 - 소속 캠퍼스, 권한, 회원 상태 변경
    @Override
    @Transactional
    public boolean updatePreAdmin(PreAdminDTO preAdminDTO) {

        AdminMember adminMember = adminMemberRepository.findById(preAdminDTO.getAdminNo()).orElseThrow();

        // 권한 변경
        adminMember.changeAdminAuth(
                AdminAuth.builder().
                            adminAuthNo(preAdminDTO.getAdminAuthNo())
                            .build());

        // 소속 캠퍼스 - SUPER_ADMIN 과 동일한 캠퍼스로 변경
        adminMember.changeCampus(
                Campus.builder()
                        .campusNo(preAdminDTO.getCampusNo())
                        .build());

        // 회원 상태 - ACTIVE
        adminMember.changeMemberStatus(MemberStatus.builder().memberStatusNo(1).build());

        adminMemberRepository.save(adminMember);

        AdminMember AfterUpdateAdmin = adminMemberRepository.findAdminMemberByAdminNo(preAdminDTO.getAdminNo());

        return ((AfterUpdateAdmin.getAdminAuth().getAdminAuthNo().equals(preAdminDTO.getAdminAuthNo())) &&
                (AfterUpdateAdmin.getCampus() != null) &&
                (AfterUpdateAdmin.getMemberStatus().getMemberStatusNo() == 1));
    }

    // PRE_USER 가져오기 - 소속 캠퍼스, 권한, 회원 상태 변경
    @Override
    @Transactional
    public boolean updatePreUser(PreUserDTO preUserDTO) {

        UserMember userMember = userMemberRepository.findById(preUserDTO.getUserNo()).orElseThrow();

        // 권한 변경
        userMember.changeUserAuth(
                UserAuth.builder()
                        .userAuthNo(preUserDTO.getUserAuthNo())
                        .build());

        // 소속 캠퍼스 - SUPER_ADMIN 과 동일한 캠퍼스로 변경
        userMember.changeCampus(
                Campus.builder()
                        .campusNo(preUserDTO.getCampusNo())
                        .build());

        // 회원 상태 - ACTIVE
        userMember.changeMemberStatus(MemberStatus.builder().memberStatusNo(1).build());

        userMemberRepository.save(userMember);

        UserMember AfterUpdateUser = userMemberRepository.findUserMemberByUserNo(preUserDTO.getUserNo());

        return ((AfterUpdateUser.getUserAuth().getUserAuthNo().equals(preUserDTO.getUserAuthNo())) &&
                (AfterUpdateUser.getCampus() != null) &&
                (AfterUpdateUser.getMemberStatus().getMemberStatusNo() == 1));
    }



    // USER 목록 조회(검색)
    @Override
    public PageResponseDTO<UserDTO> getUserList(Integer page,
                                                Integer size,
                                                Integer courseNo,
                                                String searchType,
                                                String keyword,
                                                int campusNo,
                                                String authName,
                                                Long adminNo) {

        Pageable pageable = PageRequest.of(page - 1,
                                           size,
                                           Sort.by("userNo").descending());

        Page<UserDTO> result = userMemberSearch.searchUserList(courseNo,
                                                               searchType,
                                                               keyword,
                                                               authName,
                                                               adminNo,
                                                               campusNo,
                                                               pageable);

        return new PageResponseDTO<>(page,
                size,
                result.getContent(),
                (int) result.getTotalElements());
    }

    // ADMIN, JOB_COORDINATOR 등록
    @Override
    public boolean registerAdmin(AdminRegisterDTO adminRegisterDTO) {

        // 상태 ACTIVE
        adminRegisterDTO.setMemberStatusNo(1);

        // 비밀번호 인코딩
        adminRegisterDTO.setPw(passwordEncoder.encode(adminRegisterDTO.getPw()));

        // DTO to entity
        AdminMember adminMember = modelMapper.map(adminRegisterDTO, AdminMember.class);

        // save
        adminMemberRepository.save(adminMember);

        // 등록 후 엔티티로 가져옴
        AdminMember AfterRegisterAdmin = adminMemberRepository.findAdminMemberById(adminRegisterDTO.getId());

        return (AfterRegisterAdmin.getAdminNo() != null);
    }

    // ADMIN, JOB_COORDINATOR 회원 정보 수정
    @Override
    @Transactional
    public boolean updateAdmin(AdminUpdateDTO adminUpdateDTO) {

        AdminMember adminMember = adminMemberRepository.findById(adminUpdateDTO.getAdminNo()).orElseThrow();

        // 이름 수정
        adminMember.changeName(adminUpdateDTO.getName());
        // 핸드폰 번호 수정
        adminMember.changePhone(adminUpdateDTO.getPhone());
        // 권한 수정
        adminMember.changeAdminAuth(AdminAuth.builder().adminAuthNo(adminUpdateDTO.getAdminAuthNo()).build());

        // 프로필 이미지 초기화
        if (adminUpdateDTO.getProfileThumbnail() != null && !adminUpdateDTO.getProfileThumbnail().isBlank()) {
            adminMember.changeProfileThumbnail(null);
        }

        // 비밀번호 수정
        if (adminUpdateDTO.getPw() != null && !adminUpdateDTO.getPw().isBlank()) {
            adminMember.changePw(passwordEncoder.encode(adminUpdateDTO.getPw()));
        }

        adminMemberRepository.save(adminMember);

        AdminMember afterUpdateAdmin = adminMemberRepository.findAdminMemberByAdminNo(adminUpdateDTO.getAdminNo());

        return ((afterUpdateAdmin.getName().equals(adminUpdateDTO.getName())) &&
                (afterUpdateAdmin.getPhone().equals(adminUpdateDTO.getPhone())) &&
                (afterUpdateAdmin.getAdminAuth().getAdminAuthNo().equals(adminUpdateDTO.getAdminAuthNo())) &&
                ((adminUpdateDTO.getPw() == null || adminUpdateDTO.getPw().isBlank()) ||
                    (passwordEncoder.matches(adminUpdateDTO.getPw(), afterUpdateAdmin.getPw()))));
    }
    
    // ADMIN, JOB_COORDINATOR 삭제
    @Override
    @Transactional
    public boolean deleteAdmin(Long adminNo) {

        AdminMember adminMember = adminMemberRepository.findById(adminNo).orElseThrow();

        // 권한 -> PRE_ADMIN
        adminMember.changeAdminAuth(AdminAuth.builder().adminAuthNo(2).build());

        // 캠퍼스 -> null
        adminMember.changeCampus(null);

        // 상태 -> FORCED_WITHDRAWN
        adminMember.changeMemberStatus(MemberStatus.builder().memberStatusNo(2).build());

        adminMemberRepository.save(adminMember);

        AdminMember afterDeleteAdmin = adminMemberRepository.findAdminMemberByAdminNo(adminNo);

        return ((afterDeleteAdmin.getAdminAuth().getAdminAuthNo() == 2) &&
                (afterDeleteAdmin.getCampus() == null) &&
                (afterDeleteAdmin.getMemberStatus().getMemberStatusNo() == 2)
        );
    }

    // USER 회원 정보 수정
    @Override
    @Transactional
    public boolean updateUser(UserUpdateDTO userUpdateDTO) {

        UserMember userMember = userMemberRepository.findById(userUpdateDTO.getUserNo()).orElseThrow();

        // 이름 수정
        userMember.changeName(userUpdateDTO.getName());
        // 핸드폰 번호 수정
        userMember.changePhone(userUpdateDTO.getPhone());
        // 주소 수정
        userMember.changeAddress(userUpdateDTO.getAddress());
        // 상세 주소 수정
        userMember.changeDetailAddress(userUpdateDTO.getDetailAddress());

        // 프로필 이미지 초기화
        if (userUpdateDTO.getProfileThumbnail() != null && !userUpdateDTO.getProfileThumbnail().isBlank()) {
            userMember.changeProfileThumbnail(null);
        }

        // 비밀번호 수정
        if (userUpdateDTO.getPw() != null && !userUpdateDTO.getPw().isBlank()) {
            userMember.changePw(passwordEncoder.encode(userUpdateDTO.getPw()));
        }

        // 잡코디 수정
        if (userUpdateDTO.getAdminNo() != null) {
            userMember.changeAdminMember(AdminMember.builder().adminNo(userUpdateDTO.getAdminNo()).build());
        }

        userMemberRepository.save(userMember);

        UserMember afterUpdateUser = userMemberRepository.findUserMemberByUserNo(userUpdateDTO.getUserNo());

        return ((afterUpdateUser.getName().equals(userUpdateDTO.getName())) &&
                (afterUpdateUser.getPhone().equals(userUpdateDTO.getPhone())) &&
                (afterUpdateUser.getAddress().equals(userUpdateDTO.getAddress())) &&
                (afterUpdateUser.getDetailAddress().equals(userUpdateDTO.getDetailAddress())) &&
                //(afterUpdateUser.getProfileThumbnail() == null) &&
                (Objects.equals(afterUpdateUser.getAdminMember().getAdminNo(), userUpdateDTO.getAdminNo())) &&
                ((userUpdateDTO.getPw() == null || userUpdateDTO.getPw().isBlank()) ||
                        (passwordEncoder.matches(userUpdateDTO.getPw(), afterUpdateUser.getPw()))));
    }
    // USER 강좌 정보 수정
    @Override
    @Transactional
    public boolean updateUserCourse(Long userNo,
                                    List<Integer> courseNoToBeDeleted,
                                    List<Integer> courseNoToBeRegistered) {

        // 등록된 강좌 번호 조회
        List<Integer> courseNoList = userCourseRepository.getCourseNoByUserNo(userNo);

        List<UserCourse> userCourseDeleteList = new ArrayList<>();

        // 삭제할 list 존재 시
        if (courseNoToBeDeleted != null && !courseNoToBeDeleted.isEmpty()) {
            userCourseDeleteList = userCourseRepository.findByUserMemberUserNoAndCourseCourseNoIn(userNo, courseNoToBeDeleted);
            // 삭제
            userCourseRepository.deleteAll(userCourseDeleteList);
        }

        // 등록 list
        List<UserCourse> userCourseRegisterList = new ArrayList<>();

        // 업데이트 방지
        if (courseNoList != null && courseNoToBeRegistered != null) {
            courseNoToBeRegistered.removeAll(courseNoList);
        }

        // 등록할 list 존재 시
        if (courseNoToBeRegistered != null && !courseNoToBeRegistered.isEmpty()) {
            courseNoToBeRegistered.forEach(courseNo -> {
                userCourseRegisterList.add(UserCourse.builder()
                        .course(Course.builder().courseNo(courseNo).build())
                        .userMember(UserMember.builder().userNo(userNo).build())
                        .build());
            });
            // 등록
            userCourseRepository.saveAll(userCourseRegisterList);
        }

        // 삭제 및 등록 후 강좌 번호 조회
        List<Integer> afterUpdateCourseNoList = userCourseRepository.getCourseNoByUserNo(userNo);

        return afterUpdateCourseNoList.size() == (
                ((courseNoList != null) ? courseNoList.size() : 0) -
                userCourseDeleteList.size() +
                userCourseRegisterList.size()
        );
    }
    // USER 삭제
    @Override
    @Transactional
    public boolean deleteUser(Long userNo) {

        UserMember userMember = userMemberRepository.findById(userNo).orElseThrow();

        // 권한 -> PRE_USER
        userMember.changeUserAuth(UserAuth.builder().userAuthNo(2).build());

        // 캠퍼스 -> null
        userMember.changeCampus(null);

        // 상태 -> FORCED_WITHDRAWN
        userMember.changeMemberStatus(MemberStatus.builder().memberStatusNo(2).build());

        userMemberRepository.save(userMember);

        UserMember afterDeleteUser = userMemberRepository.findUserMemberByUserNo(userNo);

        return ((afterDeleteUser.getUserAuth().getUserAuthNo() == 2) &&
                (afterDeleteUser.getCampus() == null) &&
                (afterDeleteUser.getMemberStatus().getMemberStatusNo() == 2)
        );
    }
}
