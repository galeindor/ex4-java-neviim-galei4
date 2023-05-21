import CartItem from "./CartItem";
import {Table} from "react-bootstrap";
import {useContext} from "react";
import {CartContext} from "../CartContext";

export default function ShoppingCartTable() {
    const [cart, setCart] = useContext(CartContext);
    function deleteItem(id) {
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
    }

    return (
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
                <CartItem key={item.id} item={item} deleteItem={deleteItem}/>
            ))}
            </tbody>
        </Table>

    )
}