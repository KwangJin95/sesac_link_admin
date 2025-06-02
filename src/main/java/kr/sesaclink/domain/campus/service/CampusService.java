package kr.sesaclink.domain.campus.service;

import kr.sesaclink.domain.campus.entity.Campus;

import java.util.List;

public interface CampusService {
    // 캠퍼스 목록 조회
    List<Campus> getCampusList();
}
