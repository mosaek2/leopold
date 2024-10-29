package com.team2.leopold.service;

import com.team2.leopold.entity.AsReception;
import com.team2.leopold.repository.AsReceptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AsReceptionService {
    private final AsReceptionRepository asReceptionRepository;

    @Autowired
    public AsReceptionService(AsReceptionRepository asReceptionRepository) {
        this.asReceptionRepository = asReceptionRepository;
    }

    /* As 접수 */
    @Transactional
    public void writeAs(AsReception asReception) {//
        asReceptionRepository.save(asReception);
    }
}