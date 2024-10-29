package com.team2.leopold.dto;

import com.team2.leopold.entity.ProductCategory;
import jakarta.persistence.*;

import java.time.LocalDateTime;

public class ResponseProductDto {
    private Integer uid;
    private String coverUrl;
    private String detailUrl;
    private LocalDateTime date;
    private Integer price;
    private Double discountRate;
    private String soldOutYn;
    private String color;
    private String engraving;
    private String switchValue;
    private String productCategory;

    public ResponseProductDto(Integer uid, String coverUrl, String detailUrl, LocalDateTime date,
                              Integer price, Double discountRate, String soldOutYn, String color,
                              String engraving, String switchValue, String productCategory) {
        this.uid = uid;
        this.coverUrl = coverUrl;
        this.detailUrl = detailUrl;
        this.date = date;
        this.price = price;
        this.discountRate = discountRate;
        this.soldOutYn = soldOutYn;
        this.color = color;
        this.engraving = engraving;
        this.switchValue = switchValue;
        this.productCategory = productCategory;
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

    public String getDetailUrl() {
        return detailUrl;
    }

    public void setDetailUrl(String detailUrl) {
        this.detailUrl = detailUrl;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
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

    public String getSoldOutYn() {
        return soldOutYn;
    }

    public void setSoldOutYn(String soldOutYn) {
        this.soldOutYn = soldOutYn;
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

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }
}