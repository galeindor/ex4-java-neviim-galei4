import CartItem from "./CartItem";
import {Table} from "react-bootstrap";

export default function ShoppingCartTable() {
    const cart = [
        {
            id: 1,
            title: "The Shawshank Redemption",
            year: 1994,
            director: "Frank Darabont",
            duration: "2h 22min",
            genre: ["Crime", "Drama"],
            rate: 9.3,
            posterUrl: "./default.jpg",
            price: "6̶.̶9̶9̶$̶ 3.99$"

        }
    ]
    return (
        <Table striped bordered hover style={{fontFamily: "cursive"}}>
            <thead>
                <tr>
                    <th>Movie Poster</th>
                    <th>Movie title</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((movie) => (
                    <CartItem key={movie.id} movie={movie}/>

                ))}
            </tbody>
        </Table>
    )
}