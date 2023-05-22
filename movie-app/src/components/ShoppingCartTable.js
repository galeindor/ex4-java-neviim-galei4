import CartItem from "./CartItem";
import {Table} from "react-bootstrap";
import {useContext, useState} from "react";
import {CartContext} from "../CartContext";


export default function ShoppingCartTable() {
    const [cart, setCart] = useContext(CartContext);
    const [error, setError] = useState({});

    /**
     * function to delete an item from the cart (local state)
     * @param itemId the id of the item to be deleted
     */
    function deleteItem(itemId) {
        setCart(cart.filter(item => item.id !== itemId));
    }

    return (
        error.message ? <div className={"alert alert-danger"}>{error.message}</div> : (
            <Table striped bordered hover style={{fontFamily: "cursive"}} className={"mt-2"}>
                <thead>
                <tr>
                    <th></th>
                    <th>Movie Poster</th>
                    <th>Movie title</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody className={"align-middle"}>
                {Array.isArray(cart) && cart.map((item) => (
                    <CartItem key={item.id} item={item} deleteItem={deleteItem} showErrors={setError}/>
                ))}
                </tbody>
            </Table>
    )
    )
}