package fu.sba301.pe01.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId; // Mapping với kiểu 'long' và Identity

    @Column(name = "category_name", length = 100, nullable = false, unique = true)
    private String categoryName; // "No duplicate" -> unique = true
}
