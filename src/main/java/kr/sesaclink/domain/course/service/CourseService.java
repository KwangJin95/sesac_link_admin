package kr.sesaclink.domain.course.service;

import kr.sesaclink.domain.course.dto.CourseDTO;
import kr.sesaclink.domain.course.dto.CourseSearchDTO;

import java.util.List;

public interface CourseService {
    // 캠퍼스별 강좌 목록 조회
    List<CourseSearchDTO> getCourseListByCampus(Integer campusNo);

    // 회원 등록 강좌 목록 조회
    List<CourseDTO> getCourseListByUserNo(Long userNo);

    // 새싹 회원 등록 강좌 목록 조회
    List<CourseDTO> getCourseListByEmail(String email);

    // 강좌 반환
    CourseDTO getCourseByCourseNo(Integer courseNo);
}
