import {Button, Image, ListGroup} from "react-bootstrap";
import {BG_COLOR, CURRENCY} from "../../constants";
import {Link} from "react-router-dom";


export default function CheckoutDetails({cartItems, emptyCart}) {

    const subtotal = Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + item.price, 0) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const items = {
        total: {name: "Total", price: total},
        tax: {name: "Tax", price: tax},
        subtotal: {name: "Subtotal", price: subtotal}
    }
    return (
        <>
            <ListGroup style={{listStyleType: "none"}} className={"mt-2"}>
                {Object.keys(items).map((key, index) => {
                    return (
                        <ListGroup.Item key={index} style={{backgroundColor: BG_COLOR}}>
                            <span className={"row"}>
                                <p className={"col-9"}>{items[key].name}:</p>
                                <p className={"col"}>{items[key].price.toFixed(2) + CURRENCY}</p>
                            </span>
                        </ListGroup.Item>
                    )
                })}
                <ListGroup.Item style={{backgroundColor: BG_COLOR}}>
                    <Link to={"/checkout"}>
                        <Button variant="secondary" className={"col-8 float-start"} title={"checkout"}>
                            <Image src={"../icons/checkout.png"} width={30} alt={"checkout"}/>
                        </Button>
                    </Link>
                    <Button variant="outline-danger" className={"cold-2 float-end"} onClick={emptyCart}
                            title={"empty-cart"}>
                        <Image src={"../icons/empty_cart.png"} width={30} alt={"empty-cart"}/>
                    </Button>
                </ListGroup.Item>
            </ListGroup>

        </>


    )
}