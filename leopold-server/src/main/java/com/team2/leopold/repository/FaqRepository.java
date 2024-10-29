package com.team2.leopold.repository;

import com.team2.leopold.entity.Faq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FaqRepository extends JpaRepository<Faq, Integer> {
    @Query("SELECT f FROM Faq f JOIN FETCH f.faqCategory WHERE f.faqCategory.uid = :categoryUid")
    Page<Faq> findFaqsByCategoryUid(@Param("categoryUid") int categoryUid, Pageable pageable);
}