package com.team2.leopold.repository;

import com.team2.leopold.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Integer> {
    @Modifying
    @Query("DELETE FROM Wish w WHERE w.cart.user.uid = :userUid AND w.orderedYn = 'n'")
    void deleteAll(@Param("userUid") Integer userUid);

    @Query("SELECT w FROM Wish w WHERE w.cart.user.uid = :userUid AND w.orderedYn = 'n'")
    List<Wish> findWishList(@Param("userUid") Integer userUid);

    @Query("SELECT w FROM Wish w JOIN FETCH w.order WHERE w.order.uid = :orderUid")
    List<Wish> findWishListByOrderUid(@Param("orderUid") Integer orderUid);
}