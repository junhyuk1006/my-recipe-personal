package com.myrecipe.common.handler;

import com.myrecipe.common.dto.ErrorResponse;
import com.myrecipe.common.exception.client.DuplicateEmailException;
import com.myrecipe.common.exception.client.ResourceNotFoundException;
import com.myrecipe.common.exception.client.UnauthorizedException;
import com.myrecipe.common.exception.server.DataPersistenceException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.UUID;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    /**
     * UnauthorizedException 처리 (HTTP 401 Unauthorized)
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException ex, HttpServletRequest request) {
        // 예외 발생 시 분석을 위한 로깅
        String traceId = generateTraceId();
        log.warn("[{}] Unauthorized access attempt: Message='{}', ErrorCode='{}'",
                traceId, ex.getMessage(), ex.getErrorCode(), ex);

        // 에러 응답
        ErrorResponse errorResponse = ErrorResponse.of(
                HttpStatus.UNAUTHORIZED,
                ex.getErrorCode(),
                ex.getMessage(),
                request.getRequestURI(),
                traceId
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    /**
     * ResourceNotFoundException 처리 (HTTP 404 Not Found)
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex, HttpServletRequest request) {
        // 예외 발생 시 분석을 위한 로깅
        String traceId = generateTraceId();
        log.warn("[{}] Resource not found: Message='{}', ErrorCode='{}'",
                traceId, ex.getMessage(), ex.getErrorCode(), ex);

        // 에러 응답
        ErrorResponse errorResponse = ErrorResponse.of(
                HttpStatus.NOT_FOUND,
                ex.getErrorCode(),
                ex.getMessage(),
                request.getRequestURI(),
                traceId
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    /**
     * DataPersistenceException (데이터 처리 오류) 처리 (HTTP 500 Internal Server Error)
     */
    @ExceptionHandler(DataPersistenceException.class)
    public ResponseEntity<ErrorResponse> handleDataPersistenceException(DataPersistenceException ex, HttpServletRequest request) {
        // 예외 발생 시 분석을 위한 로깅
        String traceId = generateTraceId();
        log.error("[{}] Data Persistence Error: Message='{}', ErrorCode='{}'",
                traceId, ex.getMessage(), ex.getErrorCode(), ex);

        // 에러 응답
        ErrorResponse errorResponse = ErrorResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ex.getErrorCode(),
                ex.getMessage(),
                request.getRequestURI(),
                traceId
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * MethodArgumentNotValidException (DTO 유효성 검사 실패) 처리 (HTTP 400 Bad Request)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        // 예외 메시지 파싱
        String defaultMessage = "유효성 검사 실패: ";
        String detailedMessage = ex.getBindingResult().getAllErrors().stream()
                .map(error -> (error instanceof FieldError) ? ((FieldError) error).getField() + " - " + error.getDefaultMessage() : error.getDefaultMessage())
                .reduce((msg1, msg2) -> msg1 + "; " + msg2)
                .orElse(defaultMessage);

        // 예외 발생 시 분석을 위한 로깅
        String traceId = generateTraceId();
        log.warn("[{}] Validation failed: Message='{}', Path='{}'",
                traceId, detailedMessage, request.getRequestURI(), ex);

        // 에러 응답
        ErrorResponse errorResponse = ErrorResponse.of(
                HttpStatus.BAD_REQUEST,
                "ERR_VALIDATION_FAILED",
                detailedMessage,
                request.getRequestURI(),
                traceId
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    /**
     * DataIntegrityViolationException 이메일 UNIQUE 위반
     */
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateEmailException(
            DuplicateEmailException ex,
            HttpServletRequest request
    ){
        String traceId = generateTraceId();

        log.warn("[{}] Duplicate: Message='{}', Path='{}",
                traceId, ex.getMessage(), request.getRequestURI(), ex);

        ErrorResponse errorResponse = ErrorResponse.of(
                HttpStatus.BAD_REQUEST,
                ex.getErrorCode(),
                ex.getMessage(),
                request.getRequestURI(),
                traceId
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * RuntimeException (포괄적인 런타임 예외) 처리 (HTTP 500 Internal Server Error)
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleAllUncaughtRuntimeException(RuntimeException ex, HttpServletRequest request) {
        // 예외 발생 시 분석을 위한 로깅
        String traceId = generateTraceId();
        log.error("[{}] An unexpected runtime error occurred: Message='{}', Path='{}'",
                traceId, ex.getMessage(), request.getRequestURI(), ex);

        // 에러 응답
        ErrorResponse errorResponse = ErrorResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "ERR_UNEXPECTED_RUNTIME",
                "서버 내부 오류가 발생했습니다.",
                request.getRequestURI(),
                traceId
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Exception (포괄적인 예외) 처리 (HTTP 500 Internal Server Error)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllUncaughtException(Exception ex, HttpServletRequest request) {
        // 예외 발생 시 분석을 위한 로깅
        String traceId = generateTraceId();
        log.error("[{}] An unexpected server error occurred: Message='{}', Path='{}'",
                traceId, ex.getMessage(), request.getRequestURI(), ex);

        // 에러 응답
        ErrorResponse errorResponse = ErrorResponse.of(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "ERR_COMMON_INTERNAL_SERVER_ERROR",
                "서버 내부 오류가 발생했습니다.",
                request.getRequestURI(),
                traceId
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 로그 추적을 위한 고유 식별 id (예: 550e84)
    private String generateTraceId() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 6);
    }
}
