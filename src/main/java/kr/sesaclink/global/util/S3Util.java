package kr.sesaclink.global.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
@Log4j2
public class S3Util {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // S3로 파일 업로드
    public String upload(String filePath, String directory) throws RuntimeException {
        File targetFile = new File(filePath);

        String key = directory + "/" + targetFile.getName(); // 폴더명 + 파일명

        putS3(targetFile, key);

        removeOriginalFile(targetFile);

        return targetFile.getName();
    }

    // S3로 업로드
    private void putS3(File uploadFile, String key) throws RuntimeException {
        amazonS3.putObject(new PutObjectRequest(bucket,
                key,
                uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));

    }

    // S3 업로드 후 원본 파일 삭제
    private void removeOriginalFile(File targetFile) {
        if (targetFile == null || !targetFile.exists()) {
            return ;
        }
        targetFile.delete();
    }
    
    // S3 파일 삭제
    public void removeS3File(String fileName) {
        final DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucket, fileName);
        amazonS3.deleteObject(deleteObjectRequest);
    }

    // S3 파일 조회
    public ResponseEntity<Resource> getFileFromS3(String fileName, String directory) {

        String key = fileName;

        if (directory != null && !directory.equals("")) {
            key = directory + "/" + fileName;
        }

        log.info("S3 파일 조회 - directory: {}, fileName: {}, key: {}", directory, fileName, key);

        try {
            // S3에서 객체 가져오기
            GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, key);
            S3Object s3Object = amazonS3.getObject(getObjectRequest);

            InputStreamResource resource = new InputStreamResource(s3Object.getObjectContent());

            HttpHeaders headers = new HttpHeaders();

            // 컨텐츠 타입 (S3 객체 메타데이터에서 가져오기)
            String contentType = s3Object.getObjectMetadata().getContentType();
            if (contentType == null || contentType.isEmpty()) {
                contentType = "application/octet-stream";
            }

            headers.add("Content-Type", contentType);

            // 다운로드 처리
            if ("advice_files".equals(directory)) {
                String originalFilename = fileName.contains("_") ? fileName.substring(fileName.indexOf("_") + 1) : fileName;

                String encodedFilename = URLEncoder.encode(originalFilename, StandardCharsets.UTF_8)
                        .replaceAll("\\+", "%20");

                headers.add("Content-Disposition", "attachment; filename=\"" + encodedFilename + "\"");
            }

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);

        } catch (AmazonS3Exception e) {
            log.error("S3 에러: StatusCode={}, ErrorCode={}, Message={}",
                    e.getStatusCode(), e.getErrorCode(), e.getMessage());

            if (e.getStatusCode() == 404 && !"defaultImage.jpg".equals(fileName)) {
                return getFileFromS3("defaultImage.jpg", null);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}