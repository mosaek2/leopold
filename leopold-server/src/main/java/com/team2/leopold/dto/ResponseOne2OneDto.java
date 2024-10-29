package com.team2.leopold.dto;

import com.team2.leopold.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ResponseOne2OneDto {
    private Integer uid;
    private String title;
    private String content;
    private String name;
    private LocalDateTime writeDate;
    private String answer;
    private String answerYn;
    private LocalDateTime answerDate;

    public ResponseOne2OneDto(Integer uid, String title, String content, String name, LocalDateTime writeDate, String answer, String answerYn, LocalDateTime answerDate) {
        this.uid = uid;
        this.title = title;
        this.content = content;
        this.name = name;
        this.writeDate = writeDate;
        this.answer = answer;
        this.answerYn = answerYn;
        this.answerDate = answerDate;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(LocalDateTime writeDate) {
        this.writeDate = writeDate;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getAnswerYn() {
        return answerYn;
    }

    public void setAnswerYn(String answerYn) {
        this.answerYn = answerYn;
    }

    public LocalDateTime getAnswerDate() {
        return answerDate;
    }

    public void setAnswerDate(LocalDateTime answerDate) {
        this.answerDate = answerDate;
    }
}