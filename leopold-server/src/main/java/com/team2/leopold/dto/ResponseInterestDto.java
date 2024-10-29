package com.team2.leopold.dto;

public class ResponseInterestDto {
    private Integer uid;
    private String coverUrl;
    private String name;
    private String color;
    private Integer price;
    private Integer productUid;

    public ResponseInterestDto(Integer uid, String coverUrl, String name, String color, Integer price, Integer productUid) {
        this.uid = uid;
        this.coverUrl = coverUrl;
        this.name = name;
        this.color = color;
        this.price = price;
        this.productUid = productUid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
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

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getProductUid() {
        return productUid;
    }

    public void setProductUid(Integer productUid) {
        this.productUid = productUid;
    }
}