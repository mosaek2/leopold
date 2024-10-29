package com.team2.leopold.dto;

import java.util.List;

public class ResponseOrderPageDto {
    ResponseOrderDto order;
    List<ResponseOrderedWishDto> wishList;

    public ResponseOrderDto getOrder() {
        return order;
    }

    public void setOrder(ResponseOrderDto order) {
        this.order = order;
    }

    public List<ResponseOrderedWishDto> getWishList() {
        return wishList;
    }

    public void setWishList(List<ResponseOrderedWishDto> wishList) {
        this.wishList = wishList;
    }
}