export default function CartItem({item}){
    console.log(item);
    return(
        <tr>
            <td>
                <img src={item.posterUrl} width={100} alt={item.name}></img>
            </td>
            <td>{item.name}</td>
            <td>{item.price}</td>
        </tr>
    )
}