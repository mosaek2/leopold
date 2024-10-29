package com.team2.leopold.controller;

import com.team2.leopold.dto.ResponseProductDto;
import com.team2.leopold.entity.Product;
import com.team2.leopold.service.ProductService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProductController {
    ProductService service;

    @Autowired
    public ProductController(ProductService service) {
        this.service = service;
    }

    /* 상품 목록 조회 */
    @GetMapping("/shopping")
    public ResponseEntity<?> findProducts(@RequestParam(name = "category") Integer category,
                                          @RequestParam(name = "page") Integer page,
                                          @RequestParam(name = "sort") String sort) {
        try {
            Page<Product> productList = service.findProducts(page, 100, category, sort);

            List<ResponseProductDto> dtoList = new ArrayList<>();


            for (Product p : productList.getContent()) {
                ResponseProductDto dto = new ResponseProductDto(p.getUid(), p.getCoverUrl(), p.getDetailUrl(),
                        p.getDate(), p.getPrice(), p.getDiscountRate(), p.getSoldOutYn(), p.getColor(),
                        p.getEngraving(), p.getSwitchValue(), p.getProductCategory().getName());
                dtoList.add(dto);
            }

            return ResponseEntity.status(HttpStatus.OK).body(dtoList);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("필수 정보 누락");
        }
    }

    /* 상품 상세 조회 */
    @GetMapping("/shopping/detail")
    public ResponseEntity<?> findProduct(@RequestParam(name = "uid") Integer uid) {
        try {
            Product foundProduct = service.findProduct(uid);
            ResponseProductDto dto = new ResponseProductDto(foundProduct.getUid(), foundProduct.getCoverUrl(),
                    foundProduct.getDetailUrl(), foundProduct.getDate(), foundProduct.getPrice(),
                    foundProduct.getDiscountRate(), foundProduct.getSoldOutYn(), foundProduct.getColor(),
                    foundProduct.getEngraving(), foundProduct.getSwitchValue(),
                    foundProduct.getProductCategory().getName());
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 않은 uid");
        }
    }
}