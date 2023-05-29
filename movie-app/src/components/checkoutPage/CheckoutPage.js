import {Container, Row} from "react-bootstrap";
import axios from "axios";
import {REST_API_URL} from "../../constants";
import {useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner";
import CheckoutForm from "./CheckoutForm";
import {useFetch} from "../../customHooks/useFetch";

export default function CheckoutPage() {
    const [total, setTotal] = useState(1)
    const [{data, isLoading, errors}, doFetch] = useFetch(false);
    const [error,setError] = useState({message: ''});

    useEffect(() => {
        async function getTotal() {
            const response = await axios.get(REST_API_URL + "/total");
            if(response.data["total"] === 0) // if cart is empty
                setError({message: "Cart is empty , please add items to cart to checkout"})
            setTotal(response.data["total"].toFixed(2));
        }

        getTotal()
            .catch(e => setError(e.response.data))
    }, []);

    async function emptyCart() {
        try {
            const response = await axios.delete(REST_API_URL);
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
                { error ? <h2 className={"text-center"}>{error.message}</h2> : <CheckoutForm emptyCart={emptyCart} total={total}/>}
            </Row>
            {isLoading && <LoadingSpinner/>}
        </Container>
    )
}