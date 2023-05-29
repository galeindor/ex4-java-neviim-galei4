package hac.product;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.List;

/**
 * ProductBeanController
 * This class sets up the product bean
 */
@Configuration
public class ProductBeanController {

    /**
     * product bean
     * @return empty ArrayList<Product>
     */
        @Bean(name = "productList")
        @SessionScope
        public List<Product> product() {
            return new ArrayList<>();
        }

}
