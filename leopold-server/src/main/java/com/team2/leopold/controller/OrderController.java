package com.team2.leopold.controller;

import com.team2.leopold.dto.RequestOrderDto;
import com.team2.leopold.dto.ResponseOrderPageDto;
import com.team2.leopold.entity.Order;
import com.team2.leopold.service.OrderService;
import com.team2.leopold.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    private OrderService orderService;
    private UserService userService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    /* 주문 정보 등록과 연계 */
    @PostMapping("/order")
    public ResponseEntity<?> insertOrder(@RequestBody RequestOrderDto dto, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음.");

        Order newOrder = new Order();
        newOrder.setReceiver(dto.getReceiver());
        newOrder.setReceiveMethod(dto.getReceiveMethod());
        newOrder.setZipcode(dto.getZipcode());
        newOrder.setAddress(dto.getAddress());
        newOrder.setAddressDetail(dto.getAddressDetail());
        newOrder.setPhone(dto.getPhone());
        newOrder.setEmail(dto.getEmail());
        newOrder.setMessage(dto.getMessage());
        newOrder.setDeliverPrice(dto.getDeliverPrice());
        newOrder.setStatus(dto.getStatus());
        newOrder.setFinalPrice(dto.getFinalPrice());
        newOrder.setPaymentMethod(dto.getPaymentMethod());
        newOrder.setAccount(dto.getAccount());
        newOrder.setHolder(dto.getHolder());
        newOrder.setPoint(dto.getPoint());
        newOrder.setUserUid((Integer) session.getAttribute("userUid"));

        orderService.insertOrder(newOrder);
        Integer newOrderUid = newOrder.getUid();

        try {
            orderService.connectOrderWithWish((Integer) session.getAttribute("userUid"), newOrderUid);
            userService.reducePoint(dto.getPoint(), (Integer) session.getAttribute("userUid"));
            return ResponseEntity.status(HttpStatus.OK).body(newOrderUid);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("주문 정보를 찾을 수 없음");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 에러");
        }
    }

    /* 주문 취소 */
    @DeleteMapping("/order")
    public ResponseEntity<?> deleteOrder(@RequestParam(name = "orderUid") Integer orderUid,
                                         HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음.");

        ResponseOrderPageDto foundOrder = orderService.findOrder(orderUid);
        userService.increasePoint(foundOrder.getOrder().getPoint(), (Integer) session.getAttribute("userUid"));

        orderService.deleteOrder(orderUid);
        return ResponseEntity.status(HttpStatus.OK).body("주문 취소 완료!");
    }

    /* 주문 조회 */
    @GetMapping("/order")
    public ResponseEntity<?> findOrder(@RequestParam(name = "orderUid") Integer orderUid, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음.");

        String name = (String) session.getAttribute("userName");

        try {
            ResponseOrderPageDto orderPageDto = orderService.findOrder(orderUid);
            orderPageDto.getOrder().setName(name);
            return ResponseEntity.status(HttpStatus.OK).body(orderPageDto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 주문 정보를 찾을 수 없음");
        }
    }

    /* 주문 목록 조회 */
    @GetMapping("/order/list")
    public ResponseEntity<?> findOrderList(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음.");

        List<ResponseOrderPageDto> orderPageDtoList =
                orderService.findOrderListByUserUid((Integer) session.getAttribute("userUid"));
        return ResponseEntity.status(HttpStatus.OK).body(orderPageDtoList);
    }
}