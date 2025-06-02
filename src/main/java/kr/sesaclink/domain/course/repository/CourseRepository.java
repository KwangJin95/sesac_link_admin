package kr.sesaclink.domain.course.repository;

import kr.sesaclink.domain.course.dto.CourseDTO;
import kr.sesaclink.domain.course.dto.CourseSearchDTO;
import kr.sesaclink.domain.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    // 캠퍼스별 강좌 목록 조회
    @Query("select new kr.sesaclink.domain.course.dto.CourseSearchDTO(" +
            "c.courseNo, c.courseName) " +
           "from Course c " +
           "where c.campus.campusNo = :campusNo")
    List<CourseSearchDTO> getCourseListByCampusNo(@Param("campusNo") Integer campusNo);

    // 회원 등록 강좌 목록 조회
    @Query("select new kr.sesaclink.domain.course.dto.CourseDTO(" +
            "c.courseNo, c.courseName, c.teacher, c.startDate, c.endDate) " +
            "from Course c " +
            "where c.courseNo in (select u.course.courseNo " +
                                   "from UserCourse u " +
                                   "where u.userMember.userNo = :userNo)")
    List<CourseDTO> getCourseListByUserNo(@Param("userNo") Long userNo);

    // 새싹 회원 등록 강좌 목록 조회
    @Query("select new kr.sesaclink.domain.course.dto.CourseDTO(" +
            "c.courseNo, c.courseName, c.teacher, c.startDate, c.endDate) " +
            "from Course c " +
            "where c.courseNo in (select s.course.courseNo " +
                                   "from SesacUserCourse s " +
                                   "where s.sesacUserMember.email = :email)")
    List<CourseDTO> getCourseListByEmail(@Param("email") String email);

    // 강좌 반환
    @Query("select new kr.sesaclink.domain.course.dto.CourseDTO(" +
            "c.courseNo, c.courseName, c.teacher, c.startDate, c.endDate) " +
            "from Course c " +
            "where c.courseNo = :courseNo")
    CourseDTO findByCourseNo(Integer courseNo);
}
