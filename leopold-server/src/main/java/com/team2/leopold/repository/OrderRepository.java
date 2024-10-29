package com.team2.leopold.repository;

import com.team2.leopold.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o.uid FROM Order o WHERE o.userUid = :userUid ORDER BY o.date DESC")
    List<Integer> findOrderUidListByUserUid(@Param("userUid") Integer userUid);
}