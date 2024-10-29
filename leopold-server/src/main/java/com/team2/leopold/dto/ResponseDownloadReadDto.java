package com.team2.leopold.dto;

import java.time.LocalDate;

public class ResponseDownloadReadDto {
    private Integer uid;
    private String categoryName;
    private String title;
    private String content;
    private String userName;
    private LocalDate writeDate;
    private Integer prevNum;
    private Integer nextNum;

    public ResponseDownloadReadDto(Integer uid, String categoryName, String title, String content, String userName, LocalDate writeDate) {
        this.uid = uid;
        this.categoryName = categoryName;
        this.title = title;
        this.content = content;
        this.userName = userName;
        this.writeDate = writeDate;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public Integer getPrevNum() {
        return prevNum;
    }

    public void setPrevNum(Integer prevNum) {
        this.prevNum = prevNum;
    }

    public Integer getNextNum() {
        return nextNum;
    }

    public void setNextNum(Integer nextNum) {
        this.nextNum = nextNum;
    }
}