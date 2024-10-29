package com.team2.leopold.controller;

import com.team2.leopold.dto.RequestAsReceptionDto;
import com.team2.leopold.entity.AsReception;
import com.team2.leopold.entity.User;
import com.team2.leopold.service.AsReceptionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AsReceptionController {
    private final AsReceptionService asReceptionService;

    @Autowired
    public AsReceptionController(AsReceptionService asReceptionService) {
        this.asReceptionService = asReceptionService;
    }

    /* AS 접수 */
    @PostMapping("/asReception")
    public ResponseEntity<?> writeAs(@RequestBody RequestAsReceptionDto requestAsReceptionDto,
                                     HttpServletRequest httpServletRequest) {
        if (requestAsReceptionDto.getTitle() == null || requestAsReceptionDto.getContent() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("제목과 내용을 작성해주세요.");

        HttpSession httpSession = httpServletRequest.getSession(false);
        if (httpSession == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("회원에게만 글쓰기 권한이 있습니다.");

        User user = new User();
        user.setUid((Integer) httpSession.getAttribute("userUid"));

        AsReception asReception = new AsReception();
        asReception.setTitle(requestAsReceptionDto.getTitle());
        asReception.setContent(requestAsReceptionDto.getContent());
        asReceptionService.writeAs(asReception);

        return ResponseEntity.status(HttpStatus.CREATED).body("As가 접수 되었습니다.");
    }
}