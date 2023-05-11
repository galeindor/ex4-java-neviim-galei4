import ShoppingCartTable from "../ShoppingCartTable";
import {Col, Container, Row} from "react-bootstrap";
import CheckoutDetails from "../CheckoutDetails";
import {useEffect, useState} from "react";
import axios from "axios";
import {REST_API_URL} from "../../constants";

export default function ShoppingCartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await axios.get(REST_API_URL);
            const data = response.data;
            setCart(data);
        }
        fetchCart().catch((e) => {
            console.log(e);
        });
    }, []);

    return (
        <Container>
            <Row>
                <div className={"col-md-9"}>
                    <ShoppingCartTable cart={cart} setCart={setCart}/>
                </div>
                <Col>
                    <CheckoutDetails cartItems={cart}/>
                </Col>
            </Row>
        </Container>
    )
}