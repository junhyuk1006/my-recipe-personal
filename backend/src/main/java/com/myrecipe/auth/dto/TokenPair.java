package com.myrecipe.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenPair {
    private final String tokenType;
    private final String accessToken;
    private final String refreshToken;
    private final long accessExpiresInSeconds;
}
