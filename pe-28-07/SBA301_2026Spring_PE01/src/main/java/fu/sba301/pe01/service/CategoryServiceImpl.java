package fu.sba301.pe01.service;

import fu.sba301.pe01.dto.CategoryDto;
import fu.sba301.pe01.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getAll() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDto(c.getCategoryId(), c.getCategoryName()))
                .toList();
    }
}
