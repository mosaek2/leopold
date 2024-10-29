package com.team2.leopold.controller;

import com.team2.leopold.dto.RequestCartDto;
import com.team2.leopold.dto.ResponseCartDto;
import com.team2.leopold.entity.Cart;
import com.team2.leopold.entity.User;
import com.team2.leopold.service.CartService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CartController {
    private CartService service;

    @Autowired
    public CartController(CartService service) {
        this.service = service;
    }

    /* 장바구니 등록 */
    @PostMapping("/cart")
    public ResponseEntity<?> insertCart(@RequestBody RequestCartDto dto, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음");

        User user = (User) session.getAttribute("user");
        try {
            service.insertCart(dto.getCategory2(), dto.getCategory3(), dto.getCategory4(),
                    dto.getCategory5(), dto.getQuantity(), user);
            return ResponseEntity.status(HttpStatus.OK).body("장바구니 등록 완료!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 상품을 찾을 수 없음");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류");
        }
    }

    /* 장바구니 목록 조회 */
    @GetMapping("/cart/list")
    public ResponseEntity<?> findCartList(@RequestParam(name = "uid") Integer userUid) {
        List<Cart> cartList = service.findCartList(userUid);

        List<ResponseCartDto> dtoList = new ArrayList<>();
        for (Cart c : cartList) {
            ResponseCartDto dto = new ResponseCartDto(c.getUid(), c.getQuantity(), c.getProduct().getCoverUrl(),
                    c.getProduct().getPrice(), c.getProduct().getDiscountRate(), c.getProduct().getStock(),
                    c.getProduct().getProductCategory().getName(), c.getProduct().getColor(),
                    c.getProduct().getEngraving(), c.getProduct().getSwitchValue());
            dtoList.add(dto);
        }
        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    /* 장바구니 수량 변경 */
    @PatchMapping("/cart/quantity")
    public ResponseEntity<?> changeQuantity(@RequestParam(name = "uid") Integer uid,
                                            @RequestParam(name = "quantity") Integer quantity) {
        try {
            service.changeQuantity(uid, quantity);
            return ResponseEntity.status(HttpStatus.OK).body("수량 변경 완료!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 장바구니를 찾을 수 없음");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류");
        }
    }

    /* 장바구니 삭제 */
    @DeleteMapping("/cart")
    public ResponseEntity<?> deleteCart(@RequestParam(name = "uid") Integer uid) {
        service.deleteCart(uid);
        return ResponseEntity.status(HttpStatus.OK).body("장바구니 삭제 완료!");
    }
}