package com.team2.leopold.service;

import com.team2.leopold.entity.Cart;
import com.team2.leopold.entity.Wish;
import com.team2.leopold.repository.CartRepository;
import com.team2.leopold.repository.WishRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class WishService {
    private WishRepository wishRepository;
    private CartRepository cartRepository;

    @Autowired
    public WishService(WishRepository wishRepository, CartRepository cartRepository) {
        this.wishRepository = wishRepository;
        this.cartRepository = cartRepository;
    }

    /* 구매 대기 상품 등록 */
    @Transactional
    public void insertWish(Integer cartUid, Integer userUid) throws BadRequestException {
        Wish wish = new Wish();

        Optional<Cart> optionalCart = cartRepository.findById(cartUid);
        if (optionalCart.isEmpty()) throw new BadRequestException();
        Cart foundCart = optionalCart.get();
        wish.setCart(foundCart);

        wishRepository.save(wish);
    }

    /* 구매 대기 상품 초기화 */
    @Transactional
    public void deleteWish(Integer userUid) {
        wishRepository.deleteAll(userUid);
    }

    /* 구매 대기 상품 목록 */
    public List<Wish> findWishList(Integer userUid) {
        return wishRepository.findWishList(userUid);
    }

    /* 구매 상품 목록 조회 */
    public List<Wish> findWishListByOrderUid(Integer orderUid) {
        return wishRepository.findWishListByOrderUid(orderUid);
    }
}