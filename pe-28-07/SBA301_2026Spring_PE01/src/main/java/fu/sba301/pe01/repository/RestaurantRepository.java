package fu.sba301.pe01.repository;

import fu.sba301.pe01.entity.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("SELECT r FROM Restaurant r WHERE " +
           "(:name IS NULL OR LOWER(r.restaurantName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:categoryId IS NULL OR r.category.categoryId = :categoryId)")
    Page<Restaurant> findByFilters(@Param("name") String name,
                                   @Param("categoryId") Long categoryId,
                                   Pageable pageable);

    boolean existsByRestaurantName(String restaurantName);
}
