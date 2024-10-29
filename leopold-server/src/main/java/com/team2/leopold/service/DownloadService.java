package com.team2.leopold.service;

import com.team2.leopold.dto.ResponseDownloadDto;
import com.team2.leopold.entity.Download;
import com.team2.leopold.repository.DownloadRepository;
import org.apache.coyote.BadRequestException;
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
public class DownloadService {
    private final DownloadRepository downloadRepository;

    @Autowired
    public DownloadService(DownloadRepository downloadRepository) {//
        this.downloadRepository = downloadRepository;
    }

    /* 자료실 전체 조회 */
    public List<ResponseDownloadDto> getDownloads(Integer page, Integer size, Integer categoryUid)
            throws BadRequestException {
        Sort sort = Sort.by(Sort.Direction.DESC, "uid");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Download> downloads = null;

        if (categoryUid == 1) {
            downloads = downloadRepository.findDownloadsByCategory(1, pageable);
        } else if (categoryUid == 2) {
            downloads = downloadRepository.findDownloadsByCategory(2, pageable);
        } else if (categoryUid == 3) {
            downloads = downloadRepository.findDownloadsByCategory(3, pageable);
        } else if (categoryUid == 0) {
            downloads = downloadRepository.findAll(pageable);
        } else {
            throw new BadRequestException();
        }

        List<ResponseDownloadDto> responseDownloadDtoList = new ArrayList<>();
        for (Download download : downloads.getContent()) {
            ResponseDownloadDto responseDownloadDto = new ResponseDownloadDto(download.getUid(),
                    download.getDownloadCategory().getUid(), download.getDownloadCategory().getName(),
                    download.getTitle(), download.getUser().getName(), download.getWriteDate(),
                    downloads.getTotalElements(), downloads.getTotalPages());
            responseDownloadDtoList.add(responseDownloadDto);
        }
        return responseDownloadDtoList;
    }

    /* 자료실 상세 조회 */
    public Download readDownload(Integer uid) {
        Optional<Download> foundDownload = downloadRepository.findById(uid);
        return foundDownload.orElse(null);
    }
}