package com.myrecipe.refrigerator.dto;

import com.myrecipe.refrigerator.domain.RefrigeratorItem;
import com.myrecipe.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ItemRequest {
    private Long id;
    private String name;
    private Integer quantity;
    private String unit;
    private LocalDate expirationDate;

    public RefrigeratorItem toEntity(User user){
        return RefrigeratorItem.builder()
                .user(user)
                .name(name)
                .quantity(quantity)
                .unit(unit)
                .expirationDate(expirationDate)
                .build();
    }
}
