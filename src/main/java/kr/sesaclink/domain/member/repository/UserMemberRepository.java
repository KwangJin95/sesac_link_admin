package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.member.entity.UserMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMemberRepository extends JpaRepository<UserMember, Long> {

    // UserMember join fetch all by userNo
    @Query("select u " +
            "from UserMember u " +
            "left join fetch u.userAuth " +
            "left join fetch u.adminMember " +
            "left join fetch u.campus " +
            "left join fetch u.memberStatus " +
            "where u.userNo = :userNo")
    UserMember findUserMemberByUserNo(@Param("userNo") Long userNo);
}
