package com.myrecipe.auth.refresh.service;


import com.myrecipe.auth.refresh.domain.RefreshToken;
import com.myrecipe.auth.refresh.repository.RefreshTokenRepository;


import com.myrecipe.common.exception.client.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public void save(String token, Long userId, Instant expiresAt){
        refreshTokenRepository.save(RefreshToken.builder().token(token).userId(userId).expiresAt(expiresAt).build());
    }

    public RefreshToken validateExistsAndNotExpired(String refreshToken){
        RefreshToken savedToken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new UnauthorizedException("Refresh Token이 유효하지 않습니다."));
        
        if(savedToken.isExpired()){
            throw new UnauthorizedException("Refresh Token이 만료되었습니다.");
        }
        return savedToken;
    }

    @Transactional
    public void rotate(String oldRefreshToken, String newRefreshToken, Long userId, Instant expiresAt){
        refreshTokenRepository.deleteByToken(oldRefreshToken);
        refreshTokenRepository.save(RefreshToken.builder().token(newRefreshToken).userId(userId).expiresAt(expiresAt).build());
    }

    public void delete(String refreshToken){
        RefreshToken savedToken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new UnauthorizedException("Refresh Token이 유효하지 않습니다."));

        refreshTokenRepository.delete(savedToken);
    }
}