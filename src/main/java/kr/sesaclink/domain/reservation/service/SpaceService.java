package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceDTO;
import kr.sesaclink.domain.reservation.dto.SpaceRegisterDTO;
import kr.sesaclink.domain.reservation.dto.SpaceUpdateDTO;
import kr.sesaclink.global.dto.PageResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SpaceService {
    // 공간 목록 조회
    PageResponseDTO<SpaceDTO> getSpaceList(Integer page, Integer size, Integer campusNo);

    // 공간 등록
    boolean registerSpace(SpaceRegisterDTO spaceRegisterDTO, MultipartFile spaceImageFile);

    // 공간 수정
    boolean updateSpace(SpaceUpdateDTO spaceUpdateDTO, MultipartFile spaceImageFile);

    // 공간 삭제
    boolean deleteSpace(Integer spaceNo);

    // 캠퍼스별 공간 목록 조회
    List<SpaceDTO> getSpaceList(Integer campusNo);
}
