package fu.sba301.pe01.config;

import fu.sba301.pe01.entity.Category;
import fu.sba301.pe01.entity.Restaurant;
import fu.sba301.pe01.repository.CategoryRepository;
import fu.sba301.pe01.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitialization implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    public void run(String... args) {
        seedCategories();
        seedRestaurants();
    }

    private void seedCategories() {
        List<String> defaultCategories = List.of(
                "Fast Food", "Seafood", "Vegetarian", "BBQ & Grill",
                "Italian", "Japanese", "Chinese", "Vietnamese"
        );
        defaultCategories.forEach(name -> {
            if (!categoryRepository.existsByCategoryName(name)) {
                categoryRepository.save(new Category(null, name));
            }
        });
    }

    private void seedRestaurants() {
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) return;

        List<Object[]> data = List.of(
                new Object[]{"Pho 24",          1500f,  3000f,  "Nguyen Van A", LocalDate.of(2020, 3, 10), "12 Le Loi, HCM",       "Vietnamese"},
                new Object[]{"KFC Nguyen Hue",  2000f,  5000f,  "Tran Thi B",   LocalDate.of(2018, 6, 15), "45 Nguyen Hue, HCM",   "Fast Food"},
                new Object[]{"Lobster Palace",  5000f, 15000f,  "Le Van C",     LocalDate.of(2019, 1, 20), "88 Hai Ba Trung, HN",  "Seafood"},
                new Object[]{"Green Garden",    1200f,  2500f,  "Pham Thi D",   LocalDate.of(2021, 7, 5),  "33 Tran Phu, DN",      "Vegetarian"},
                new Object[]{"BBQ Kingdom",     3000f,  8000f,  "Hoang Van E",  LocalDate.of(2017, 9, 12), "77 Ly Thuong Kiet, HN","BBQ & Grill"},
                new Object[]{"La Bella Italia", 4000f, 10000f,  "Marco Rossi",  LocalDate.of(2022, 2, 28), "5 Dong Khoi, HCM",     "Italian"},
                new Object[]{"Sakura Sushi",    3500f,  9000f,  "Tanaka Yuki",  LocalDate.of(2020, 11, 3), "19 Pham Ngoc Thach, HCM","Japanese"},
                new Object[]{"Dragon Palace",   2500f,  6000f,  "Chen Wei",     LocalDate.of(2016, 4, 18), "101 Tran Hung Dao, HN","Chinese"},
                new Object[]{"Burger Barn",     1800f,  4000f,  "Nguyen Thi F", LocalDate.of(2023, 5, 22), "66 Vo Thi Sau, HCM",   "Fast Food"},
                new Object[]{"Ocean Breeze",    4500f, 12000f,  "Le Thi G",     LocalDate.of(2021, 8, 30), "22 Bach Dang, DN",     "Seafood"}
        );

        data.forEach(row -> {
            String name = (String) row[0];
            if (restaurantRepository.existsByRestaurantName(name)) return;

            String categoryName = (String) row[6];
            Category category = categories.stream()
                    .filter(c -> c.getCategoryName().equals(categoryName))
                    .findFirst().orElse(categories.get(0));

            Restaurant r = new Restaurant();
            r.setRestaurantName(name);
            r.setPriceFrom((Float) row[1]);
            r.setPriceTo((Float) row[2]);
            r.setOwnerName((String) row[3]);
            r.setOpenDate((LocalDate) row[4]);
            r.setAddress((String) row[5]);
            r.setCategory(category);
            restaurantRepository.save(r);
        });
    }
}
