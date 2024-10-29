package com.team2.leopold.repository;

import com.team2.leopold.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Modifying
    @Query("DELETE FROM Comment c WHERE c.uid = :uid")
    void deleteById(@Param("uid") Integer uid);

    @Query("SELECT c FROM Comment c JOIN FETCH c.review WHERE c.review.uid = :reviewUid")
    List<Comment> findCommentByReviewUid(@Param("reviewUid") Integer reviewUid);
}