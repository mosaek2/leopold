package com.team2.leopold.dto;

public class ResponseAsDto {
    private Integer uid;
    private Integer category;
    private String question;
    private String answer;

    public ResponseAsDto(Integer uid, Integer category, String question, String answer) {
        this.uid = uid;
        this.category = category;
        this.question = question;
        this.answer = answer;
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

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}