
export default function MovieItem({movie}) {

    return (
        <>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <p>{movie.overview}</p>
        </>
    )
}