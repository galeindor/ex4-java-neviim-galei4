package hac.product;

import jakarta.persistence.Id;
import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import java.io.Serializable;

/**
 * Product
 * This class is the model for the product entity
 * It contains the product's name, description, price, tax and posterUrl
 * this class is used by the product controller.
 */
@Component
public class Product implements Serializable {
    /**
     * Product id
     * must be unique
     */
    @Id
    private int id;

    /**
     * Product name
     * must not be empty
     */
    @NotEmpty(message = "Product name is mandatory")
    private String name;

    /**
     * Product description
     * must not be empty
     */
    @NotEmpty(message = "Product description is mandatory")
    private String description;

    /**
     * Product price
     * must be positive or zero
     */
    @PositiveOrZero(message = "Product price must be positive or zero")
    private Float price;

    /**
     * Product tax
     * must be positive or zero
     */
    @PositiveOrZero(message = "Product tax must be positive or zero")
    private Float tax = 0.0f;

    /**
     * Product posterUrl
     * must not be empty
     */
    private String posterUrl;

    /**
     * Product constructor
     * @param id - product id
     * @param name - product name
     * @param description - product description
     * @param posterUrl - product posterUrl
     * @param price - product price
     */
    public Product(int id,String name, String description, String posterUrl, Float price) {
        this.name = name;
        this.description = description;
        this.posterUrl = posterUrl;
        this.price = price;
        this.tax = price * 0.1f;
        this.id = id;
    }

    public Product() {
    }

    // getters and setters

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Float getPrice() {
        return price;
    }
    public String getPosterUrl() {
        return posterUrl;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Float getTax() {
        return this.tax;
    }

    public void setTax(Float tax) {
        this.tax = tax;
    }
}
