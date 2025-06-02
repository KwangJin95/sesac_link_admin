package kr.sesaclink.domain.reservation.repository;

import kr.sesaclink.domain.reservation.entity.Space;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Integer> {
    // 공간 목록 조회
    @Query("select s " +
            "from Space s " +
            "left join fetch s.adminMember " +
            "where s.campus.campusNo = :campusNo " +
            "and s.spaceStatus.statusName = 'ENABLED'")
    Page<Space> findByCampusNo(@Param("campusNo") Integer campusNo,
                               Pageable pageable);

    // 공간 목록 조회
    @Query("select s " +
            "from Space s " +
            "left join fetch s.adminMember " +
            "where s.campus.campusNo = :campusNo " +
            "and s.spaceStatus.statusName = 'ENABLED'")
    List<Space> findByCampusNo(@Param("campusNo") Integer campusNo);

    // 공간 및 공간 상태 조회
    @Query("select s " +
            "from Space s " +
            "left join fetch s.spaceStatus " +
            "where s.spaceNo = :spaceNo")
    Optional<Space> findWithSpaceStatusBySpaceNo(Integer spaceNo);

}
