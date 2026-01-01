package com.myrecipe.refrigerator.dto;

import com.myrecipe.refrigerator.domain.RefrigeratorItem;
import lombok.AllArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Setter
public class ItemResponse {
    private Long id;
    private String ingredientName;
    private String unit;
    private LocalDateTime expirationDate;

    public static ItemResponse from(RefrigeratorItem item){
        return new ItemResponse(
                item.getId(),
                item.getIngredientName(),
                item.getUnit(),
                item.getExpirationDate()
        );
    }
}
