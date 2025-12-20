package com.myrecipe.user.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 파라미터 없는 생성자를 protected로 만든다 => JPA는 엔티티를 만들 때 기본 생성자를 사용
@AllArgsConstructor
@Builder
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_users_email", columnNames = "email")
        }
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column
    private LocalDateTime lastLoginAt;

    // 엔티티 상태가 바뀔 때 자동 호출
    @PrePersist
    void onCreate(){
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.role == null) this.role = UserRole.USER;
        if (this.status == null) this.status = UserStatus.ACTIVE;
    }

    // 엔티티 상태가 바뀔 때 자동 호출
    @PreUpdate
    void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }

    public void markLoginSuccess(){
        this.lastLoginAt = LocalDateTime.now();
    }
}
