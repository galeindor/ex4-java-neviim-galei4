import RemoveFromCartBtn from "./buttons/RemoveFromCartBtn";

export default function CartItem({item}){
    return(
        <tr>
            <td>
                <RemoveFromCartBtn id={item.id}/>
            </td>
            <td>
                <img src={item.posterUrl} width={100} alt={item.name}></img>
            </td>
            <td>{item.name}</td>
            <td>{item.price}</td>
        </tr>
    )
}