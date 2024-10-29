package com.team2.leopold.service;

import com.team2.leopold.entity.Comment;
import com.team2.leopold.entity.Review;
import com.team2.leopold.repository.CommentRepository;
import com.team2.leopold.repository.ReviewRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class CommentService {
    private CommentRepository commentRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, ReviewRepository reviewRepository) {
        this.commentRepository = commentRepository;
        this.reviewRepository = reviewRepository;
    }

    /* 댓글 작성 */
    @Transactional
    public void insertComment(Comment comment, Integer reviewUid) throws BadRequestException {
        Optional<Review> optionalReview = reviewRepository.findById(reviewUid);
        if (optionalReview.isEmpty()) throw new BadRequestException();

        Review foundReview = optionalReview.get();
        comment.setReview(foundReview);
        commentRepository.save(comment);
    }

    /* 댓글 조회 */
    public List<Comment> findCommentList(Integer reviewUid) {
        return commentRepository.findCommentByReviewUid(reviewUid);
    }

    /* 댓글 삭제 */
    @Transactional
    public void deleteComment(Integer uid) {
        commentRepository.deleteById(uid);
    }
}