package fu.sba301.pe01.service;

import fu.sba301.pe01.dto.PageDTO;
import fu.sba301.pe01.dto.RestaurantRequest;
import fu.sba301.pe01.dto.RestaurantResponse;
import fu.sba301.pe01.entity.Category;
import fu.sba301.pe01.entity.Restaurant;
import fu.sba301.pe01.repository.RestaurantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Override
    public PageDTO<RestaurantResponse> getList(String name, Long categoryId, Pageable pageable) {
        return PageDTO.from(restaurantRepository.findByFilters(name, categoryId, pageable).map(this::toResponse));
    }

    @Override
    public RestaurantResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    public RestaurantResponse create(RestaurantRequest request) {
        if (restaurantRepository.existsByRestaurantName(request.getRestaurantName())) {
            throw new IllegalArgumentException("Restaurant name already exists: " + request.getRestaurantName());
        }
        return toResponse(restaurantRepository.save(toEntity(new Restaurant(), request)));
    }

    @Override
    public RestaurantResponse update(Long id, RestaurantRequest request) {
        return toResponse(restaurantRepository.save(toEntity(findOrThrow(id), request)));
    }

    @Override
    public void delete(Long id) {
        findOrThrow(id);
        restaurantRepository.deleteById(id);
    }

    private Restaurant findOrThrow(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found: " + id));
    }

    private Restaurant toEntity(Restaurant r, RestaurantRequest req) {
        r.setRestaurantName(req.getRestaurantName());
        r.setPriceFrom(req.getPriceFrom());
        r.setPriceTo(req.getPriceTo());
        r.setOwnerName(req.getOwnerName());
        r.setOpenDate(req.getOpenDate());
        r.setAddress(req.getAddress());
        Category category = new Category();
        category.setCategoryId(req.getCategoryId());
        r.setCategory(category);
        return r;
    }

    private RestaurantResponse toResponse(Restaurant r) {
        RestaurantResponse res = new RestaurantResponse();
        res.setRestaurantId(r.getRestaurantId());
        res.setRestaurantName(r.getRestaurantName());
        res.setPriceFrom(r.getPriceFrom());
        res.setPriceTo(r.getPriceTo());
        res.setOwnerName(r.getOwnerName());
        res.setOpenDate(r.getOpenDate());
        res.setAddress(r.getAddress());
        res.setCategoryId(r.getCategory().getCategoryId());
        res.setCategoryName(r.getCategory().getCategoryName());
        return res;
    }
}
