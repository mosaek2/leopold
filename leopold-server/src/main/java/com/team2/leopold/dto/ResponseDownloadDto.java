package com.team2.leopold.dto;

import java.time.LocalDate;

public class ResponseDownloadDto {
    private Integer uid;
    private Integer category;
    private String categoryName;
    private String title;
    private String userName;
    private LocalDate writeDate;
    private Long totalElements;
    private Integer totalPages;

    public ResponseDownloadDto(Integer uid, Integer category, String categoryName, String title, String userName, LocalDate writeDate, Long totalElements, Integer totalPages) {
        this.uid = uid;
        this.category = category;
        this.categoryName = categoryName;
        this.title = title;
        this.userName = userName;
        this.writeDate = writeDate;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDate getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(LocalDate writeDate) {
        this.writeDate = writeDate;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }
}