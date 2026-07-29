package fu.sba301.pe01.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "Restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long restaurantId; // Mapping với kiểu 'long' và Identity

    @Column(name = "restaurant_name", length = 100, nullable = false, unique = true)
    private String restaurantName; // "No duplicate" -> unique = true

    @Min(value = 1001, message = "Price must be greater than 1000")
    @Column(name = "price_from")
    private Float priceFrom;

    @Min(value = 1001, message = "Price must be greater than 1000")
    @Column(name = "price_to")
    private Float priceTo;

    @Column(name = "owner_name", length = 100)
    private String ownerName;

    @Column(name = "open_date")
    private LocalDate openDate; // Format dd/MM/yyyy handled by Jackson/Spring in Web layer

    @Column(name = "address", length = 100)
    private String address;

    // Quan hệ với bảng Category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}