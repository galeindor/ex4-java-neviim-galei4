export default function ShoppingCart() {

    const cart = [
        {
            id: 1,
            title: "The Shawshank Redemption",
            year: 1994,
            director: "Frank Darabont",
            duration: "2h 22min",
            genre: ["Crime", "Drama"],
            rate: 9.3,
            posterUrl: "https://www.imdb.com/title/tt0111161/mediaviewer/rm2606105600/",

        }
    ]
    return (
        <ul>
            {cart.map((movie) => (
                <li key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.year}</p>
                    <p>{movie.director}</p>
                    <p>{movie.duration}</p>
                    <p>{movie.genre}</p>
                    <p>{movie.rate}</p>
                    <img src={movie.posterUrl} alt={movie.title}></img>
                </li>

            ))}
        </ul>
    )
}