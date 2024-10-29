package com.team2.leopold.controller;

import com.team2.leopold.dto.RequestCommentDto;
import com.team2.leopold.dto.ResponseCommentDto;
import com.team2.leopold.entity.Comment;
import com.team2.leopold.entity.User;
import com.team2.leopold.repository.CommentRepository;
import com.team2.leopold.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {
    private CommentRepository commentRepository;
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentRepository commentRepository, CommentService commentService) {
        this.commentRepository = commentRepository;
        this.commentService = commentService;
    }

    /* 댓글 작성 */
    @PostMapping("/comment/write/{uid}")
    public ResponseEntity<?> writeComment(@RequestBody RequestCommentDto requestCommentDto,
                                          HttpServletRequest request,
                                          @PathVariable(name = "uid") Integer ReviewUid) {
        if (requestCommentDto.getContent() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("데이터가 누락되었습니다.");

        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않습니다.");

        User user = (User) session.getAttribute("user");

        Comment comment = new Comment();
        comment.setContent(requestCommentDto.getContent());
        comment.setUser(user);

        try {
            commentService.insertComment(comment, ReviewUid);
            return ResponseEntity.status(HttpStatus.OK).body("댓글 작성 완료!");
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 리뷰 게시글을 찾을 수 없습니다.");
        }
    }

    /* 댓글 조회 */
    @GetMapping("/comment/{uid}")
    public ResponseEntity<?> findComment(@PathVariable(name = "uid") Integer reviewUid) {
        try {
            List<Comment> commentList = commentService.findCommentList(reviewUid);

            List<ResponseCommentDto> dtoList = new ArrayList<>();
            for (Comment c : commentList) {
                ResponseCommentDto dto = new ResponseCommentDto(c.getUid(), c.getContent(),
                        c.getUser().getName(), c.getWriteDate());
                dtoList.add(dto);
            }

            return ResponseEntity.status(HttpStatus.OK).body(dtoList);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류");
        }
    }

    /* 댓글 수정 */
    @PatchMapping("/comment/{uid}")
    public ResponseEntity<?> modifyComment(@RequestBody RequestCommentDto requestCommentDto,
                                           @PathVariable(name = "uid") int uid,
                                           HttpServletRequest request) {
        if (requestCommentDto.getContent() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("데이터가 누락되었습니다.");

        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않습니다.");

        Optional<Comment> optionalComment = commentRepository.findById(uid);

        if (optionalComment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 댓글을 찾을 수 없습니다.");
        }
        Comment foundComment = optionalComment.get();

        if (!foundComment.getUser().getUid().equals(session.getAttribute("userUid"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("본인이 작성한 댓글만 수정할 수 있습니다.");
        }

        foundComment.setContent(requestCommentDto.getContent());
        commentRepository.save(foundComment);
        return ResponseEntity.status(HttpStatus.OK).body("댓글 수정 완료!");
    }

    /* 댓글 삭제 */
    @DeleteMapping("/comment/{uid}")
    public ResponseEntity<?> deleteComment(@PathVariable(name = "uid") int uid, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되어 있지 않습니다.");

        Optional<Comment> optionalComment = commentRepository.findById(uid);
        if (optionalComment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 댓글을 찾을 수 없습니다.");
        }
        Comment foundComment = optionalComment.get();

        if (!foundComment.getUser().getUid().equals(session.getAttribute("userUid"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("본인이 작성한 댓글만 수정할 수 있습니다.");
        }

        commentService.deleteComment(uid);
        return ResponseEntity.status(HttpStatus.OK).body("댓글 삭제 완료");
    }
}