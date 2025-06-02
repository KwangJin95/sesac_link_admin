package kr.sesaclink.domain.member.repository.search;

import kr.sesaclink.domain.member.entity.AdminMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminMemberSearch {
    // SUPER_ADMIN - PRE_ADMIN 목록 조회
    Page<AdminMember> searchPreAdminList(String statusType,
                                         String searchType,
                                         String keyword,
                                         Pageable pageable);

    // SUPER_ADMIN - ADMIN, JOB_COORDINATOR 목록 조회
    Page<AdminMember> searchAdminList(String authType,
                                      String searchType,
                                      String keyword,
                                      int campusNo,
                                      String authName,
                                      Pageable pageable);

}
