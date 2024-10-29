package com.team2.leopold.dto;

import com.team2.leopold.entity.Comment;

import java.time.LocalDate;
import java.util.List;

public class ResponseCommentDto {
    private Integer uid;
    private String content;
    private String name;
    private LocalDate writeDate;

    public ResponseCommentDto(Integer uid, String content, String name, LocalDate writeDate) {
        this.uid = uid;
        this.content = content;
        this.name = name;
        this.writeDate = writeDate;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
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

    public LocalDate getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(LocalDate writeDate) {
        this.writeDate = writeDate;
    }
}