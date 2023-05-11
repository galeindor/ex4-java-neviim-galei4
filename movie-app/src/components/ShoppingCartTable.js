import CartItem from "./CartItem";
import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {REST_API_URL} from "../constants";
import axios, {get} from "axios";

export default function ShoppingCartTable() {
    const [cart, setCart] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(() => {
        const fetchCart = async () => {
            const response = await axios.get(REST_API_URL);
            const data = response.data;
            setCart(data);
            setIsEmpty(data.length === 0);
        }
        fetchCart().catch((e) => {
            console.log(e);
        });
    }, []);

    return (
        <>
            {isEmpty &&
                <h2 className="text-center mt-2 text-danger">Your cart is empty, Go Shop!</h2>
            }
            {!isEmpty &&
                <Table striped bordered hover style={{fontFamily: "cursive"}}>
                    <thead>
                    <tr>
                        <th></th>
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