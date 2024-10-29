package com.team2.leopold.dto;

import java.util.List;

public class ResponseInterestPageDto {
    private List<ResponseInterestDto> list;
    private Long totalElements;

    public List<ResponseInterestDto> getList() {
        return list;
    }

    public void setList(List<ResponseInterestDto> list) {
        this.list = list;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }
}