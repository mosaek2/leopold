package com.team2.leopold.dto;

import java.time.LocalDateTime;

public class ResponseUserOne2OneDto {
    private Integer uid;
    private String title;
    private LocalDateTime date;
    private String answerYn;

    public ResponseUserOne2OneDto(Integer uid, String title, LocalDateTime date, String answerYn) {
        this.uid = uid;
        this.title = title;
        this.date = date;
        this.answerYn = answerYn;
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getAnswerYn() {
        return answerYn;
    }

    public void setAnswerYn(String answerYn) {
        this.answerYn = answerYn;
    }
}