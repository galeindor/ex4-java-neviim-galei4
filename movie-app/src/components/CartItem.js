import {CURRENCY, REST_API_URL} from "../constants";
import {useFetch} from "../customHooks/useFetch";
import {useEffect} from "react";

export default function CartItem({item, deleteItem, showErrors}) {
    const [{data, errors}, doFetch] = useFetch(false);

    function removeFromCart() {
        doFetch(REST_API_URL + item.id, "delete", {});
    }

    useEffect(() => {
        if (errors.length > 0) {
            return showErrors(errors);
        }
        if (data === true) // data is true when the item is deleted
            deleteItem(item.id);
    }, [doFetch]);

    return (
        <tr>
            <td width={10} className={"align-items-baseline"}>
                <img onClick={removeFromCart} src="./icons/delete.png" width={20} alt="remove"></img>
            </td>
            <td>
                <img src={item.posterUrl} width={100} alt={item.name}></img>
            </td>
            <td>{item.name}</td>
            <td>{item.price + CURRENCY}</td>
        </tr>
    )
}