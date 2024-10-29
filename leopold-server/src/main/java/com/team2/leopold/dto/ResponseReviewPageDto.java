package com.team2.leopold.dto;

import java.util.List;

public class ResponseReviewPageDto {
    private Long totalElements;
    private List<ResponseAllReviewDto> list;

    public ResponseReviewPageDto(Long totalElements, List<ResponseAllReviewDto> list) {
        this.totalElements = totalElements;
        this.list = list;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public List<ResponseAllReviewDto> getList() {
        return list;
    }

    public void setList(List<ResponseAllReviewDto> list) {
        this.list = list;
    }
}