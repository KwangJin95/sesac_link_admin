package kr.sesaclink.global.exception;

import kr.sesaclink.global.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
@RestControllerAdvice
@RequiredArgsConstructor
@Log4j2
public class ControllerExceptionHandler {

    private final MessageService messageService;

    @ExceptionHandler(AccessDeniedException.class)
    public String handleAccessDeniedException(AccessDeniedException accessDeniedException,
                                              RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("message",
                messageService.getMessage("error.access_denied"));
        return "redirect:/";
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public String handleNoResourceFoundException(NoResourceFoundException noResourceFoundException,
                                                 RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("message",
                messageService.getMessage("error.no_resource_found"));
        return "redirect:/";
    }
}
