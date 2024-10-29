package com.team2.leopold.controller;

import com.team2.leopold.dto.ResponseInterestPageDto;
import com.team2.leopold.service.InterestService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InterestController {
    private InterestService interestService;

    @Autowired
    public InterestController(InterestService interestService) {
        this.interestService = interestService;
    }

    /* 관심 상품 등록 */
    @PostMapping("/interest")
    public ResponseEntity<?> insertInterest(@RequestParam(name = "productUid") Integer productUid,
                                            HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음");

        try {
            interestService.insertInterest((Integer) session.getAttribute("userUid"), productUid);
            return ResponseEntity.status(HttpStatus.OK).body("관심 상품 등록 완료!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("uid로 대상을 찾을 수 없음");
        } catch (EntityExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 추가된 상품입니다.");
        }
    }

    /* 관심 상품 삭제 */
    @DeleteMapping("/interest")
    public ResponseEntity<?> deleteInterest(@RequestParam(name = "interestUid") Integer interestUid) {
        try {
            interestService.deleteInterest(interestUid);
            return ResponseEntity.status(HttpStatus.OK).body("관심 상품 삭제 완료!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("uid로 대상을 찾을 수 없음");
        }
    }

    /* 관심 상품 비우기 */
    @DeleteMapping("/interest/all")
    public ResponseEntity<?> deleteInterestAll(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음");

        interestService.deleteInterestAll((Integer) session.getAttribute("userUid"));
        return ResponseEntity.status(HttpStatus.OK).body("관심 상품 비우기 완료!");
    }

    /* 관심 상품 목록 */
    @GetMapping("/interest")
    public ResponseEntity<?> findInterestList(@RequestParam(name = "page") Integer page, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않음");

        ResponseInterestPageDto dto = interestService.findInterestList((Integer) session.getAttribute("userUid"), page);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
