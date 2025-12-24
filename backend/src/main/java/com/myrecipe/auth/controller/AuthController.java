package com.myrecipe.auth.controller;

import com.myrecipe.auth.dto.LogoutRequest;
import com.myrecipe.auth.dto.RefreshRequest;
import com.myrecipe.auth.dto.SignupRequest;
import com.myrecipe.auth.dto.SignupResponse;
import com.myrecipe.auth.service.AuthService;
import com.myrecipe.security.jwt.TokenPair;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request){
        SignupResponse response = authService.signup(request.getEmail(), request.getPassword(), request.getNickname());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest requset){
        LoginResponse response = authService.login(request.getEmail(), request.getPassward());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenPair> refresh(@RequestBody RefreshRequest request){
        TokenPair tokens = authService.refresh(request.getRefreshToken());
        return ResponseEntity.ok(tokens);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody LogoutRequest request){
        authService.logout(request.getRefreshToken());
        return ResponseEntity.noContent().build();
    }
}
