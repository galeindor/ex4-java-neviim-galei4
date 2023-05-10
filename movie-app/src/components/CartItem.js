export default function CartItem({movie}){
    return(
        <tr>
            <td>
                <img src={movie.posterUrl} width={100} alt={movie.title}></img>
            </td>
            <td>{movie.title}</td>
            <td>{movie.price}</td>
        </tr>
    )
}