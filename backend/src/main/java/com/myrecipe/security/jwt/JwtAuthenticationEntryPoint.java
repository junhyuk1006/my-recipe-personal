package com.myrecipe.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myrecipe.common.dto.ErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;
import java.util.UUID;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json;charset=UTF-8");

        ErrorResponse body = ErrorResponse.of(
                HttpStatus.UNAUTHORIZED,
                "UNAUTHORIZED"
                ,"인증이 필요합니다"
                ,request.getRequestURI()
                ,UUID.randomUUID().toString().replace("-", "").substring(0, 6)
        );

        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}
