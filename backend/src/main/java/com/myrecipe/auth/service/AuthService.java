package com.myrecipe.auth.service;

import com.myrecipe.auth.dto.SignupResponse;
import com.myrecipe.auth.dto.SignupUserResponse;
import com.myrecipe.auth.refresh.domain.RefreshToken;
import com.myrecipe.auth.refresh.service.RefreshTokenService;
import com.myrecipe.common.exception.client.DuplicateEmailException;
import com.myrecipe.common.exception.client.UnauthorizedException;
import com.myrecipe.security.jwt.JwtTokenProvider;
import com.myrecipe.security.jwt.TokenPair;
import com.myrecipe.user.domain.User;
import com.myrecipe.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;

    public SignupResponse signup(String email, String password, String nickname){
        String encodedPassword = passwordEncoder.encode(password);
        String handle = generateHandle();

        User user = User.builder().email(email).password(encodedPassword).nickname(nickname).handle(handle).build();
        User savedUser;

        try {
            savedUser = userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateEmailException("이미 사용 중인 이메일입니다.");
        }

        TokenPair tokens = jwtTokenProvider.issueTokens(savedUser.getId(), savedUser.getRole().name());

        refreshTokenService.save(tokens.getRefreshToken(), savedUser.getId(), jwtTokenProvider.calculateRefreshTokenExpiry());

        return new SignupResponse(new SignupUserResponse(savedUser.getId(), savedUser.getNickname(), savedUser.getHandle()), tokens);
    }

    public TokenPair refresh(String refreshToken){
        // 파싱
        Claims claims = jwtTokenProvider.parseClaims(refreshToken);

        // 리프레시 토큰 타입 검증
        if(!jwtTokenProvider.isRefreshToken(claims)){
            throw new UnauthorizedException("Refresh 토큰이 아닙니다.");
        }
        
        // DB에 존재하고 만료가 안됐는지 검사
        RefreshToken savedToken = refreshTokenService.validateExistsAndNotExpired(refreshToken);
        
        // 토큰 정보 추출
        Long userId = savedToken.getUserId();
        String role = jwtTokenProvider.getRole(claims);

        // 새 토큰 발급
        TokenPair newTokens = jwtTokenProvider.issueTokens(userId, role);
    
        // 기존 Refresh 토큰 폐기 + 신규 Refresh 토큰 저장
        refreshTokenService.rotate(refreshToken, newTokens.getRefreshToken(), userId, jwtTokenProvider.calculateRefreshTokenExpiry());

        return newTokens;
    }

    public void logout(String refreshToken){
        Claims claims = jwtTokenProvider.parseClaims(refreshToken);

        if(!jwtTokenProvider.isRefreshToken(claims)){
            throw new UnauthorizedException("Refresh Token이 아닙니다.");
        }

        refreshTokenService.delete(refreshToken);
    }

    private String generateHandle(){
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        int random = ThreadLocalRandom.current().nextInt(10000,100000);
        return "user_" + timestamp + random;
    }

}
