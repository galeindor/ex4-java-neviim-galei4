import ShoppingCartTable from "../ShoppingCartTable";
import {Col, Container, Row} from "react-bootstrap";
import CheckoutDetails from "../CheckoutDetails";
import {useEffect, useState} from "react";
import axios from "axios";
import {REST_API_URL} from "../../constants";

export default function ShoppingCartPage() {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCart = async () => {
            const response = await axios.get(REST_API_URL);
            const data = response.data;
            setCart(data);
            setMessage(data.length === 0 ? "Your cart is empty, Go Shop! Please =)" : "");

        }
        fetchCart().catch((e) => {
            setError("Error fetching cart , please try again later"); // if there is an error, cart is empty
            console.log(e);
        });
    }, []);

    const emptyCart = () => {
        axios.delete(REST_API_URL).then(() => {
            setCart([]);
            setMessage("Your cart is empty, Go Shop! Please =)");
        }).catch((e) => {
            setError("Error emptying cart , please try again later");
            console.log(e);
        });
    }

    return (
        <Container>
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
                            <ShoppingCartTable cart={cart} setCart={setCart}/>
                        </div>
                        <Col>
                            <CheckoutDetails cartItems={cart}/>
                            <button className="btn btn-outline-danger mt-3" onClick={emptyCart}>Empty Cart</button>
                        </Col>
                    </>
                )
                }
            </Row>
        </Container>
    )
}