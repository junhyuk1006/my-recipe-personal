package com.myrecipe.refrigerator.service;

import com.myrecipe.refrigerator.domain.RefrigeratorItem;
import com.myrecipe.refrigerator.dto.ItemRequest;
import com.myrecipe.refrigerator.dto.ItemResponse;
import com.myrecipe.refrigerator.repository.RefrigeratorItemRepository;
import com.myrecipe.user.domain.User;
import com.myrecipe.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RefrigeratorItemService {
    private final RefrigeratorItemRepository refrigeratorItemRepository;
    private final UserRepository userRepository;

    public List<ItemResponse> findItem(Long userId){
        return refrigeratorItemRepository.findByUserId(userId).stream().map(ItemResponse::from).toList();
    }

    public ItemResponse createItem(Long userId, ItemRequest request){
        User user = userRepository.getReferenceById(userId);
        return ItemResponse.from(refrigeratorItemRepository.save(request.toEntity(user)));
    }

    @Transactional
    public ItemResponse updateItem(Long userId, Long itemId, ItemRequest request){
        RefrigeratorItem item = refrigeratorItemRepository.findById(itemId).orElseThrow();
        item.update(request);
        return ItemResponse.from(item);
    }

    public void deleteItem(Long itemId){
        refrigeratorItemRepository.delete(refrigeratorItemRepository.findById(itemId).orElseThrow());
    }
}
