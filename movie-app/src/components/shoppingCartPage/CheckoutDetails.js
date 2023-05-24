import {Button, ListGroup} from "react-bootstrap";
import {CURRENCY} from "../../constants";
import {Link} from "react-router-dom";


export default function CheckoutDetails({cartItems}) {

    const subtotal = Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + item.price, 0) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <>
            <ListGroup style={{listStyleType: "none"}} className={"mt-2"}>
                <ListGroup.Item>
                    <span className={"row"}>
                        <p className={"col-9"}>Subtotal:</p>
                        <p className={"col"}>{subtotal.toFixed(2) + CURRENCY}</p>
                    </span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className={"row"}>
                        <p className={"col-9"}>Tax::</p>
                        <p className={"col"}>{tax.toFixed(2) + CURRENCY}</p>
                    </span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className={"row"}>
                        <p className={"col-9"}>Total:</p>
                        <p className={"col"}>{total.toFixed(2) + CURRENCY}</p>
                    </span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to={"/checkout"}>
                        <Button variant="success">Checkout</Button>
                    </Link>
                </ListGroup.Item>
            </ListGroup>

        </>


    )
}