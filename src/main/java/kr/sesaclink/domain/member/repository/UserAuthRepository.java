package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.member.dto.UserAuthDTO;
import kr.sesaclink.domain.member.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Integer> {
    // 학생 권한 목록 가져오기
    @Query("select new kr.sesaclink.domain.member.dto.UserAuthDTO(" +
            "a. userAuthNo, a.authName) " +
            "from UserAuth a " +
            "where a.authName not like '%PRE_%'")
    List<UserAuthDTO> getUserAuthListExceptPreUser();
}
