package com.team2.leopold.dto;

import java.time.LocalDate;

public class ResponseReviewDto {
    private Integer uid;
    private String title;
    private String content;
    private String name;
    private LocalDate writeDate;
    private String videoUrl;

    public ResponseReviewDto(Integer uid, String title, String content, String name,
                             LocalDate writeDate, String videoUrl) {
        this.uid = uid;
        this.title = title;
        this.content = content;
        this.name = name;
        this.writeDate = writeDate;
        this.videoUrl = videoUrl;
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

    public LocalDate getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(LocalDate writeDate) {
        this.writeDate = writeDate;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}