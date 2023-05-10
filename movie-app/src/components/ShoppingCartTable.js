import CartItem from "./CartItem";
import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {REST_API_URL} from "../constants";
import axios, {get} from "axios";

export default function ShoppingCartTable() {
    const [cart, setCart] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    useEffect(() => {
        const fetchCart = async () => {
            const response = await axios.get(REST_API_URL);
            setCart(await response.data);
        }
        fetchCart().catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        setIsEmpty(cart.length === 0);
    }, [cart]);

    return (
        <>
            {isEmpty &&
                <h2 className="text-center mt-2 text-danger">Your cart is empty, Go Shop!</h2>
            }
            {!isEmpty &&
                <Table striped bordered hover style={{fontFamily: "cursive"}}>
                    <thead>
                    <tr>
                        <th>Movie Poster</th>
                        <th>Movie title</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item}/>

                    ))}
                    </tbody>
                </Table>
            }
        </>
    )
}