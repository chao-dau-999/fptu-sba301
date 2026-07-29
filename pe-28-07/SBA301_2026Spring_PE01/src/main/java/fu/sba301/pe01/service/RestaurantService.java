package fu.sba301.pe01.service;

import fu.sba301.pe01.dto.PageDTO;
import fu.sba301.pe01.dto.RestaurantRequest;
import fu.sba301.pe01.dto.RestaurantResponse;
import org.springframework.data.domain.Pageable;

public interface RestaurantService {

    PageDTO<RestaurantResponse> getList(String name, Long categoryId, Pageable pageable);

    RestaurantResponse getById(Long id);

    RestaurantResponse create(RestaurantRequest request);

    RestaurantResponse update(Long id, RestaurantRequest request);

    void delete(Long id);
}
