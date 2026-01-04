package com.myrecipe.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private final String secretBase64;
    private final long accessExpMinutes;
    private final long refreshExpDays;

    private SecretKey key;

    public JwtTokenProvider(
        @Value("${jwt.secret-base64}") String secretBase64,
        @Value("${jwt.access-exp-minutes}") long accessExpMinutes,
        @Value("${jwt.refresh-exp-days}") long refreshExpDays
    ){
        this.secretBase64 = secretBase64;
        this.accessExpMinutes = accessExpMinutes;
        this.refreshExpDays = refreshExpDays;
    }

    @PostConstruct
    void init(){
        byte[] keyBytes = Decoders.BASE64.decode(secretBase64);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenPair issueTokens(Long userId, String role){
        Instant now = Instant.now();

        Instant accessExp = now.plus(Duration.ofMinutes(accessExpMinutes));
        String accessToken = Jwts.builder()
                                    .subject(String.valueOf(userId))
                                    .claim("role",role)
                                    .claim("type","access")
                                    .issuedAt(Date.from(now))
                                    .expiration(Date.from(accessExp))
                                    .signWith(key)
                                    .compact();

        Instant refreshExp = now.plus(Duration.ofDays(refreshExpDays));
        String refreshToken = Jwts.builder()
                                    .subject(String.valueOf(userId))
                                    .claim("role",role)
                                    .claim("type", "refresh")
                                    .issuedAt(Date.from(now))
                                    .expiration(Date.from(refreshExp))
                                    .signWith(key)
                                    .compact();

        return TokenPair.builder()
                        .tokenType("Bearer")
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .accessExpiresInSeconds(Duration.between(now, accessExp).getSeconds())
                        .build();
    }

    public Claims parseClaims(String token){
        return Jwts.parser()
                        .verifyWith(key) // 서명 검증
                        .build()
                        .parseSignedClaims(token) // 파싱 + 만료 검증
                        .getPayload();
    }

    public Long getUserId(Claims claims){
        return Long.parseLong(claims.getSubject());
    }

    public String getRole(Claims claims){
        return claims.get("role", String.class);
    }

    public boolean isRefreshToken(Claims claims){
        String tokenType = claims.get("type", String.class);
        return "refresh".equals(tokenType);
    }

    public boolean isAccessToken(Claims claims){
        String tokenType = claims.get("type", String.class);
        return "access".equals(tokenType);
    }

    public Instant calculateRefreshTokenExpiry(){
        return Instant.now().plus(Duration.ofDays(refreshExpDays));
    }
}
