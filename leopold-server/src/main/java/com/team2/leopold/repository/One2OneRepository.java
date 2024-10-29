package com.team2.leopold.repository;

import com.team2.leopold.entity.One2One;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface One2OneRepository extends JpaRepository<One2One, Integer> {
    @Query("SELECT o FROM One2One o WHERE o.deleteYn = 'n'")
    Page<One2One> findOne2OneByUid(Pageable pageable);

    @Query("SELECT o FROM One2One o WHERE o.user.uid = :userUid ORDER BY o.writeDate DESC")
    List<One2One> findOne2OneByUserUid(@Param("userUid") Integer userUid);
}