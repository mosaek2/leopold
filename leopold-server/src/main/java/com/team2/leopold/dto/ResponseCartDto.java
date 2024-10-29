package com.team2.leopold.dto;

public class ResponseCartDto {
    private Integer uid;
    private Integer quantity;
    private String coverUrl;
    private Integer price;
    private Double discountRate;
    private Integer stock;
    private String name;
    private String color;
    private String engraving;
    private String switchValue;

    public ResponseCartDto(Integer uid, Integer quantity, String coverUrl, Integer price, Double discountRate,
                           Integer stock, String name, String color, String engraving, String switchValue) {
        this.uid = uid;
        this.quantity = quantity;
        this.coverUrl = coverUrl;
        this.price = price;
        this.discountRate = discountRate;
        this.stock = stock;
        this.name = name;
        this.color = color;
        this.engraving = engraving;
        this.switchValue = switchValue;
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

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
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

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
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
}