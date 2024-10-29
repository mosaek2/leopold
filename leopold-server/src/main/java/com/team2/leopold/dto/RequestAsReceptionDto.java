package com.team2.leopold.dto;

public class RequestAsReceptionDto {
    private Integer uid;
    private String title;
    private String content;

    public RequestAsReceptionDto(Integer uid, String title, String content) {
        this.uid = uid;
        this.title = title;
        this.content = content;
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
}