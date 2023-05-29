package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class is the controller for the purchases.
 * It handles the HTTP requests and responses.
 * It uses the JPA repository to access the SQL database.
 * It uses the Purchase class to create the objects.
 * It uses the PurchaseRepository interface to access the SQL database.
 */
@RestController
@RequestMapping("/purchases")
public class PurchaseController {

    /**
     * This is the JPA repository (SQL database).
     */
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    /**
     * This method returns all the purchases.
     * @return all the purchases
     */
    @GetMapping("/")
    public List<Purchase> showPurchases() {
        return repository.findAll(); // this is a JPA method to get all the purchases
    }

    /**
     * This method adds a purchase to the SQL database.
     * @param purchase the purchase to be added
     * @return the purchase that was added
     */
    @PostMapping("/")
    public Purchase addPurchase(@Valid @RequestBody Purchase purchase) {
        repository.save(purchase);
        return purchase;
    }

    /**
     * This method handles the exceptions for the validation of the purchase.
     * @param ex the exception
     * @return the errors
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

}
