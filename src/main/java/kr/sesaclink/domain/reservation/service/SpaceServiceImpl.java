package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceDTO;
import kr.sesaclink.domain.reservation.dto.SpaceRegisterDTO;
import kr.sesaclink.domain.reservation.dto.SpaceUpdateDTO;
import kr.sesaclink.domain.reservation.entity.Space;
import kr.sesaclink.domain.reservation.repository.SpaceRepository;
import kr.sesaclink.domain.reservation.repository.SpaceStatusRepository;
import kr.sesaclink.global.dto.PageResponseDTO;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class SpaceServiceImpl implements SpaceService {

    private final SpaceRepository spaceRepository;

    private final SpaceStatusRepository spaceStatusRepository;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 공간 목록 조회
    @Override
    public PageResponseDTO<SpaceDTO> getSpaceList(Integer page, Integer size, Integer campusNo) {

        Pageable pageable = PageRequest.of(page - 1,
                                           size,
                                           Sort.by("spaceNo").descending());

        Page<Space> result = spaceRepository.findByCampusNo(campusNo, pageable);

        List<SpaceDTO> spaceDTOList = result.getContent().stream()
                .map(space -> new SpaceDTO(space))
                .collect(Collectors.toList());

        return new PageResponseDTO<>(page,
                                     size,
                                     spaceDTOList,
                                     (int) result.getTotalElements());
    }

    // 공간 등록
    @Override
    @Transactional
    public boolean registerSpace(SpaceRegisterDTO spaceRegisterDTO, MultipartFile spaceImageFile) {

        // 새로 등록된 공간 엔티티
        Space registeredSpace;

        // 새로 저장할 파일 이름
        String fileName;

        try {
            // file 존재
            if (spaceImageFile != null && !spaceImageFile.isEmpty()) {

                // 파일 저장
                if ("dev".equals(activeProfile)) {
                    fileName = customFileUtil.saveFile(spaceImageFile, "space_images");
                } else {
                    fileName = s3Util.upload(customFileUtil.saveFileReturnPath(spaceImageFile), "space_images");
                }

                // 실제 저장된 공간 이미지 이름
                spaceRegisterDTO.setSpaceImage(fileName);
            }

            Space space = new Space(spaceRegisterDTO);

            // 공간 상태 ENABLED
            space.changeSpaceStatus(spaceStatusRepository.findByStatusName("ENABLED"));

            registeredSpace = spaceRepository.save(space);

        } catch (Exception e) {
            return false;
        }

        return registeredSpace.getSpaceNo() != null;
    }

    // 공간 수정
    @Override
    public boolean updateSpace(SpaceUpdateDTO spaceUpdateDTO, MultipartFile spaceImageFile) {

        Space space = spaceRepository.findById(spaceUpdateDTO.getSpaceNo()).orElseThrow();
        
        // 수정된 공간 엔티티
        Space updatedSpace;

        space.changeSpaceName(spaceUpdateDTO.getSpaceName());
        space.changeWhiteBoard(spaceUpdateDTO.getWhiteBoard());
        space.changeBeamProjector(spaceUpdateDTO.getBeamProjector());
        space.changePeopleCount(spaceUpdateDTO.getPeopleCount());
        space.changeSpaceAvailableStartTime(spaceUpdateDTO.getSpaceAvailableStartTime());
        space.changeSpaceAvailableEndTime(spaceUpdateDTO.getSpaceAvailableEndTime());

        // 새로 저장할 파일 이름
        String fileName;

        try {
            // file 존재
            if (spaceImageFile != null && !spaceImageFile.isEmpty()) {

                // 기존 파일 삭제
                if (space.getSpaceImage() != null) {
                    if ("dev".equals(activeProfile)) {
                        customFileUtil.deleteFile(space.getSpaceImage(), "space_images");
                    } else {
                        s3Util.removeS3File("space_images/" + space.getSpaceImage());
                    }
                }

                // 파일 저장
                if ("dev".equals(activeProfile)) {
                    fileName = customFileUtil.saveFile(spaceImageFile, "space_images");
                } else {
                    fileName = s3Util.upload(customFileUtil.saveFileReturnPath(spaceImageFile), "space_images");
                }

                // 실제 저장된 공간 이미지 이름
                space.changeSpaceImage(fileName);
            }

            updatedSpace = spaceRepository.save(space);

        } catch (Exception e) {
            return false;
        }

        return (updatedSpace.getSpaceName().equals(space.getSpaceName()) &&
               (updatedSpace.getSpaceImage() != null && space.getSpaceImage() != null ?
                       updatedSpace.getSpaceImage().equals(space.getSpaceImage()) :
                       true
               ) &&
                updatedSpace.getWhiteBoard().equals(space.getWhiteBoard()) &&
                updatedSpace.getBeamProjector().equals(space.getBeamProjector()) &&
                updatedSpace.getPeopleCount().equals(space.getPeopleCount()) &&
                updatedSpace.getSpaceAvailableStartTime().equals(space.getSpaceAvailableStartTime()) &&
                updatedSpace.getSpaceAvailableEndTime().equals(space.getSpaceAvailableEndTime())
        );
    }

    // 공간 삭제
    @Override
    @Transactional
    public boolean deleteSpace(Integer spaceNo) {

        Space space = spaceRepository.findById(spaceNo).orElseThrow();

        // 공간 상태 DISABLED
        space.changeSpaceStatus(spaceStatusRepository.findByStatusName("DISABLED"));

        spaceRepository.save(space);

        // 삭제된 공간 엔티티
        Space deletedSpace = spaceRepository.findWithSpaceStatusBySpaceNo(spaceNo).orElseThrow();

        return "DISABLED".equals(deletedSpace.getSpaceStatus().getStatusName());
    }

    // 공간 목록 조회
    @Override
    public List<SpaceDTO> getSpaceList(Integer campusNo) {

        return spaceRepository.findByCampusNo(campusNo).stream()
                .map(space -> new SpaceDTO(space))
                .collect(Collectors.toList());
    }
}
