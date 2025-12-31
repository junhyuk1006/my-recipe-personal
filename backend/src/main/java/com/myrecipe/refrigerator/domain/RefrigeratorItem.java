package com.myrecipe.refrigerator.domain;

import java.time.LocalDateTime;

import javax.annotation.processing.Generated;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "refrigerator_item")
public class RefrigeratorItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = fetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "ingredient_name", nullable = false)
    private String ingredientName;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit")
    private String unit;

    @Column(name = "expiration_date")
    private LocalDateTime expriationDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
