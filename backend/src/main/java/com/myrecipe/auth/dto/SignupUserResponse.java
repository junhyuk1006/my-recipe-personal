package com.myrecipe.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupUserResponse {
    private Long id;
    private String nickname;
    private String handle;
}
