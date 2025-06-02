package kr.sesaclink.global.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Log4j2
public class CustomFileUtil {

    @Value("${kr.sesaclink.upload.path}")
    private String uploadPath;

    // upload 폴더 및 하위 폴더 생성
    @PostConstruct
    public void init() {

        // upload 폴더
        File tempFolder = new File(uploadPath);

        if (!tempFolder.exists())
            tempFolder.mkdir();

        // profile_images 폴더
        File profileImageFolder = new File(uploadPath + File.separator + "profile_images");

        if (!profileImageFolder.exists())
            profileImageFolder.mkdir();

        // space_images 폴더
        File spaceImageFolder = new File(uploadPath + File.separator + "space_images");

        if (!spaceImageFolder.exists())
            spaceImageFolder.mkdir();

        // advice_files 폴더
        File adviceFileFolder = new File(uploadPath + File.separator + "advice_files");

        if (!adviceFileFolder.exists())
            adviceFileFolder.mkdir();

        uploadPath = tempFolder.getAbsolutePath();

        log.info("uploadPath : " + uploadPath);
    }

    // 파일 저장 - 파일명 반환
    public String saveFile(MultipartFile file, String directory) throws RuntimeException {

        if (file == null || file.isEmpty()) {
            return "";
        }

        String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        Path savePath = Paths.get(uploadPath, directory, savedName);

        try {
            // 파일 저장
            Files.copy(file.getInputStream(), savePath);

        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
        return savedName;
    }

    // 파일 조회
    public ResponseEntity<Resource> getFile(String fileName, String directory) {

        Resource resource = new FileSystemResource(uploadPath
                + File.separator + directory
                + File.separator + fileName);

        if (!resource.isReadable()) {
            resource = new FileSystemResource(uploadPath + File.separator + "defaultImage.jpg");
            fileName = "defaultImage.jpg"; // 파일명도 수정
        }

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));

            // 파일 다운로드
            if ("advice_files".equals(directory)) {
                // UUID 제거 (_ 기준 분리)
                String originalFilename = fileName.substring(fileName.indexOf("_") + 1);

                String encodedFilename = URLEncoder.encode(originalFilename, StandardCharsets.UTF_8)
                        .replaceAll("\\+", "%20"); // 공백 처리

                headers.add("Content-Disposition", "attachment; filename=\"" + encodedFilename + "\"");
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    // 파일 삭제
    public void deleteFile(String fileName, String directory) {
        if (fileName == null || fileName.isEmpty()) {
            return ;
        }

        Path filePath = Paths.get(uploadPath, directory, fileName);

        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // 파일 임시 저장 - path 반환
    public String saveFileReturnPath(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return "";
        }

        String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        Path savePath = Paths.get(uploadPath, savedName);

        try {
            // 파일 저장
            file.transferTo(savePath.toFile());
        } catch (IOException e) {
            throw new RuntimeException();
        }
        return savePath.toFile().getAbsolutePath();
    }
}