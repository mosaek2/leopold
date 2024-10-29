package com.team2.leopold.dto;

import java.time.LocalDateTime;

public class ResponseOrderDto {
    private Integer uid;
    private LocalDateTime date;
    private String receiver;
    private String receiveMethod;
    private String zipcode;
    private String address;
    private String addressDetail;
    private String phone;
    private String message;
    private Integer deliverPrice;
    private String status;
    private Integer finalPrice;
    private String paymentMethod;
    private String account;
    private String holder;
    private String name;
    private Integer point;

    public ResponseOrderDto(Integer uid, LocalDateTime date, String receiver, String receiveMethod,
                            String zipcode, String address, String addressDetail, String phone,
                            String message, Integer deliverPrice, String status, Integer finalPrice,
                            String paymentMethod, String account, String holder, Integer point) {
        this.uid = uid;
        this.date = date;
        this.receiver = receiver;
        this.receiveMethod = receiveMethod;
        this.zipcode = zipcode;
        this.address = address;
        this.addressDetail = addressDetail;
        this.phone = phone;
        this.message = message;
        this.deliverPrice = deliverPrice;
        this.status = status;
        this.finalPrice = finalPrice;
        this.paymentMethod = paymentMethod;
        this.account = account;
        this.holder = holder;
        this.point = point;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getReceiveMethod() {
        return receiveMethod;
    }

    public void setReceiveMethod(String receiveMethod) {
        this.receiveMethod = receiveMethod;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getDeliverPrice() {
        return deliverPrice;
    }

    public void setDeliverPrice(Integer deliverPrice) {
        this.deliverPrice = deliverPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(Integer finalPrice) {
        this.finalPrice = finalPrice;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }
}