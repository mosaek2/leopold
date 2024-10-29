package com.team2.leopold.service;

import com.team2.leopold.dto.RequestModifyUserDto;
import com.team2.leopold.entity.User;
import com.team2.leopold.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserService {
    private UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    /* 회원가입 */
    @Transactional
    public void join(User user) throws DuplicateKeyException {
        Optional<User> optionalUser = repository.findById(user.getId());
        if (optionalUser.isPresent()) throw new DuplicateKeyException(null);

        repository.save(user);
    }

    /* 로그인 */
    public User login(User user) throws AuthenticationException {
        Optional<User> optionalUser = repository.findById(user.getId());

        if (optionalUser.isEmpty()) throw new AuthenticationException();
        User foundUser = optionalUser.get();

        if (!foundUser.getPassword().equals(user.getPassword())) throw new AuthenticationException();
        return foundUser;
    }

    /* 포인트 차감 */
    @Transactional
    public void reducePoint(Integer amount, Integer userUid) {
        User foundUser = repository.findById(userUid).get();
        foundUser.setPoint(foundUser.getPoint() - amount);
        repository.save(foundUser);
    }

    /* 포인트 증가 */
    @Transactional
    public void increasePoint(Integer amount, Integer userUid) {
        User foundUser = repository.findById(userUid).get();
        foundUser.setPoint(foundUser.getPoint() + amount);
        repository.save(foundUser);
    }

    /* 유저 정보 반환 */
    public User findUser(Integer userUid) {
        return repository.findById(userUid).get();
    }

    /* 아이디 중복 확인 */
    public boolean isUniqueUser(String id) {
        Optional<User> optionalUser = repository.findById(id);
        if (optionalUser.isPresent()) return false;
        else return true;
    }

    /* 유저 정보 수정 */
    @Transactional
    public void modifyUser(Integer userUid, RequestModifyUserDto dto) throws EntityNotFoundException {
        Optional<User> optionalUser = repository.findById(userUid);
        if (optionalUser.isEmpty()) throw new EntityNotFoundException();

        User foundUser = optionalUser.get();
        foundUser.setPassword(dto.getPassword());
        foundUser.setName(dto.getName());
        foundUser.setZipcode(dto.getZipcode());
        foundUser.setAddress(dto.getAddress());
        foundUser.setAddressDetail(dto.getAddressDetail());
        if (dto.getPhoneAlt() == null) foundUser.setPhoneAlt(null);
        else foundUser.setPhoneAlt(dto.getPhoneAlt());
        foundUser.setPhone(dto.getPhone());
        foundUser.setEmail(dto.getEmail());
        foundUser.setAgreeSmsYn(dto.getAgreeSmsYn());
        foundUser.setAgreeEmailYn(dto.getAgreeEmailYn());

        repository.save(foundUser);
    }

    /* 유저 아이디 찾기 (이메일) */
    public String findIdByEmail(String name, String email) throws EntityNotFoundException {
        Optional<User> optionalUser = repository.findByNameAndEmail(name, email);
        if (optionalUser.isEmpty()) throw new EntityNotFoundException();

        return optionalUser.get().getId();
    }

    /* 유저 아이디 찾기 (휴대폰) */
    public String findIdByPhone(String name, String phone) throws EntityNotFoundException {
        Optional<User> optionalUser = repository.findByNameAndPhone(name, phone);
        if (optionalUser.isEmpty()) throw new EntityNotFoundException();

        return optionalUser.get().getId();
    }

    /* 유저 비밀번호 찾기 (이메일) */
    public String findPasswordByEmail(String id, String name, String email) throws EntityNotFoundException {
        Optional<User> optionalUser = repository.findById(id);
        if (optionalUser.isEmpty()) throw new EntityNotFoundException();

        User foundUser = optionalUser.get();
        if (foundUser.getName().equals(name) && foundUser.getEmail().equals(email)) return foundUser.getPassword();
        else throw new EntityNotFoundException();
    }

    /* 유저 비밀번호 찾기 (휴대폰) */
    public String findPasswordByPhone(String id, String name, String phone) throws EntityNotFoundException {
        Optional<User> optionalUser = repository.findById(id);
        if (optionalUser.isEmpty()) throw new EntityNotFoundException();

        User foundUser = optionalUser.get();
        if (foundUser.getName().equals(name) && foundUser.getPhone().equals(phone)) return foundUser.getPassword();
        else throw new EntityNotFoundException();
    }
}