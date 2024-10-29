package com.team2.leopold.controller;

import com.team2.leopold.dto.ResponseFaqDto;
import com.team2.leopold.dto.ResponseFaqPageDto;
import com.team2.leopold.entity.Faq;
import com.team2.leopold.service.FaqService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FaqController {
    private FaqService faqService;

    @Autowired
    public FaqController(FaqService faqService) {//
        this.faqService = faqService;
    }


    /* FAQ 전체 목록 조회 */
    @GetMapping("/faq")
    public ResponseEntity<?> findFaqs(@RequestParam(name = "page") Integer page,
                                      @RequestParam(name = "size") Integer size,
                                      @RequestParam(name = "category") Integer categoryUid) {
        try {
            Page<Faq> faqs = faqService.findFaqs(page, size, categoryUid);
            Long totalElements = faqs.getTotalElements();

            List<ResponseFaqDto> dtoList = new ArrayList<ResponseFaqDto>();
            for (Faq f : faqs.getContent()) {
                ResponseFaqDto dto = new ResponseFaqDto(f.getUid(), f.getQuestion(), f.getAnswer(), f.getImageUrl(),
                        f.getFaqCategory().getName(), f.getFaqCategory().getUid());
                dtoList.add(dto);
            }

            ResponseFaqPageDto pageDto = new ResponseFaqPageDto(totalElements, dtoList);
            return ResponseEntity.status(HttpStatus.OK).body(pageDto);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 categoryUid 입니다.");
        }
    }
}