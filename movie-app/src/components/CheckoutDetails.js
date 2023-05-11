import {Button, ListGroup} from "react-bootstrap";


export default function CheckoutDetails({cartItems}) {

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <>
            <ListGroup style={{listStyleType: "none"}} className={"mt-2"}>
                <ListGroup.Item>
                    <span className={"row"}>
                        <p className={"col-9"}>Subtotal:</p>
                        <p className={"col"}>{subtotal.toFixed(2)}</p>
                    </span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className={"row"}>
                        <p className={"col-9"}>Tax::</p>
                        <p className={"col"}>{tax.toFixed(2)}</p>
                    </span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className={"row"}>
                        <p className={"col-9"}>Total:</p>
                        <p className={"col"}>{total.toFixed(2)}</p>
                    </span>
                </ListGroup.Item>
                <ListGroup.Item><Button variant="success">Checkout</Button></ListGroup.Item>
            </ListGroup>

        </>


    )
}