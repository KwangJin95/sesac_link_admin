package kr.sesaclink.domain.course.service;

import kr.sesaclink.domain.course.dto.CourseDTO;
import kr.sesaclink.domain.course.dto.CourseSearchDTO;
import kr.sesaclink.domain.course.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    // 캠퍼스별 강좌 목록 조회
    @Override
    @Transactional
    public List<CourseSearchDTO> getCourseListByCampus(Integer campusNo) {
        return courseRepository.getCourseListByCampusNo(campusNo);
    }

    // 회원 등록 강좌 목록 조회
    @Override
    @Transactional
    public List<CourseDTO> getCourseListByUserNo(Long userNo) {
        return courseRepository.getCourseListByUserNo(userNo);
    }

    // 새싹 회원 등록 강좌 목록 조회
    @Override
    @Transactional
    public List<CourseDTO> getCourseListByEmail(String email) {
        return courseRepository.getCourseListByEmail(email);
    }
    // 강좌 반환
    @Override
    public CourseDTO getCourseByCourseNo(Integer courseNo) {
        return courseRepository.findByCourseNo(courseNo);
    }
}
