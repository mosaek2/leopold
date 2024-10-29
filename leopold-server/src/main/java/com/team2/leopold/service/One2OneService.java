package com.team2.leopold.service;

import com.team2.leopold.entity.One2One;
import com.team2.leopold.repository.One2OneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class One2OneService {
    private One2OneRepository one2OneRepository;

    @Autowired
    public One2OneService(One2OneRepository repository) {
        this.one2OneRepository = repository;
    }

    /* 일대일 문의 작성 */
    @Transactional
    public void insertOne2One(One2One one2One) {
        one2OneRepository.save(one2One);
    }

    /* 일대일 문의 상세 조회 */
    public One2One findOne2One(int uid) {
        Optional<One2One> foundOne2One = one2OneRepository.findById(uid);
        if (foundOne2One.isPresent()) {
            return foundOne2One.get();
        }
        return null;
    }

    /* 일대일 문의 페이징 */
    public Page<One2One> findOne2Ones(Integer page, Integer size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "uid");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<One2One> one2Ones;

        one2Ones = one2OneRepository.findOne2OneByUid(pageable);

        return one2Ones;
    }

    /* 특정 사용자의 일대일 문의 목록 */
    public List<One2One> findOne2OnesByUserUid(Integer userUid) {
        return one2OneRepository.findOne2OneByUserUid(userUid);
    }
}