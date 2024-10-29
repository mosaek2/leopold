package com.team2.leopold.service;

import com.team2.leopold.dto.ResponseInterestDto;
import com.team2.leopold.dto.ResponseInterestPageDto;
import com.team2.leopold.entity.Interest;
import com.team2.leopold.entity.Product;
import com.team2.leopold.entity.User;
import com.team2.leopold.repository.InterestRepository;
import com.team2.leopold.repository.ProductRepository;
import com.team2.leopold.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
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
public class InterestService {
    private InterestRepository interestRepository;
    private ProductRepository productRepository;
    private UserRepository userRepository;

    @Autowired
    public InterestService(InterestRepository interestRepository, ProductRepository productRepository,
                           UserRepository userRepository) {
        this.interestRepository = interestRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    /* 관심 상품 등록 */
    @Transactional
    public void insertInterest(Integer userUid, Integer productUid)
            throws EntityNotFoundException, EntityExistsException {
        Optional<Interest> optionalInterest = interestRepository.findByProductUid(productUid);
        if (optionalInterest.isPresent()) {
            throw new EntityExistsException("Product already exists");
        }

        Optional<User> optionalUser = userRepository.findById(userUid);
        if (optionalUser.isEmpty()) throw new EntityNotFoundException();
        User foundUser = optionalUser.get();

        Optional<Product> optionalProduct = productRepository.findById(productUid);
        if (optionalProduct.isEmpty()) throw new EntityNotFoundException();
        Product foundProduct = optionalProduct.get();

        Interest interest = new Interest();
        interest.setUser(foundUser);
        interest.setProduct(foundProduct);
        interestRepository.save(interest);
    }

    /* 관심 상품 삭제 */
    @Transactional
    public void deleteInterest(Integer interestUid) throws EntityNotFoundException {
        Optional<Interest> optionalInterest = interestRepository.findById(interestUid);
        if (optionalInterest.isEmpty()) throw new EntityNotFoundException();

        interestRepository.deleteById(interestUid);
    }

    /* 관심 상품 비우기 */
    @Transactional
    public void deleteInterestAll(Integer userUid) {
        interestRepository.deleteAllByUserUid(userUid);
    }

    /* 관심 상품 목록 */
    public ResponseInterestPageDto findInterestList(Integer userUid, Integer page) {
        Sort sort = Sort.by(Sort.Direction.DESC, "date");
        Pageable pageable = PageRequest.of(page - 1, 10, sort);
        Page<Interest> interestPage = interestRepository.findInterestListByUserUid(userUid, pageable);

        ResponseInterestPageDto interestPageDto = new ResponseInterestPageDto();

        Long totalElements = interestPage.getTotalElements();
        interestPageDto.setTotalElements(totalElements);

        List<ResponseInterestDto> interestDtoList = new ArrayList<>();
        for (Interest i : interestPage.getContent()) {
            Integer calculatedPrice = (int) (i.getProduct().getPrice() * (1 - i.getProduct().getDiscountRate()));
            ResponseInterestDto interestDto = new ResponseInterestDto(i.getUid(), i.getProduct().getCoverUrl(),
                    i.getProduct().getProductCategory().getName(), i.getProduct().getColor(), calculatedPrice,
                    i.getProduct().getUid());
            interestDtoList.add(interestDto);
        }
        interestPageDto.setList(interestDtoList);

        return interestPageDto;
    }
}