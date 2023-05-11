import CartItem from "./CartItem";
import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function ShoppingCartTable({cart,setCart}) {

    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        setIsEmpty(cart.length === 0);
    }, [cart]);

    function deleteItem(id) {
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
    }

    return (
        <>
            {isEmpty &&
                <h2 className="text-center mt-2 text-danger">Your cart is empty, Go Shop!</h2>
            }
            {!isEmpty &&
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
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} deleteItem={deleteItem}/>

                    ))}
                    </tbody>
                </Table>
            }
        </>
    )
}