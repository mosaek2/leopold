package com.team2.leopold.controller;

import com.team2.leopold.dto.ResponseDownloadDto;
import com.team2.leopold.dto.ResponseDownloadReadDto;
import com.team2.leopold.entity.Download;
import com.team2.leopold.service.DownloadService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DownloadController {
    private final DownloadService downloadService;

    @Autowired
    public DownloadController(DownloadService downloadService) {
        this.downloadService = downloadService;
    }

    /* 자료실 전체 조회 */
    @GetMapping("/downloads")
    public ResponseEntity<?> readDownload(@RequestParam(name = "page") Integer page,
                                          @RequestParam(name = "size") Integer size,
                                          @RequestParam(name = "category") Integer category) {
        try {
            List<ResponseDownloadDto> foundDownloads = downloadService.getDownloads(page, size, category);
            return ResponseEntity.status(HttpStatus.OK).body(foundDownloads);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 않은 categoryUid 입니다.");
        }
    }

    /* 자료실 상세 조회 */
    @GetMapping("/download/{uid}")
    public ResponseEntity<?> readDownload(@PathVariable Integer uid) {
        try {
            Download download = downloadService.readDownload(uid);
            ResponseDownloadReadDto responseDownloadDto = new ResponseDownloadReadDto(
                    download.getUid(),
                    download.getDownloadCategory().getName(),
                    download.getTitle(),
                    download.getContent(),
                    download.getUser().getName(),
                    download.getWriteDate()
            );
            return ResponseEntity.status(HttpStatus.OK).body(responseDownloadDto);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
        }
    }
}