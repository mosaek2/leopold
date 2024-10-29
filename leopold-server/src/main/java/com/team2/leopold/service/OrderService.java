package com.team2.leopold.service;

import com.team2.leopold.dto.ResponseOrderDto;
import com.team2.leopold.dto.ResponseOrderPageDto;
import com.team2.leopold.dto.ResponseOrderedWishDto;
import com.team2.leopold.entity.Order;
import com.team2.leopold.entity.Wish;
import com.team2.leopold.repository.OrderRepository;
import com.team2.leopold.repository.WishRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class OrderService {
    private OrderRepository orderRepository;
    private WishRepository wishRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, WishRepository wishRepository) {
        this.orderRepository = orderRepository;
        this.wishRepository = wishRepository;
    }

    /* 주문 정보 등록 */
    @Transactional
    public void insertOrder(Order order) {
        orderRepository.save(order);
    }


    /* 주문 정보와 주문 상품 연계 */
    @Transactional
    public void connectOrderWithWish(Integer userUid, Integer orderUid) throws EntityNotFoundException {
        Optional<Order> optionalOrder = orderRepository.findById(orderUid);
        if (optionalOrder.isEmpty()) throw new EntityNotFoundException();
        Order foundOrder = optionalOrder.get();

        List<Wish> wishList = wishRepository.findWishList(userUid);
        for (Wish w : wishList) {
            w.setOrder(foundOrder);
            w.setPrice(w.getCart().getProduct().getPrice());
            w.setDiscountRate(w.getCart().getProduct().getDiscountRate());
            w.setOrderedYn("y");
            w.getCart().setUsedYn("y");
            w.getCart().setOrder(foundOrder);
            wishRepository.save(w);
        }
    }

    /* 주문 취소 */
    @Transactional
    public void deleteOrder(Integer orderUid) {
        Order foundOrder = orderRepository.findById(orderUid).get();

        foundOrder.setStatus("주문취소");
        orderRepository.save(foundOrder);
    }

    /* 주문 조회 */
    public ResponseOrderPageDto findOrder(Integer orderUid) throws EntityNotFoundException {
        ResponseOrderPageDto orderPageDto = new ResponseOrderPageDto();

        Optional<Order> optionalOrder = orderRepository.findById(orderUid);
        if (optionalOrder.isEmpty()) throw new EntityNotFoundException();

        Order foundOrder = optionalOrder.get();
        ResponseOrderDto orderDto = new ResponseOrderDto(foundOrder.getUid(), foundOrder.getDate(),
                foundOrder.getReceiver(), foundOrder.getReceiveMethod(), foundOrder.getZipcode(),
                foundOrder.getAddress(), foundOrder.getAddressDetail(), foundOrder.getPhone(), foundOrder.getMessage(),
                foundOrder.getDeliverPrice(), foundOrder.getStatus(), foundOrder.getFinalPrice(),
                foundOrder.getPaymentMethod(), foundOrder.getAccount(), foundOrder.getHolder(), foundOrder.getPoint());
        orderPageDto.setOrder(orderDto);

        List<Wish> wishList = wishRepository.findWishListByOrderUid(orderUid);

        List<ResponseOrderedWishDto> orderedWishDtoList = new ArrayList<>();
        for (Wish w : wishList) {
            ResponseOrderedWishDto orderedWishDto = new ResponseOrderedWishDto(w.getUid(), w.getCart().getQuantity(),
                    w.getPrice(), w.getDiscountRate(), w.getCart().getProduct().getProductCategory().getName(),
                    w.getCart().getProduct().getColor(), w.getCart().getProduct().getEngraving(),
                    w.getCart().getProduct().getSwitchValue(), w.getCart().getProduct().getCoverUrl(),
                    w.getOrder().getStatus());
            orderedWishDtoList.add(orderedWishDto);
        }
        orderPageDto.setWishList(orderedWishDtoList);

        return orderPageDto;
    }

    /* 주문 목록 조회 */
    public List<ResponseOrderPageDto> findOrderListByUserUid(Integer userUid) {
        List<ResponseOrderPageDto> orderPageDtoList = new ArrayList<>();

        List<Integer> orderUidList = orderRepository.findOrderUidListByUserUid(userUid);
        for (Integer orderUid : orderUidList) {
            ResponseOrderPageDto orderPageDto = findOrder(orderUid);
            orderPageDtoList.add(orderPageDto);
        }

        return orderPageDtoList;
    }
}