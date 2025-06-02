package kr.sesaclink.global.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageSource messageSource;

    // 코드로 메시지 반환
    @Override
    public String getMessage(String code) {
        return messageSource.getMessage(code, null, null);
    }

    // 코드, 파라미터 포함 메시지 반환
    @Override
    public String getMessage(String code, Object[] args) {
        return messageSource.getMessage(code, args, null);
    }
}
