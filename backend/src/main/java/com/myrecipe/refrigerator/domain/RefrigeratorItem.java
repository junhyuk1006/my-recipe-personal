package com.myrecipe.refrigerator.domain;

import com.myrecipe.user.domain.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "refrigerator_item")
public class RefrigeratorItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "ingredient_name", nullable = false)
    private String ingredientName;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit")
    private String unit;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
