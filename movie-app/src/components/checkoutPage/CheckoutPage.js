import {Container, Row} from "react-bootstrap";
import axios from "axios";
import {REST_API_URL} from "../../constants";
import {useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
    const [total, setTotal] = useState(1)
    const [error,setError] = useState({message: ''});

    useEffect(() => {
        async function getTotal() {
            const response = await axios.get(REST_API_URL + "/total");
            setTotal(response.data["total"].toFixed(2));
        }

        getTotal()
            .catch(e => setError(e.response.data))
    }, []);

    async function emptyCart() {
        try {
            const response = await axios.delete(REST_API_URL);
            console.log(response);
            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (e) {
            setError({message: "Error emptying cart , please try again later"});
        }
    }


    return (
        <Container>
            <Row>
                <CheckoutForm emptyCart={emptyCart} total={total}/>
            </Row>
            {/*{isLoading && <LoadingSpinner/>}*/}
        </Container>
    )
}