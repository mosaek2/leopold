package com.team2.leopold.service;

import com.team2.leopold.dto.ResponseNoticeDto;
import com.team2.leopold.entity.Notice;
import com.team2.leopold.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository) {//
        this.noticeRepository = noticeRepository;
    }

    public Notice readNotice(Integer uid) {
        Optional<Notice> foundNotice = noticeRepository.findById(uid);
        if (foundNotice.isPresent()) {
            return foundNotice.get();
        }
        return null;
    }

    /* 공지사항 전체 조회 */
    public List<ResponseNoticeDto> getNotices(Integer page, Integer pageSize) {
        Sort sort = Sort.by(Sort.Direction.DESC, "uid");
        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<Notice> notices = noticeRepository.findAll(pageable);

        List<ResponseNoticeDto> responseNoticeDtoList = new ArrayList<>();
        for (Notice notice : notices.getContent()) {
            ResponseNoticeDto responseNoticeDto = new ResponseNoticeDto(notice.getUid(), notice.getTitle(),
                    notice.getUser().getName(), notice.getWriteDate(), notice.getHit(), notices.getTotalElements(),
                    notices.getTotalPages());
            responseNoticeDtoList.add(responseNoticeDto);
        }
        return responseNoticeDtoList;
    }
}