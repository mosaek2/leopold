package com.team2.leopold.service;

import com.team2.leopold.entity.As;
import com.team2.leopold.repository.AsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AsService {
    private final AsRepository asRepository;

    @Autowired
    public AsService(AsRepository asRepository) {//
        this.asRepository = asRepository;
    }

    /* As 전체 조회 */
    public List<As> getAsList() {//
        return asRepository.findAll();
    }
}