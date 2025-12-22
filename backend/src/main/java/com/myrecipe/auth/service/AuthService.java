package com.myrecipe.auth.service;

import com.myrecipe.auth.dto.SignupResponse;
import com.myrecipe.common.exception.client.DuplicateEmailException;
import com.myrecipe.user.domain.User;
import com.myrecipe.user.repository.UserRepository;
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

    public SignupResponse signup(String email, String password, String nickname){
        String encodedPassword = passwordEncoder.encode(password);
        String handle = generateHandle();

        User user = User.builder().email(email).password(encodedPassword).nickname(nickname).handle(handle).build();
        try {
            User savedUser = userRepository.save(user);
            TokenPair tokens = jwtTokenProvider.issueTokens(savedUser.getId(), saved.getRole());
            return new SignupResponse(savedUser.getId(), savedUser.getNickname(), savedUser.getHandle(), tokens);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateEmailException("이미 사용 중인 이메일입니다.");
        }
    }

    private String generateHandle(){
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        int random = ThreadLocalRandom.current().nextInt(10000,100000);
        return "user_" + timestamp +random;
    }
}
