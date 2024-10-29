package com.team2.leopold.controller;

import com.team2.leopold.dto.ResponseAsDto;
import com.team2.leopold.entity.As;
import com.team2.leopold.service.AsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AsController {
    private final AsService asService;

    @Autowired
    public AsController(AsService asService) {
        this.asService = asService;
    }

    /* AS 전체 조회 */
    @GetMapping("/as")
    public ResponseEntity<?> getAsList() {
        List<As> asList = asService.getAsList();
        List<ResponseAsDto> responseAsDtoList = new ArrayList<>();

        for (As as : asList) {
            ResponseAsDto responseAsDto = new ResponseAsDto(as.getUid(), as.getCategory(), as.getQuestion(), as.getAnswer());
            responseAsDtoList.add(responseAsDto);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseAsDtoList);
    }
}