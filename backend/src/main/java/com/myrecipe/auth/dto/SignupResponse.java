package com.myrecipe.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupResponse {
    private Long userId;
    private String nickname;
    private String handle;
    private TokenPair tokens;
}
