package com.team2.leopold.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@DynamicInsert
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;
    @Column(name = "cover_url")
    private String coverUrl;
    @Column(name = "detail_url")
    private String detailUrl;
    private LocalDateTime date;
    private Integer price;
    @Column(name = "discount_rate")
    private Double discountRate;
    @Column(name = "sold_out_yn")
    private String soldOutYn;
    @Column(name = "display_yn")
    private String displayYn;
    private Integer stock;
    private String color;
    private String engraving;
    @Column(name = "switch")
    private String switchValue;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_uid")
    private ProductCategory productCategory;

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

    public String getDisplayYn() {
        return displayYn;
    }

    public void setDisplayYn(String displayYn) {
        this.displayYn = displayYn;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
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

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }
}