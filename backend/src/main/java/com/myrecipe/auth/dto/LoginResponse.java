package com.myrecipe.auth.dto;

import com.myrecipe.security.jwt.TokenPair;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    LoginUserResponse user;
    TokenPair token;
}
