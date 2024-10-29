package com.team2.leopold.dto;

import java.time.LocalDate;

public class ResponseNoticeReadDto {
    private Integer uid;
    private String title;
    private String content;
    private LocalDate writeDate;
    private String imageUrl;
    private String name;
    private Integer prevNum;
    private Integer nextNum;

    public ResponseNoticeReadDto(Integer uid, String title, String content, LocalDate writeDate, String imageUrl, String name) {
        this.uid = uid;
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.imageUrl = imageUrl;
        this.name = name;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
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

    public LocalDate getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(LocalDate writeDate) {
        this.writeDate = writeDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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