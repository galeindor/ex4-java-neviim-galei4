import ShoppingCartTable from "../ShoppingCartTable";
import {Col, Container, Row} from "react-bootstrap";
import CheckoutDetails from "../CheckoutDetails";
import {useEffect, useState} from "react";
import axios from "axios";
import {REST_API_URL} from "../../constants";

export default function ShoppingCartPage() {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCart = async () => {
            const response = await axios.get(REST_API_URL);
            const data = response.data;
            setCart(data);
            setMessage(data.length === 0 ? "Your cart is empty, Go Shop! Please =)" : "");

        }
        fetchCart().catch((e) => {
            setMessage("Error fetching cart , please try again later"); // if there is an error, cart is empty
            console.log(e);
        });
    }, []);

    return (
        <Container>
            <Row>
                {message &&
                    <h2 className="text-center mt-3 text-secondary">{message}</h2>
                }
                {!message && (
                    <>
                        <div className={"col-md-9"}>
                            <ShoppingCartTable cart={cart} setCart={setCart}/>
                        </div>
                        <Col>
                            <CheckoutDetails cartItems={cart}/>
                        </Col>
                    </>
                )
                }
            </Row>
        </Container>
    )
}