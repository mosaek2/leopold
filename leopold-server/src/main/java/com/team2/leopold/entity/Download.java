package com.team2.leopold.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;

@Entity
@DynamicInsert
public class Download {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;
    private String title;
    private String content;
    @Column(name = "write_date")
    private LocalDate writeDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "download_category_uid")
    private DownloadCategory downloadCategory;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_uid")
    private User user;

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

    public DownloadCategory getDownloadCategory() {
        return downloadCategory;
    }

    public void setDownloadCategory(DownloadCategory downloadCategory) {
        this.downloadCategory = downloadCategory;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}