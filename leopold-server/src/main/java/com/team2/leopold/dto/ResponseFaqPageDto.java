package com.team2.leopold.dto;

import java.util.List;

public class ResponseFaqPageDto {
    private Long totalElements;
    private List<ResponseFaqDto> list;

    public ResponseFaqPageDto(Long totalElements, List<ResponseFaqDto> list) {
        this.totalElements = totalElements;
        this.list = list;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public List<ResponseFaqDto> getList() {
        return list;
    }

    public void setList(List<ResponseFaqDto> list) {
        this.list = list;
    }
}