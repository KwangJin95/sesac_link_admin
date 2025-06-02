package kr.sesaclink.domain.member.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class UserAuthDTO {

    private Integer userAuthNo;

    private String authNameKor;

    public UserAuthDTO(Integer userAuthNo, String authName) {
        this.userAuthNo = userAuthNo;
        this.authNameKor = switch(authName) {
            case "USER" -> "학생";
            default -> "";
        };
    }
}
