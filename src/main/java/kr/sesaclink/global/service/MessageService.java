package kr.sesaclink.global.service;

public interface MessageService {
    // 코드로 메시지 반환
    String getMessage(String code);

    // 코드, 파라미터 포함 메시지 반환
    String getMessage(String code, Object[] args);
}
