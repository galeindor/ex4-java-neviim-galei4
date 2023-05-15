package hac;

import hac.product.Product;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/media")
public class MediaController {

    @Resource(name = "productList")
    private List<Product> products;

    @GetMapping("/")
    public List<Product> showPurchases() {
        return products;
    }

    @PostMapping("/")
    public boolean addProduct(@RequestBody Product product) {
        for (Product p : products) {
            if (p.getId() == product.getId()) { // product already exists
                return false;
            }
        }
        return products.add(product);
    }

    @DeleteMapping("/{id}")
    public boolean deleteProduct(@PathVariable int id) {
        for (Product p : products) {
            if (p.getId() == id) {
                return products.remove(p);
            }
        }
        return false;
    }

    @GetMapping("/total")
    public Map<String, Double> getTotal() {
        double total = 0;
        double tax = 0;
        double subTotal = 0;
        for (Product p : products) {
            subTotal += p.getPrice();
            tax += p.getTax();
            total += p.getPrice() + p.getTax();
        }
        Map<String, Double> result = new HashMap<>();
        result.put("total", total);
        result.put("tax", tax);
        result.put("subTotal", subTotal);
        return result;
    }

}
