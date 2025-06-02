package kr.sesaclink.domain.member.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class AdminAuthDTO {

    private Integer adminAuthNo;

    private String authNameKor;

    public AdminAuthDTO(Integer adminAuthNo, String authName) {
        this.adminAuthNo = adminAuthNo;
        this.authNameKor = switch(authName) {
            case "ADMIN" -> "운영진";
            case "JOB_COORDINATOR" -> "잡코디";
            default -> "";
        };
    }
}
