package com.myrecipe.refrigerator.repository;

import com.myrecipe.refrigerator.domain.RefrigeratorItem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefrigeratorItemRepository extends JpaRepository<RefrigeratorItem, Long> {
    List<RefrigeratorItem> findByUserId(Long userId);
}
