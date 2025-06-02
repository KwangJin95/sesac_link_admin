package kr.sesaclink.domain.campus.service;

import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.campus.repository.CampusRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class CampusServiceImpl implements CampusService {

    private final CampusRepository campusRepository;

    // 캠퍼스 목록 조회
    @Override
    public List<Campus> getCampusList() {
        return campusRepository.findAll();
    }
}
