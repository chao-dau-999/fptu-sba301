package fu.sba301.pe01.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class RestaurantRequest {

    @NotBlank(message = "Restaurant name is required")
    @Size(max = 100, message = "Restaurant name must not exceed 100 characters")
    private String restaurantName;

    @NotNull(message = "Price from is required")
    @Min(value = 1001, message = "Price from must be greater than 1000")
    private Float priceFrom;

    @NotNull(message = "Price to is required")
    @Min(value = 1001, message = "Price to must be greater than 1000")
    private Float priceTo;

    @Size(max = 100, message = "Owner name must not exceed 100 characters")
    private String ownerName;

    @PastOrPresent(message = "Open date must not be in the future")
    private LocalDate openDate;

    @Size(max = 100, message = "Address must not exceed 100 characters")
    private String address;

    @NotNull(message = "Category ID is required")
    @Positive(message = "Category ID must be a positive number")
    private Long categoryId;

    @AssertTrue(message = "Price to must be greater than or equal to price from")
    private boolean isPriceRangeValid() {
        if (priceFrom == null || priceTo == null) return true;
        return priceTo >= priceFrom;
    }
}
