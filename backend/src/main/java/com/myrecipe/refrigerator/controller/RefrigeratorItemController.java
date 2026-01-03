package com.myrecipe.refrigerator.controller;

import com.myrecipe.refrigerator.dto.ItemRequest;
import com.myrecipe.refrigerator.dto.ItemResponse;
import com.myrecipe.refrigerator.service.RefrigeratorItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refrigerator")
public class RefrigeratorItemController {
    private final RefrigeratorItemService refrigeratorItemService;

    @GetMapping("/item")
    public List<ItemResponse> findItem(@AuthenticationPrincipal Long userId){
        return refrigeratorItemService.findItem(userId);
    }

    @PostMapping("/item")
    public ResponseEntity<ItemResponse> createItem(@AuthenticationPrincipal Long userId,
                                            @RequestBody ItemRequest request){
        ItemResponse response = refrigeratorItemService.createItem(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/item/{itemId}")
    public ResponseEntity<ItemResponse> updateItem(@AuthenticationPrincipal Long userId,
                                                    @PathVariable Long itemId,
                                                    @RequestBody ItemRequest request){
        ItemResponse response = refrigeratorItemService.updateItem(userId, itemId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId){
        refrigeratorItemService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }
}
