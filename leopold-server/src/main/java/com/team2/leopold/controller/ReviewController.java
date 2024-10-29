package com.team2.leopold.controller;

import com.team2.leopold.dto.RequestReviewDto;
import com.team2.leopold.dto.ResponseAllReviewDto;
import com.team2.leopold.dto.ResponseReviewDto;
import com.team2.leopold.dto.ResponseReviewPageDto;
import com.team2.leopold.entity.Review;
import com.team2.leopold.entity.User;
import com.team2.leopold.repository.ReviewRepository;
import com.team2.leopold.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ReviewController {

    private ReviewRepository reviewRepository;

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository, ReviewService reviewService) {
        this.reviewRepository = reviewRepository;
        this.reviewService = reviewService;
    }

    /* 리뷰 작성 */
    @PostMapping("/review/write")
    public ResponseEntity<?> writeReview(@RequestBody RequestReviewDto requestReviewDto, HttpServletRequest request) {
        if (requestReviewDto.getTitle() == null || requestReviewDto.getContent() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("데이터가 누락되었습니다.");

        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않습니다.");

        User user = new User();
        user.setUid((Integer) session.getAttribute("userUid"));

        Review review = new Review();
        review.setTitle(requestReviewDto.getTitle());
        review.setContent(requestReviewDto.getContent());
        review.setVideoUrl(requestReviewDto.getVideoUrl());
        review.setUser(user);

        reviewService.insertReview(review);
        return ResponseEntity.status(HttpStatus.OK).body("게시글 작성 완료!");
    }

    /* 리뷰 상세 조회 */
    @GetMapping("/review/{uid}")
    public ResponseEntity<?> findReview(@PathVariable int uid) {
        try {
            Review review = reviewService.findReview(uid);
            ResponseReviewDto responseReviewDto = new ResponseReviewDto(
                    review.getUid(),
                    review.getTitle(),
                    review.getContent(),
                    review.getUser().getName(),
                    review.getWriteDate(),
                    review.getVideoUrl()
            );
            return ResponseEntity.status(HttpStatus.OK).body(responseReviewDto);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
        }
    }

    /* 리뷰 수정 */
    @PatchMapping("/review/{uid}")
    public ResponseEntity<?> modifyReview(@RequestBody RequestReviewDto requestReviewDto,
                                          @PathVariable(name = "uid") int uid,
                                          HttpServletRequest request) {
        if (requestReviewDto.getTitle() == null || requestReviewDto.getContent() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("데이터가 누락되었습니다.");

        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않습니다.");

        Optional<Review> optionalReview = reviewRepository.findById(uid);

        if (optionalReview.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 게시글을 찾을 수 없습니다.");
        }
        Review foundReview = optionalReview.get();

        if (!foundReview.getUser().getUid().equals(session.getAttribute("userUid"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("본인이 작성한 게시물만 수정할 수 있습니다.");
        }

        foundReview.setTitle(requestReviewDto.getTitle());
        foundReview.setContent(requestReviewDto.getContent());
        foundReview.setVideoUrl(requestReviewDto.getVideoUrl());
        reviewRepository.save(foundReview);
        return ResponseEntity.status(HttpStatus.OK).body("게시글 수정 완료!");
    }

    /* 리뷰 삭제 */
    @DeleteMapping("/review/{uid}")
    public ResponseEntity<?> deleteReview(@PathVariable int uid, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않습니다.");

        Optional<Review> optionalReview = reviewRepository.findById(uid);

        if (optionalReview.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 게시글을 찾을 수 없습니다.");
        }
        Review foundReview = optionalReview.get();

        if (!foundReview.getUser().getUid().equals(session.getAttribute("userUid"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("본인이 작성한 게시물만 삭제할 수 있습니다.");
        }

        foundReview.setDeleteYn("y");
        foundReview.setDeleteDate(LocalDateTime.now());
        reviewRepository.save(foundReview);
        return ResponseEntity.status(HttpStatus.OK).body("게시글 삭제 완료!");
    }

    /* 리뷰 전체 조회 */
    @GetMapping("/reviews")
    public ResponseEntity<?> findReviews(@RequestParam(name = "page") Integer page,
                                         @RequestParam(name = "size") Integer size) {
        try {
            Page<Review> reviews = reviewService.findReviews(page, size);
            Long totalElements = reviews.getTotalElements();

            List<ResponseAllReviewDto> dtoList = new ArrayList<>();
            for (Review r : reviews.getContent()) {
                ResponseAllReviewDto dto = new ResponseAllReviewDto(r.getUid(), r.getTitle(), r.getUser().getName(), r.getWriteDate());
                dtoList.add(dto);
            }

            ResponseReviewPageDto pageDto = new ResponseReviewPageDto(totalElements, dtoList);
            return ResponseEntity.status(HttpStatus.OK).body(pageDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 uid");
        }
    }
}