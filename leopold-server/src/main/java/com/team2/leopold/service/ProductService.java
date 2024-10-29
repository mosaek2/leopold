package com.team2.leopold.service;

import com.team2.leopold.entity.Product;
import com.team2.leopold.repository.ProductRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ProductService {
    ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    /* 상품 목록 조회 */
    public Page<Product> findProducts(Integer page, Integer pageSize, Integer CategoryUid, String sort)
            throws BadRequestException {

        Sort newSort;
        if (sort.equals("new")) {
            newSort = Sort.by(Sort.Direction.DESC, "date");
        } else if (sort.equals("high")) {
            newSort = Sort.by(Sort.Direction.DESC, "price");
        } else if (sort.equals("low")) {
            newSort = Sort.by(Sort.Direction.ASC, "price");
        } else {
            throw new BadRequestException();
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize, newSort);
        return repository.findProducts(CategoryUid, pageable);
    }

    /* 상품 상세 조회 */
    public Product findProduct(Integer uid) throws BadRequestException {
        Optional<Product> optionalProduct = repository.findById(uid);
        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        } else throw new BadRequestException();
    }
}