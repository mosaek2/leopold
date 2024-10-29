package com.team2.leopold.dto;

import java.util.List;

public class ResponseOne2OnePageDto {
    private Long totalElements;
    private List<ResponseOne2OneAllDto> list;

    public ResponseOne2OnePageDto(Long totalElements, List<ResponseOne2OneAllDto> list) {
        this.totalElements = totalElements;
        this.list = list;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public List<ResponseOne2OneAllDto> getList() {
        return list;
    }

    public void setList(List<ResponseOne2OneAllDto> list) {
        this.list = list;
    }
}