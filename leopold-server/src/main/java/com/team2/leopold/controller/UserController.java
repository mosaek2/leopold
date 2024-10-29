package com.team2.leopold.controller;

import com.team2.leopold.dto.RequestJoinDto;
import com.team2.leopold.dto.RequestLoginDto;
import com.team2.leopold.dto.RequestModifyUserDto;
import com.team2.leopold.entity.User;
import com.team2.leopold.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
public class UserController {
    private UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    /* 회원가입 */
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody RequestJoinDto dto) {
        if (dto.getId().isEmpty() || dto.getPassword().isEmpty() || dto.getName().isEmpty()
                || dto.getZipcode().isEmpty() || dto.getAddress().isEmpty() || dto.getPhone().isEmpty()
                || dto.getEmail().isEmpty() || dto.getAgreeEmailYn().isEmpty() || dto.getAgreeSmsYn().isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("필수 정보 누락");

        User user = new User();
        user.setId(dto.getId());
        user.setPassword(dto.getPassword());
        user.setName(dto.getName());
        user.setZipcode(dto.getZipcode());
        user.setAddress(dto.getAddress());
        user.setAddressDetail(dto.getAddressDetail());
        user.setPhoneAlt(dto.getPhoneAlt());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setAgreeEmailYn(dto.getAgreeEmailYn());
        user.setAgreeSmsYn(dto.getAgreeSmsYn());

        try {
            service.join(user);
            return ResponseEntity.status(HttpStatus.OK).body("회원가입 완료!");
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("중복된 아이디");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류");
        }
    }

    /* 로그인 */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestLoginDto dto, HttpServletRequest request) {
        if (dto.getId().isEmpty() || dto.getPassword().isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("필수 정보 누락");

        User user = new User();
        user.setId(dto.getId());
        user.setPassword(dto.getPassword());

        try {
            User foundUser = service.login(user);

            HttpSession session = request.getSession();
            session.setAttribute("user", foundUser);
            session.setAttribute("userUid", foundUser.getUid());
            session.setAttribute("userPoint", foundUser.getPoint());
            session.setAttribute("userName", foundUser.getName());

            return ResponseEntity.status(HttpStatus.OK).body("로그인 완료!");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 올바르지 않음");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류");
        }
    }

    /* 로그아웃 */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("세션이 존재하지 않음");

        session.invalidate();
        return ResponseEntity.status(HttpStatus.OK).body("로그아웃 완료!");
    }

    /* 현재 로그인된 유저의 uid 반환 */
    @GetMapping("/user/uid")
    public ResponseEntity<?> userUid(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("세션이 존재하지 않음");

        return ResponseEntity.status(HttpStatus.OK).body((Integer) session.getAttribute("userUid"));
    }

    /* 현재 로그인된 유저의 point 반환 */
    @GetMapping("/point")
    public ResponseEntity<?> userPoint(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("세션이 존재하지 않음");

        User foundUser = service.findUser((Integer) session.getAttribute("userUid"));
        return ResponseEntity.status(HttpStatus.OK).body(foundUser.getPoint());
    }

    /* 현재 로그인된 유저 정보 반환 */
    @GetMapping("/user")
    public ResponseEntity<?> findUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("세션이 존재하지 않음");

        User foundUser = service.findUser((Integer) session.getAttribute("userUid"));
        return ResponseEntity.status(HttpStatus.OK).body(foundUser);
    }

    /* 로그인되어 있는지 여부를 반환 */
    @GetMapping("/isLogin")
    public ResponseEntity<?> isLogin(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 존재하지 않음");

        return ResponseEntity.status(HttpStatus.OK).body("로그인되어 있음");
    }

    /* 아이디 중복 확인 */
    @PostMapping("/isUnique")
    public ResponseEntity<?> isUniqueId(@RequestParam(name = "id") String id) {
        boolean isUnique = service.isUniqueUser(id);
        if (isUnique) return ResponseEntity.status(HttpStatus.OK).body("중복 확인 완료!");
        else return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디");
    }

    /* 유저 정보 수정 */
    @PatchMapping("/user")
    public ResponseEntity<?> modifyUser(@RequestBody RequestModifyUserDto dto, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 존재하지 않음");

        try {
            service.modifyUser((Integer) session.getAttribute("userUid"), dto);
            return ResponseEntity.status(HttpStatus.OK).body("유저 정보 수정 완료!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 유저를 찾을 수 없음");
        }
    }

    /* 유저 아이디 찾기 (이메일) */
    @GetMapping("/idByEmail")
    public ResponseEntity<?> findIdByEmail(@RequestParam(name = "name") String name,
                                           @RequestParam(name = "email") String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.findIdByEmail(name, email));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 엔티티를 찾을 수 없음");
        }
    }

    /* 유저 아이디 찾기 (휴대폰) */
    @GetMapping("/idByPhone")
    public ResponseEntity<?> findIdByPhone(@RequestParam(name = "name") String name,
                                           @RequestParam(name = "phone") String phone) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.findIdByPhone(name, phone));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 엔티티를 찾을 수 없음");
        }
    }

    /* 유저 비밀번호 찾기 (이메일) */
    @GetMapping("/passwordByEmail")
    public ResponseEntity<?> findPasswordByEmail(@RequestParam(name = "id") String id,
                                                 @RequestParam(name = "name") String name,
                                                 @RequestParam(name = "email") String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.findPasswordByEmail(id, name, email));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 엔티티를 찾을 수 없음");
        }
    }

    /* 유저 비밀번호 찾기 (휴대폰) */
    @GetMapping("/passwordByPhone")
    public ResponseEntity<?> findPasswordByPhone(@RequestParam(name = "id") String id,
                                                 @RequestParam(name = "name") String name,
                                                 @RequestParam(name = "phone") String phone) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.findPasswordByPhone(id, name, phone));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 엔티티를 찾을 수 없음");
        }
    }
}