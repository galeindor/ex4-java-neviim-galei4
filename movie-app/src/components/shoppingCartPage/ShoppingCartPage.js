import ShoppingCartTable from "./ShoppingCartTable";
import {Col, Container, Row} from "react-bootstrap";
import CheckoutDetails from "./CheckoutDetails";
import {useContext, useEffect, useState} from "react";
import {cartConstants, REST_API_URL} from "../../constants";
import {CartContext} from "../../CartContext";
import LoadingSpinner from "../LoadingSpinner";
import {useFetch} from "../../customHooks/useFetch";

/**
 * Shopping cart page component
 * @returns {JSX.Element} Shopping cart page component
 * @constructor ShoppingCartPage
 */
export default function ShoppingCartPage() {
    const [{data, isLoading, errors}, doFetch] = useFetch(false);
    const [cart, setCart] = useContext(CartContext);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // Effect to set the message to be displayed when the cart is empty
    useEffect(() => {
        setMessage(Array.isArray(cart) && !isLoading && cart.length === 0 ? cartConstants.EMPTY_CART_SUCCESS : "");
    }, [cart]);

    // Function to empty the cart when the user clicks on the empty cart button
    const emptyCart = () => {
        doFetch(REST_API_URL, "DELETE");
    }

    // Effect to empty the cart when the user clicks on the empty cart button
    useEffect(() => {
        if (data) { // data is not null
            setCart([]);
            setMessage(cartConstants.EMPTY_CART_SUCCESS);
            setError("");
        }
        if (Array.isArray(error) && errors.length > 0) { // errors is not null
            setMessage("")
            setError(cartConstants.EMPTY_CART_ERROR);
        }
    }, [data, errors]);

    return (
        <Container>
            {isLoading ? <LoadingSpinner/> : (
                <>
                    <Row>
                        {message &&
                            <h2 className="text-center mt-3 text-secondary">{message}</h2>
                        }
                        {error &&
                            <h2 className="text-center mt-3 text-danger">{error}</h2>
                        }
                    </Row>
                    <Row>
                        {!message && (
                            <>
                                <div className={"col-md-9"}>
                                    <ShoppingCartTable/>
                                </div>
                                <Col>
                                    <CheckoutDetails cartItems={cart} emptyCart={emptyCart}/>
                                </Col>
                            </>
                        )
                        }
                    </Row>
                </>
            )}
        </Container>
    )
}