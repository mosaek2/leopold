package com.team2.leopold.service;

import com.team2.leopold.entity.Cart;
import com.team2.leopold.entity.Product;
import com.team2.leopold.entity.User;
import com.team2.leopold.repository.CartRepository;
import com.team2.leopold.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class CartService {
    private CartRepository cartRepository;
    private ProductRepository productRepository;

    @Autowired
    public CartService(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    /* 장바구니 등록 */
    @Transactional
    public void insertCart(String category2, String category3, String category4, String category5,
                           Integer quantity, User user) throws EntityNotFoundException {
        Cart cart = new Cart();
        cart.setQuantity(quantity);
        cart.setUser(user);

        Optional<Product> optionalProduct = productRepository.findProduct(category2, category3, category4, category5);
        if (optionalProduct.isEmpty()) throw new EntityNotFoundException();
        Product foundProduct = optionalProduct.get();

        Optional<Cart> optionalCart = cartRepository.findByProductUidAndUserUid(foundProduct.getUid(), user.getUid());
        if (optionalCart.isPresent()) {
            Cart foundCart = optionalCart.get();
            foundCart.setQuantity(foundCart.getQuantity() + quantity); //장바구니가 존재한다면 수량만 늘림
            cartRepository.save(foundCart);
        } else {
            cart.setProduct(foundProduct);
            cartRepository.save(cart);
        }
    }

    /* 장바구니 목록 조회 */
    public List<Cart> findCartList(Integer userUid) {
        return cartRepository.findCartList(userUid);
    }

    /* 장바구니 수량 변경 */
    @Transactional
    public void changeQuantity(Integer uid, Integer newQuantity) throws EntityNotFoundException {
        Optional<Cart> optionalCart = cartRepository.findById(uid);
        if (optionalCart.isEmpty()) throw new EntityNotFoundException();

        Cart foundCart = optionalCart.get();
        foundCart.setQuantity(newQuantity);
        cartRepository.save(foundCart);
    }

    /* 장바구니 삭제 */
    @Transactional
    public void deleteCart(Integer uid) {
        cartRepository.deleteById(uid);
    }
}