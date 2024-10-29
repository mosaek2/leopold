package com.team2.leopold.dto;

public class ResponseOrderedWishDto {
    private Integer uid;
    private Integer quantity;
    private Integer price;
    private Double discountRate;
    private String name;
    private String color;
    private String engraving;
    private String switchValue;
    private String coverUrl;
    private String status;

    public ResponseOrderedWishDto(Integer uid, Integer quantity, Integer price, Double discountRate, String name,
                                  String color, String engraving, String switchValue, String coverUrl, String status) {
        this.uid = uid;
        this.quantity = quantity;
        this.price = price;
        this.discountRate = discountRate;
        this.name = name;
        this.color = color;
        this.engraving = engraving;
        this.switchValue = switchValue;
        this.coverUrl = coverUrl;
        this.status = status;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Double getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(Double discountRate) {
        this.discountRate = discountRate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getEngraving() {
        return engraving;
    }

    public void setEngraving(String engraving) {
        this.engraving = engraving;
    }

    public String getSwitchValue() {
        return switchValue;
    }

    public void setSwitchValue(String switchValue) {
        this.switchValue = switchValue;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}