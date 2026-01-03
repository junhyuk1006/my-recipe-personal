package com.myrecipe.refrigerator.dto;

import com.myrecipe.refrigerator.domain.RefrigeratorItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class ItemResponse {
    private Long id;
    private String name;
    private String unit;
    private LocalDate expirationDate;

    public static ItemResponse from(RefrigeratorItem item){
        return new ItemResponse(
                item.getId(),
                item.getName(),
                item.getUnit(),
                item.getExpirationDate()
        );
    }
}
