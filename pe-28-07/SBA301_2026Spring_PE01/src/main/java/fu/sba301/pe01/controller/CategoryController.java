package fu.sba301.pe01.controller;

import fu.sba301.pe01.dto.CategoryDto;
import fu.sba301.pe01.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Category", description = "APIs for managing categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    @Operation(summary = "Get all categories")
    @ApiResponse(responseCode = "200", description = "List retrieved successfully")
    public List<CategoryDto> getAll() {
        return categoryService.getAll();
    }
}
