package kr.sesaclink.domain.course.controller;

import kr.sesaclink.domain.course.dto.CourseDTO;
import kr.sesaclink.domain.course.dto.CourseSearchDTO;
import kr.sesaclink.domain.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/course")
public class CourseApiController {

    private final CourseService courseService;

    // 캠퍼스별 강좌 목록 조회
    @GetMapping("/campus")
    public List<CourseSearchDTO> getCourseListByCampusNo(@RequestParam Integer campusNo) {
        return courseService.getCourseListByCampus(campusNo);
    }
    // 회원 등록 강좌 목록 조회
    @GetMapping("/user")
    public List<CourseDTO> getCourseListByUserNo(@RequestParam Long userNo) {
        return courseService.getCourseListByUserNo(userNo);
    }
    // 새싹 회원 등록 강좌 목록 조회
    @GetMapping("/email")
    public List<CourseDTO> getCourseListByEmail(@RequestParam String email) {
        return courseService.getCourseListByEmail(email);
    }
    // 강좌 반환
    @GetMapping
    public CourseDTO getCourseByCourseNo(@RequestParam Integer courseNo) {
        return courseService.getCourseByCourseNo(courseNo);
    }
}
