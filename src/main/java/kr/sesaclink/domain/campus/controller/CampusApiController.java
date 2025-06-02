package kr.sesaclink.domain.campus.controller;

import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.campus.service.CampusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/campus")
@RequiredArgsConstructor
@Log4j2
public class CampusApiController {

    private final CampusService campusService;

    // 캠퍼스 목록 조회
    @GetMapping
    public List<Campus> getCampusList() {
        return campusService.getCampusList();
    }
}
