import ShoppingCartTable from "../ShoppingCartTable";
import {Col, Container, Row} from "react-bootstrap";
import CheckoutDetails from "../CheckoutDetails";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {REST_API_URL} from "../../constants";
import {CartContext} from "../../CartContext";
import LoadingSpinner from "../LoadingSpinner";

export default function ShoppingCartPage() {
    const [cart, setCart] = useContext(CartContext);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        setMessage(Array.isArray(cart) && !isLoading && cart.length === 0 ? "Your cart is empty, Go Shop! Please =)" : "");
    }, [cart]);

    const emptyCart = () => {
        setIsLoading(true);
        axios.delete(REST_API_URL).then(() => {
            setCart([]);
            setMessage("Your cart is empty, Go Shop! Please =)");
        }).catch((e) => {
            setError("Error emptying cart , please try again later");
            console.log(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Container>
            {isLoading ? <LoadingSpinner/> : (
                <>
                    <Row>
                        {message &&
                            <h2 className="text-center mt-3 text-secondary">{message}</h2>
                        }
                        {error &&
                            <h2 className="text-center mt-3 text-danger">{message}</h2>
                        }
                    </Row>
                    <Row>
                        {!message && (
                            <>
                                <div className={"col-md-9"}>
                                    <ShoppingCartTable/>
                                </div>
                                <Col>
                                    <CheckoutDetails cartItems={cart}/>
                                    <button className="btn btn-outline-danger mt-3" onClick={emptyCart}>Empty Cart
                                    </button>
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