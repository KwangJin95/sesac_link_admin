package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.member.dto.JobCoordinatorDTO;
import kr.sesaclink.domain.member.entity.AdminMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminMemberRepository extends JpaRepository<AdminMember, Long> {

    // 로그인 인증 시 회원, 캠퍼스, 권한 정보 조회
    @Query("select a " +
            "from AdminMember a " +
            "left join fetch a.adminAuth " +
            "left join fetch a.memberStatus " +
            "left join fetch a.campus " +
            "where a.id = :username")
    Optional<AdminMember> getWithAuthAndMemberStatusAndCampus(String username);

    // 아이디 중복 확인
    boolean existsById(String id);

    // 이메일 중복 확인
    boolean existsByEmail(String email);

    // 아이디, 이메일 매칭 확인
    boolean existsByIdAndEmail(String id,
                               String email);

    // 아이디 찾기
    @Query("select a.id " +
            "from AdminMember a " +
            "where a.email = :email")
    String getIdByEmail(@Param("email") String email);
    
    // 비밀번호 재설정 시 회원 찾기
    @Query("select a " +
            "from AdminMember a " +
            "where a.id = :id " +
            "and a.email = :email")
    AdminMember findMemberByIdAndEmail(@Param("id") String id,
                                       @Param("email") String email);

    // 비밀번호 확인
    @Query("select a.pw " +
            "from AdminMember a " +
            "where a.adminNo = :adminNo")
    String getPwByAdminNo(@Param("adminNo") Long adminNo);

    // AdminMember join fetch all by adminNo
    @Query("select a " +
            "from AdminMember a " +
            "left join fetch a.adminAuth " +
            "left join fetch a.campus " +
            "left join fetch a.memberStatus " +
            "where a.adminNo = :adminNo")
    AdminMember findAdminMemberByAdminNo(@Param("adminNo") Long adminNo);

    // AdminMember join fetch all by id
    @Query("select a " +
            "from AdminMember a " +
            "left join fetch a.adminAuth " +
            "left join fetch a.campus " +
            "left join fetch a.memberStatus " +
            "where a.id = :id")
    AdminMember findAdminMemberById(@Param("id") String id);
    
    // 잡코디 목록 반환
    @Query("select new kr.sesaclink.domain.member.dto.JobCoordinatorDTO(" +
            "a.adminNo, a.name) " +
            "from AdminMember a " +
            "where a.adminAuth.authName = 'JOB_COORDINATOR'" +
            "and a.campus.campusNo = :campusNo")
    List<JobCoordinatorDTO> getJobCoordinatorList(Integer campusNo);
}
