package kr.sesaclink.repository;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class SesacStudentCourseRepositoryTests {

    /*
    @Autowired
    SesacStudentCourseRepository sesacStudentCourseRepository;

    // 새싹 회원 번호로 새싹 강좌 목록 조회
    @Test
    @Transactional
    public void getCourseListBySesacUserNoTest() {

        List<Object[]> resultList = sesacStudentCourseRepository.getCourseListBySesacUserNo(1L).orElseThrow();

        List<CourseDTO> courseDTOList = resultList.stream().map(result ->
                CourseDTO.builder()
                    .courseId(((Course) result[0]).getCourseId())
                    .courseName(((Course) result[0]).getName())
                    .teacher(((Course) result[0]).getTeacher())
                    .startDate(((Course) result[0]).getStartDate())
                    .endDate(((Course) result[0]).getEndDate())
                    .campusId(((Campus) result[1]).getCampusId())
                    .campusName(((Campus) result[1]).getName())
                    .build()
        ).collect(Collectors.toList());

        courseDTOList.forEach(course -> {
           log.info("강좌명 : " + course.getCourseName());
           log.info("강사명 : " + course.getTeacher());
           log.info("시작 날짜 : " + course.getStartDate());
           log.info("종료 날짜 : " + course.getEndDate());
           log.info("-------------------------------");
        });


    }

     */
}
