package kr.sesaclink.domain.course.repository;

import kr.sesaclink.domain.course.entity.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {

    // 강좌 번호 목록 반환
    @Query("select u.course.courseNo " +
            "from UserCourse u " +
            "where u.userMember.userNo = :userNo")
    List<Integer> getCourseNoByUserNo(Long userNo);

    // 강좌 번호로 목록 반환
    List<UserCourse> findByUserMemberUserNoAndCourseCourseNoIn(Long userNo,
                                                               List<Integer> courseNoList);
}
