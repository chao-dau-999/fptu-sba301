package fu.sba301.pe01.controller;

import fu.sba301.pe01.dto.PageDTO;
import fu.sba301.pe01.dto.RestaurantRequest;
import fu.sba301.pe01.dto.RestaurantResponse;
import fu.sba301.pe01.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@Tag(name = "Restaurant", description = "APIs for managing restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    @Operation(summary = "Get list of restaurants", description = "Filter by name and/or category with pagination")
    @ApiResponse(responseCode = "200", description = "List retrieved successfully")
    public PageDTO<RestaurantResponse> getList(
            @Parameter(description = "Filter by restaurant name (partial match)") @RequestParam(required = false) String name,
            @Parameter(description = "Filter by category ID") @RequestParam(required = false) Long categoryId,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "restaurantName") String sortBy) {
        return restaurantService.getList(name, categoryId, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get restaurant by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Restaurant found"),
            @ApiResponse(responseCode = "404", description = "Restaurant not found")
    })
    public ResponseEntity<RestaurantResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new restaurant")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Restaurant created"),
            @ApiResponse(responseCode = "400", description = "Invalid request body")
    })
    public ResponseEntity<RestaurantResponse> create(@Valid @RequestBody RestaurantRequest request) {
        try {
            return ResponseEntity.ok(restaurantService.create(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing restaurant")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Restaurant updated"),
            @ApiResponse(responseCode = "400", description = "Invalid request body"),
            @ApiResponse(responseCode = "404", description = "Restaurant not found")
    })
    public ResponseEntity<RestaurantResponse> update(@PathVariable Long id,
                                                     @Valid @RequestBody RestaurantRequest request) {
        return ResponseEntity.ok(restaurantService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a restaurant")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Restaurant deleted"),
            @ApiResponse(responseCode = "404", description = "Restaurant not found")
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        restaurantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
