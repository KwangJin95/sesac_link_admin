package kr.sesaclink.domain.member.repository.search;

import kr.sesaclink.domain.member.dto.UserDTO;
import kr.sesaclink.domain.member.entity.UserMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserMemberSearch {
    // SUPER_ADMIN - PRE_USER 목록 조회
    Page<UserMember> searchPreUserList(String statusType,
                                       String searchType,
                                       String keyword,
                                       Pageable pageable);

    // SUPER_ADMIN - USER 목록 조회
    Page<UserDTO> searchUserList(Integer courseNo,
                                 String searchType,
                                 String keyword,
                                 String authName,
                                 Long adminNo,
                                 int campusNo,
                                 Pageable pageable);

}
