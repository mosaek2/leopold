package com.team2.leopold.repository;

import com.team2.leopold.entity.Download;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DownloadRepository extends JpaRepository<Download, Integer> {
    @Query("SELECT d FROM Download d JOIN FETCH d.downloadCategory WHERE d.downloadCategory.uid = :categoryUid")
    Page<Download> findDownloadsByCategory(@Param("categoryUid") Integer categoryUid, Pageable pageable);
}