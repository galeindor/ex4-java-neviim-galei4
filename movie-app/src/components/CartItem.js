import {CURRENCY, REST_API_URL} from "../constants";
import axios from "axios";

export default function CartItem({item, deleteItem}) {

    async function removeFromCart(e) {
        e.preventDefault();
        const url = REST_API_URL + item.id;
        try {
            const response = await axios.delete(url);
            if(response.status === 200){
                deleteItem(item.id);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <tr>
            <td width={10} className={"align-items-baseline"}>
                <img onClick={removeFromCart} src="./icons/delete.png" width={20}  alt="remove" ></img>
            </td>
            <td>
                <img src={item.posterUrl} width={100} alt={item.name}></img>
            </td>
            <td>{item.name}</td>
            <td>{item.price+ CURRENCY}</td>
        </tr>
    )
}