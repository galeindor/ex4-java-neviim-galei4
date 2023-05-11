import {Button} from "react-bootstrap";
import axios from "axios";
import {REST_API_URL} from "../../constants";

export default function RemoveFromCartBtn({id}) {

    async function removeFromCart(e) {
        e.preventDefault();
        const url = REST_API_URL + id;
        try {
            const response = await axios.delete(url);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Button variant="danger" type="submit" onClick={removeFromCart}>Remove from cart</Button>

    )
}