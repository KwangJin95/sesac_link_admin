package kr.sesaclink.domain.reservation.repository;

import kr.sesaclink.domain.reservation.entity.SpaceReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SpaceReservationRepository extends JpaRepository<SpaceReservation, Long> {
    // 공간 예약 목록 조회(일별)
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "left join fetch sr.space s " +
            "left join fetch sr.userMember u " +
            "left join fetch u.userAuth " +
            "left join fetch sr.adminMember a " +
            "left join fetch a.adminAuth " +
            "left join fetch sr.statusAdminMember sa " +
            "left join fetch sa.adminAuth " +
            "where s.spaceNo = :spaceNo " +
            "and sr.resDate = :resDate " +
            "and sr.reservationStatus.statusName like :statusName " +
            "order by sr.startTime, " +
                     "sr.reservationStatus.reservationStatusNo "
    )
    List<SpaceReservation> getSpaceReservationBySpaceNoAndResDate(@Param("spaceNo") Integer spaceNo,
                                                                  @Param("resDate") LocalDate resDate,
                                                                  @Param("statusName") String statusName);

    // 공간 예약 목록 조회(기간별)
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "left join fetch sr.space s " +
            "left join fetch sr.userMember u " +
            "left join fetch u.userAuth " +
            "left join fetch sr.adminMember a " +
            "left join fetch a.adminAuth " +
            "left join fetch sr.statusAdminMember sa " +
            "left join fetch sa.adminAuth " +
            "where s.spaceNo = :spaceNo " +
            "and sr.resDate >= :startDate " +
            "and sr.resDate <= :endDate " +
            "and sr.reservationStatus.statusName like :statusName " +
            "order by sr.resDate, " +
            "sr.startTime, " +
            "sr.reservationStatus.reservationStatusNo "
    )
    List<SpaceReservation> getSpaceReservationBySpaceNoBetweenStartDateAndEndDate(@Param("spaceNo") Integer spaceNo,
                                                                                  @Param("startDate") LocalDate startDate,
                                                                                  @Param("endDate") LocalDate endDate,
                                                                                  @Param("statusName") String statusName);


    // 공간 예약 목록 전체 갯수
    @Query("select count(sr) " +
            "from SpaceReservation sr " +
            "where sr.space.spaceNo = :spaceNo " +
            "and sr.resDate >= :resDateStart " +
            "and sr.resDate <= :resDateEnd " +
            "and sr.reservationStatus.statusName like :statusName "
    )
    Long getSpaceReservationCountBySpaceNoAndResDate(@Param("spaceNo") Integer spaceNo,
                                                    @Param("resDateStart") LocalDate resDateStart,
                                                    @Param("resDateEnd") LocalDate resDateEnd,
                                                    @Param("statusName") String statusName);

    // 취소를 제외한 공간 예약 목록
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "where sr.space.spaceNo = :spaceNo " +
            "and sr.resDate = :resDate " +
            "and sr.startTime < :endTime " +
            "and sr.endTime > :startTime " +
            "and sr.reservationStatus.statusName != 'CANCELED'")
    List<SpaceReservation> getSpaceReservationBySpaceNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(@Param("spaceNo") Integer spaceNo,
                                                                                                                @Param("resDate") LocalDate resDate,
                                                                                                                @Param("startTime") LocalTime startTime,
                                                                                                                @Param("endTime") LocalTime endTime);

    // 예약 상태와 함께 가져오기
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "where sr.spaceReservationNo = :spaceReservationNo ")
    Optional<SpaceReservation> findWithReservationStatusBySpaceReservationNo(@Param("spaceReservationNo") Long spaceReservationNo);
}
