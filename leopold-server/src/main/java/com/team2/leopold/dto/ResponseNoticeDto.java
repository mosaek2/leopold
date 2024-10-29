package com.team2.leopold.dto;

import java.time.LocalDate;

public class ResponseNoticeDto {
    private Integer uid;
    private String title;
    private String name;
    private LocalDate writeDate;
    private Integer hit;
    private Long totalElements;
    private Integer totalPages;

    public ResponseNoticeDto(Integer uid, String title, String name, LocalDate writeDate, Integer hit, Long totalElements, Integer totalPages) {
        this.uid = uid;
        this.title = title;
        this.name = name;
        this.writeDate = writeDate;
        this.hit = hit;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
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

    public Integer getHit() {
        return hit;
    }

    public void setHit(Integer hit) {
        this.hit = hit;
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