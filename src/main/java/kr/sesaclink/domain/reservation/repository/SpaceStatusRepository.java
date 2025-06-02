package kr.sesaclink.domain.reservation.repository;

import kr.sesaclink.domain.reservation.entity.SpaceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceStatusRepository extends JpaRepository<SpaceStatus, Integer> {
    // 공간 상태 조회
    @Query("select s " +
            "from SpaceStatus s " +
            "where s.statusName = :statusName")
    SpaceStatus findByStatusName(String statusName);
}
