package com.team2.leopold.repository;

import com.team2.leopold.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = """
            WITH RECURSIVE subcategories AS (
                SELECT uid
                FROM product_category
                WHERE uid = :categoryUid
                UNION ALL
                SELECT pc.uid
                FROM product_category pc
                JOIN subcategories sc ON pc.parent_uid = sc.uid
            )
            SELECT p.*
            FROM product p
            WHERE p.category_uid IN (SELECT uid FROM subcategories)
            GROUP BY p.category_uid, p.color
            """, nativeQuery = true)
    Page<Product> findProducts(@Param("categoryUid") Integer categoryUid, Pageable pageable);

    @Query(value = """
            SELECT p.*
            FROM product p
            JOIN product_category pc
            ON p.category_uid = pc.uid
            WHERE pc.name = :name AND p.color = :color AND p.engraving = :engraving AND p.`switch` = :switch
            """, nativeQuery = true)
    Optional<Product> findProduct(@Param("name") String category2, @Param("color") String category3, @Param("engraving") String category4, @Param("switch") String category5);
}