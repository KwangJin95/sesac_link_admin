package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.member.dto.AdminAuthDTO;
import kr.sesaclink.domain.member.entity.AdminAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminAuthRepository extends JpaRepository<AdminAuth, Integer> {
    // 운영진 권한 목록 가져오기
    @Query("select new kr.sesaclink.domain.member.dto.AdminAuthDTO(" +
            "a. adminAuthNo, a.authName) " +
            "from AdminAuth a " +
            "where a.authName not like '%_ADMIN%'")
    List<AdminAuthDTO> getAdminAuthListExceptSuperAdminAndPreAdmin();
}
