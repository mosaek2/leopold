package com.team2.leopold.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@DynamicInsert
@Table(name = "product_category")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;
    private String name;
    @Column(name = "parent_uid")
    private Integer parentUid;

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParentUid() {
        return parentUid;
    }

    public void setParentUid(Integer parentUid) {
        this.parentUid = parentUid;
    }
}