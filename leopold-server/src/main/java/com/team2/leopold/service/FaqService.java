package com.team2.leopold.service;

import com.team2.leopold.entity.Faq;
import com.team2.leopold.repository.FaqRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class FaqService {
    private FaqRepository faqRepository;

    @Autowired
    public FaqService(FaqRepository faqRepository) {//
        this.faqRepository = faqRepository;
    }

    /* FAQ 전체 목록 조회 */
    public Page<Faq> findFaqs(Integer page, Integer size, Integer categoryUid) throws BadRequestException {
        Sort sort = Sort.by(Sort.Direction.DESC, "uid");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Faq> faqs;

        if (categoryUid == 0) {
            faqs = faqRepository.findAll(pageable);
        } else if (categoryUid == 1) {
            faqs = faqRepository.findFaqsByCategoryUid(1, pageable);
        } else if (categoryUid == 2) {
            faqs = faqRepository.findFaqsByCategoryUid(2, pageable);
        } else if (categoryUid == 3) {
            faqs = faqRepository.findFaqsByCategoryUid(3, pageable);
        } else if (categoryUid == 4) {
            faqs = faqRepository.findFaqsByCategoryUid(4, pageable);
        } else {
            throw new BadRequestException();
        }

        return faqs;
    }
}