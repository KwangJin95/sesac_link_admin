package kr.sesaclink.domain.reservation.repository;

import kr.sesaclink.domain.reservation.entity.AdviceReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdviceReservationRepository extends JpaRepository<AdviceReservation, Long> {
    // 상담 예약 목록 조회(일별)
    @Query("select ar " +
            "from AdviceReservation ar " +
            "left join fetch ar.reservationStatus " +
            "left join fetch ar.userMember u " +
            "left join fetch u.userAuth " +
            "left join fetch ar.jobAdminMember j " +
            "left join fetch ar.adminMember a " +
            "left join fetch a.adminAuth " +
            "left join fetch ar.statusAdminMember sa " +
            "left join fetch sa.adminAuth " +
            "where ar.jobAdminMember.adminNo = :jobAdminNo " +
            "and ar.resDate = :resDate " +
            "and ar.reservationStatus.statusName like :statusName " +
            "order by ar.startTime, " +
                     "ar.reservationStatus.reservationStatusNo "
    )
    List<AdviceReservation> getAdviceReservationByJobAdminNoAndResDate(@Param("jobAdminNo") Long jobAdminNo,
                                                                       @Param("resDate") LocalDate resDate,
                                                                       @Param("statusName") String statusName);

    // 상담 예약 목록 조회(기간별)
    @Query("select ar " +
            "from AdviceReservation ar " +
            "left join fetch ar.reservationStatus " +
            "left join fetch ar.userMember u " +
            "left join fetch u.userAuth " +
            "left join fetch ar.adminMember a " +
            "left join fetch a.adminAuth " +
            "left join fetch ar.statusAdminMember sa " +
            "left join fetch sa.adminAuth " +
            "where ar.jobAdminMember.adminNo = :jobAdminNo " +
            "and ar.resDate >= :startDate " +
            "and ar.resDate <= :endDate " +
            "and ar.reservationStatus.statusName like :statusName " +
            "order by ar.resDate, " +
            "ar.startTime, " +
            "ar.reservationStatus.reservationStatusNo "
    )
    List<AdviceReservation> getAdviceReservationByJobAdminNoBetweenStartDateAndEndDate(@Param("jobAdminNo") Long jobAdminNo,
                                                                                       @Param("startDate") LocalDate startDate,
                                                                                       @Param("endDate") LocalDate endDate,
                                                                                       @Param("statusName") String statusName);

    // 취소를 제외한 상담 예약 목록
    @Query("select ar " +
            "from AdviceReservation ar " +
            "left join fetch ar.reservationStatus " +
            "where ar.jobAdminMember.adminNo = :jobAdminNo " +
            "and ar.resDate = :resDate " +
            "and ar.startTime < :endTime " +
            "and ar.endTime > :startTime " +
            "and ar.reservationStatus.statusName != 'CANCELED'")
    List<AdviceReservation> getAdviceReservationByJobAdminNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(@Param("jobAdminNo") Long jobAdminNo,
                                                                                                                     @Param("resDate") LocalDate resDate,
                                                                                                                     @Param("startTime") LocalTime startTime,
                                                                                                                     @Param("endTime") LocalTime endTime);

    // 예약 상태와 함께 가져오기
    @Query("select ar " +
            "from AdviceReservation ar " +
            "left join fetch ar.reservationStatus " +
            "where ar.adviceReservationNo = :adviceReservationNo ")
    Optional<AdviceReservation> findWithReservationStatusByAdviceReservationNo(@Param("adviceReservationNo") Long adviceReservationNo);
}
