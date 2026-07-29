package fu.sba301.pe01.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RestaurantResponse {
    private Long restaurantId;
    private String restaurantName;
    private Float priceFrom;
    private Float priceTo;
    private String ownerName;
    private LocalDate openDate;
    private String address;
    private Long categoryId;
    private String categoryName;
}
