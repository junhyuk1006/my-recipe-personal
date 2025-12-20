package com.myrecipe.auth.service;

import com.myrecipe.user.domain.User;
import com.myrecipe.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean existByEmail(String email){
       return userRepository.existsByEmail(email);
    }

    public void signup(String email, String password, String nickname){
        if(userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        String encodedPassword = passwordEncoder.encode(password);
        User user = User.builder().email(email).password(encodedPassword).nickname(nickname).build();
        userRepository.save(user);
    }
}
